import * as THREE from './vendor/three.module.js';

// Original pointer contract: drag sensitivity .006 rad/px, tilt clamped at
// 25 degrees, spring return, and a half turn through the hero's scroll range.
export function createMpScene(canvas, surface) {
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  // Supersampling keeps the one-device-pixel wires at half a CSS pixel.
  renderer.setPixelRatio(2);
  renderer.setClearColor(0xffffff,0);
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-175,175,140,-140,.1,1000);
  camera.position.set(0,0,500);
  const model=new THREE.Group();
  model.rotation.order='YXZ';
  scene.add(model);
  const geometries=[],materials=[];
  // Hand-drawn lowercase letter outlines derived from the supplied mp. mark.
  // Y is inverted once here so all points remain readable as design coordinates.
  const shape=new THREE.Shape();
  const move=(p,x,y)=>p.moveTo(x,-y);
  const line=(p,x,y)=>p.lineTo(x,-y);
  const curve=(p,a,b,c,d,e,f)=>p.bezierCurveTo(a,-b,c,-d,e,-f);
  move(shape,0,80);line(shape,0,1);line(shape,20,1);line(shape,20,11);
  curve(shape,29,-5,55,-4,66,12);curve(shape,81,-7,112,-4,120,15);
  curve(shape,123,22,124,29,124,38);line(shape,124,80);line(shape,103,80);line(shape,103,36);
  curve(shape,103,23,98,18,90,18);curve(shape,80,18,74,24,74,37);
  line(shape,74,80);line(shape,53,80);line(shape,53,36);
  curve(shape,53,23,48,18,40,18);curve(shape,29,18,21,25,21,38);
  line(shape,21,80);shape.closePath();
  const p=new THREE.Shape();
  move(p,142,111);line(p,142,1);line(p,163,1);line(p,163,11);
  curve(p,172,-2,191,-4,205,5);curve(p,230,20,229,63,207,76);
  curve(p,192,86,173,84,163,72);line(p,163,111);p.closePath();
  const hole=new THREE.Path();
  move(hole,163,40);curve(hole,163,24,171,17,183,17);
  curve(hole,196,17,204,26,204,40);curve(hole,204,55,196,64,183,64);
  curve(hole,171,64,163,55,163,40);hole.closePath();p.holes.push(hole);
  const dot=new THREE.Shape();
  move(dot,238,58);line(dot,260,58);line(dot,260,80);line(dot,238,80);dot.closePath();
  // A surface lattice, rather than just silhouette edges: clipped quad grids
  // on both faces, contour rings through the depth and evenly spaced ribs.
  // The even/odd intersections also cut out the counter inside the letter p.
  const depth=28,spacing=3.2;
  function segment(buffer,a,b){buffer.push(a[0]-130,a[1]+49,a[2],b[0]-130,b[1]+49,b[2]);}
  function wires(vertices,opacity,color){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometries.push(geometry);
    const ink=new THREE.LineBasicMaterial({color,transparent:true,opacity,depthTest:false});materials.push(ink);
    model.add(new THREE.LineSegments(geometry,ink));
  }
  for(const outline of [shape,p,dot]) {
    const color=outline===dot?0x244fcd:0x000000;
    const sampled=outline.extractPoints(48);
    const contours=[sampled.shape,...sampled.holes];
    const points=contours.flat();
    const bounds={minX:Math.min(...points.map(p=>p.x)),maxX:Math.max(...points.map(p=>p.x)),minY:Math.min(...points.map(p=>p.y)),maxY:Math.max(...points.map(p=>p.y))};
    const front=[],back=[],sides=[],edges=[];
    function faceGrid(axis,position){
      const cuts=[];
      for(const contour of contours)for(let i=0;i<contour.length;i++){
        const a=contour[i],b=contour[(i+1)%contour.length];
        const av=axis==='x'?a.x:a.y,bv=axis==='x'?b.x:b.y;
        if((av<=position&&bv>position)||(bv<=position&&av>position)){
          const t=(position-av)/(bv-av);cuts.push(axis==='x'?a.y+(b.y-a.y)*t:a.x+(b.x-a.x)*t);
        }
      }
      cuts.sort((a,b)=>a-b);
      for(let i=0;i+1<cuts.length;i+=2){
        const a=axis==='x'?[position,cuts[i]]:[cuts[i],position];
        const b=axis==='x'?[position,cuts[i+1]]:[cuts[i+1],position];
        segment(front,[...a,depth/2],[...b,depth/2]);segment(back,[...a,-depth/2],[...b,-depth/2]);
      }
    }
    for(let x=Math.ceil(bounds.minX/spacing)*spacing;x<bounds.maxX;x+=spacing)faceGrid('x',x);
    for(let y=Math.ceil(bounds.minY/spacing)*spacing;y<bounds.maxY;y+=spacing)faceGrid('y',y);
    for(const contour of contours){
      // Parallel contour rings trace every curved side wall.
      for(let z=-depth/2;z<=depth/2+.01;z+=depth/8){
        const buffer=Math.abs(z)===depth/2?edges:sides;
        for(let i=0;i<contour.length;i++){
          const a=contour[i],b=contour[(i+1)%contour.length];segment(buffer,[a.x,a.y,z],[b.x,b.y,z]);
        }
      }
      // Resample by distance so curves and straight stems have equal mesh size.
      let carry=0;
      for(let i=0;i<contour.length;i++){
        const a=contour[i],b=contour[(i+1)%contour.length],length=a.distanceTo(b);
        if(length<.00001)continue;
        let offset=carry;
        for(;offset<length;offset+=spacing){const t=offset/length,x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;segment(sides,[x,y,-depth/2],[x,y,depth/2]);}
        carry=offset-length;
      }
    }
    wires(back,.22,color);wires(sides,.42,color);wires(front,.65,color);wires(edges,.72,color);
  }
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const tilt={x:0,y:0},target={x:0,y:0},velocity={x:0,y:0};
  const limit=THREE.MathUtils.degToRad(25);
  const clamp=value=>THREE.MathUtils.clamp(value,-limit,limit);
  let frame=0,lastTime=0,drag=null,scroll=0,scrollTarget=0,disposed=false;
  function draw(now=performance.now()) {
    frame=0;if(disposed)return;
    const dt=Math.min((now-(lastTime||now-16))/1000,.032);lastTime=now;
    let moving=false;
    for(const axis of ['x','y']) {
      if(motion.matches){tilt[axis]=0;velocity[axis]=0;continue;}
      velocity[axis]+=((target[axis]-tilt[axis])*160-velocity[axis]*19)*dt;
      tilt[axis]+=velocity[axis]*dt;
      moving ||= Math.abs(target[axis]-tilt[axis])>.0001 || Math.abs(velocity[axis])>.0001;
    }
    scroll+=(scrollTarget-scroll)*Math.min(1,dt*4);
    moving ||= Math.abs(scrollTarget-scroll)>.0001;
    model.rotation.set(-.16+tilt.x,-.40+(motion.matches?0:scroll)+tilt.y,-.035,'YXZ');
    renderer.render(scene,camera);
    // Observable pose is also useful for keyboard and automated interaction QA.
    canvas.dataset.pose=[model.rotation.x,model.rotation.y,model.rotation.z].map(n=>n.toFixed(4)).join(',');
    if(moving) frame=requestAnimationFrame(draw);
  }
  function requestDraw(){if(!frame&&!disposed){lastTime=0;frame=requestAnimationFrame(draw);}}
  function resize(){const {width,height}=surface.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.left=-140*width/height;camera.right=140*width/height;camera.updateProjectionMatrix();requestDraw();}
  function pointerDown(event){if(event.button!==0||motion.matches)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY,tiltX:tilt.x,tiltY:tilt.y};surface.setPointerCapture(event.pointerId);surface.dataset.dragging='true';}
  function pointerMove(event){
    if(motion.matches)return;
    if(drag){target.x=clamp(drag.tiltX+(event.clientY-drag.y)*.006);target.y=clamp(drag.tiltY+(event.clientX-drag.x)*.006);}
    else{const r=surface.getBoundingClientRect();target.x=clamp((event.clientY-r.top-r.height/2)/r.height*.4);target.y=clamp((event.clientX-r.left-r.width/2)/r.width*.65);}
    requestDraw();
  }
  function reset(){drag=null;delete surface.dataset.dragging;target.x=0;target.y=0;requestDraw();}
  function pointerUp(event){if(surface.hasPointerCapture(event.pointerId))surface.releasePointerCapture(event.pointerId);reset();}
  function leave(){if(!drag)reset();}
  function onScroll(){const hero=document.querySelector('.mecha-hero');scrollTarget=hero?Math.min(Math.max(window.scrollY/(hero.clientHeight*.9),0),1)*Math.PI:0;requestDraw();}
  function key(event){if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Escape'].includes(event.key))return;event.preventDefault();if(event.key==='Escape'){reset();return;}target.x=clamp(target.x+(event.key==='ArrowUp'?-.1:event.key==='ArrowDown'?.1:0));target.y=clamp(target.y+(event.key==='ArrowLeft'?-.1:event.key==='ArrowRight'?.1:0));requestDraw();}
  const events={pointerdown:pointerDown,pointermove:pointerMove,pointerup:pointerUp,pointercancel:pointerUp,lostpointercapture:reset,pointerleave:leave,keydown:key,blur:reset};
  for(const [name,handler] of Object.entries(events))surface.addEventListener(name,handler);
  window.addEventListener('scroll',onScroll,{passive:true});motion.addEventListener('change',reset);
  const observer=new ResizeObserver(resize);observer.observe(surface);resize();onScroll();
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',onScroll);motion.removeEventListener('change',reset);for(const [name,handler] of Object.entries(events))surface.removeEventListener(name,handler);for(const g of geometries)g.dispose();for(const m of materials)m.dispose();renderer.dispose();};
}
