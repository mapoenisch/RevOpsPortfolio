import { useEffect, useRef, useState } from 'react';

export default function MpSculpture(){
  const surface=useRef<HTMLButtonElement>(null),canvas=useRef<HTMLCanvasElement>(null);
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    let disposed=false,cleanup:(()=>void)|undefined;
    const desktop=matchMedia('(min-width: 901px)');
    const start=async()=>{
      if(!desktop.matches){cleanup?.();cleanup=undefined;setReady(false);return;}
      if(cleanup)return;
      try{const {createMpScene}=await import('./mp-scene.js');if(disposed||!desktop.matches||!canvas.current||!surface.current)return;cleanup=createMpScene(canvas.current,surface.current);setReady(true);}catch{setReady(false);}
    };
    void start();desktop.addEventListener('change',start);
    return()=>{disposed=true;desktop.removeEventListener('change',start);cleanup?.();};
  },[]);
  return <button ref={surface} type="button" className={`mecha-sculpture mp-sculpture ${ready?'is-ready':''}`} aria-label="mp.-Logo drehen: mit der Maus bewegen oder ziehen, alternativ Pfeiltasten. Escape setzt die Neigung zurück." title="Mit der Maus bewegen oder ziehen">
    <span className="mp-sculpture-fallback" aria-hidden="true">mp<span>.</span></span>
    <canvas ref={canvas} aria-hidden="true"/>
  </button>;
}
