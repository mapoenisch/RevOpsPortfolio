#!/usr/bin/env bash
set -euo pipefail

# Nur fertige CI-Artefakte veröffentlichen; Serverwerte werden vor SSH validiert.
for name in DEPLOY_HOST DEPLOY_USER DEPLOY_ROOT DEPLOY_SSH_KEY DEPLOY_KNOWN_HOSTS RELEASE_SHA RELEASE_ID RELEASE_ARCHIVE; do
  if [[ -z "${!name:-}" ]]; then
    echo "Fehlende Einstellung: $name" >&2
    exit 1
  fi
done
DEPLOY_PORT=${DEPLOY_PORT:-22}
[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*$ ]] || { echo 'Ungültiger Servername.' >&2; exit 1; }
[[ "$DEPLOY_USER" =~ ^[a-z_][a-z0-9_-]*$ && "$DEPLOY_USER" != root ]] || { echo 'Eigenen Deployment-Benutzer verwenden.' >&2; exit 1; }
[[ "$DEPLOY_PORT" =~ ^[0-9]{1,5}$ ]] && (( 10#$DEPLOY_PORT >= 1 && 10#$DEPLOY_PORT <= 65535 )) || { echo 'Ungültiger SSH-Port.' >&2; exit 1; }
[[ "$DEPLOY_ROOT" =~ ^/(var/www|srv/www|home)/[a-zA-Z0-9_./-]+$ && "$DEPLOY_ROOT" != */ && "$DEPLOY_ROOT" != *..* ]] || { echo 'Ungültiger Website-Ordner.' >&2; exit 1; }
[[ "$RELEASE_SHA" =~ ^[a-f0-9]{40}$ && "$RELEASE_ID" =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]] || { echo 'Ungültige Release-Kennung.' >&2; exit 1; }
[[ -f "$RELEASE_ARCHIVE" ]] || { echo 'Website-Paket fehlt.' >&2; exit 1; }

ssh_dir=$(mktemp -d)
trap 'rm -rf -- "$ssh_dir"' EXIT
chmod 700 "$ssh_dir"
printf '%s\n' "$DEPLOY_SSH_KEY" > "$ssh_dir/key"
printf '%s\n' "$DEPLOY_KNOWN_HOSTS" > "$ssh_dir/known_hosts"
chmod 600 "$ssh_dir/key" "$ssh_dir/known_hosts"
unset DEPLOY_SSH_KEY DEPLOY_KNOWN_HOSTS
ssh_options=(-i "$ssh_dir/key" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$ssh_dir/known_hosts" -o ConnectTimeout=15)
target="$DEPLOY_USER@$DEPLOY_HOST"

ssh "${ssh_options[@]}" -p "$DEPLOY_PORT" "$target" bash -s -- "$DEPLOY_ROOT" "$RELEASE_ID" <<'REMOTE'
set -euo pipefail
root=$1
release=$2
mkdir -p "$root/releases" "$root/incoming" "$root/state"
if [[ -e "$root/current" && ! -L "$root/current" ]]; then
  echo 'current ist kein symbolischer Link; Abbruch zum Schutz vorhandener Dateien.' >&2
  exit 1
fi
[[ ! -e "$root/releases/$release" && ! -e "$root/incoming/$release.tar.gz" ]]
REMOTE

scp "${ssh_options[@]}" -P "$DEPLOY_PORT" "$RELEASE_ARCHIVE" "$target:$DEPLOY_ROOT/incoming/$RELEASE_ID.tar.gz"
ssh "${ssh_options[@]}" -p "$DEPLOY_PORT" "$target" bash -s -- "$DEPLOY_ROOT" "$RELEASE_ID" <<'REMOTE'
set -euo pipefail
root=$1
release=$2
mkdir "$root/releases/$release"
tar -xzf "$root/incoming/$release.tar.gz" -C "$root/releases/$release"
test -s "$root/releases/$release/index.html"
test -s "$root/releases/$release/__release.json"
chmod -R u=rwX,go=rX "$root/releases/$release"
readlink "$root/current" > "$root/state/$release.previous" || true
ln -s "$root/releases/$release" "$root/.current-$release"
mv -Tf "$root/.current-$release" "$root/current"
rm -- "$root/incoming/$release.tar.gz"
REMOTE

# Ein HTTP 200 allein beweist keine erfolgreiche Veröffentlichung.
verified=false
for attempt in 1 2 3; do
  if curl --fail --silent --show-error --max-time 20 "https://marc-poenisch.de/__release.json?release=$RELEASE_ID" > "$ssh_dir/release.json" &&
    node -e 'const fs=require("fs"); const actual=JSON.parse(fs.readFileSync(process.argv[1],"utf8")); process.exit(actual.commit === process.env.RELEASE_SHA ? 0 : 1)' "$ssh_dir/release.json"; then
    verified=true
    break
  fi
  sleep 3
done
if [[ "$verified" != true ]]; then
  echo 'Die öffentliche Website bestätigt die neue Version nicht. Vorherige Version wiederherstellen.' >&2
  ssh "${ssh_options[@]}" -p "$DEPLOY_PORT" "$target" bash -s -- "$DEPLOY_ROOT" "$RELEASE_ID" <<'REMOTE'
set -euo pipefail
root=$1
release=$2
previous=$(cat "$root/state/$release.previous")
[[ $(readlink "$root/current") == "$root/releases/$release" ]] || exit 1
if [[ "$previous" == "$root/releases/"* && -d "$previous" ]]; then
  ln -s "$previous" "$root/.rollback-$release"
  mv -Tf "$root/.rollback-$release" "$root/current"
elif [[ -z "$previous" ]]; then
  rm -- "$root/current"
else
  echo 'Vorheriges Ziel unerwartet; manuelle Prüfung erforderlich.' >&2
  exit 1
fi
REMOTE
  exit 1
fi
echo "Veröffentlicht und über HTTPS bestätigt: $RELEASE_SHA"
