// Execute the page physics and measurement functions without the DOM.
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../../../stfr_nbody_sigma.html'),'utf8');
const script=html.split('<script>')[1].split('</script>')[0];
new vm.Script(script);
const physics=script.slice(0,script.indexOf("const canvas=document.getElementById('c');"));
const ctx={assert,console};vm.createContext(ctx);vm.runInContext(physics,ctx);
vm.runInContext(`
  for(const testMode of ['newton','sigma','schwarz']){
    mode=testMode;
    for(const state of [[0,0,0,0,4.6e10,0,0,59000],
        [2e8,-1e8,12,-7,6e10,2e10,-12000,43000]]){
      const [sx,sy,svx,svy,mx,my,mvx,mvy]=state;
      const a=accel9([{mass:MSUN,x:sx,y:sy,vx:svx,vy:svy},
        {mass:MERC_M,x:mx,y:my,vx:mvx,vy:mvy}]);
      const b=shadowAccel(...state);
      [a.ax[0],a.ay[0],a.ax[1],a.ay[1]].forEach((v,i)=>
        assert(Math.abs(v-b[i])<1e-16));
    }
  }
  // Oblique motion has a tangential PN response absent from the old correction.
  const cc=closureCorrection(G*MSUN,5e10,0,10000,40000);
  assert(cc[1]>0);
  function run(testMode,step){
    initBodies();mode=testMode;trackLRL();
    while(shadowTime<12*YR){shadowStep(step);trackLRL();}
    return {mode:testMode,stepSeconds:step,perihelia:lrl.angs.length,
      arcsecPerCentury:precession()};
  }
  globalThis.results=[];
  for(const step of [1800,900])for(const m of ['newton','sigma'])results.push(run(m,step));
  for(const r of results){
    assert(Math.abs(r.arcsecPerCentury-(r.mode==='sigma'?42.99:0))<0.005,JSON.stringify(r));
  }
  assert(Math.abs(results[1].arcsecPerCentury-results[3].arcsecPerCentury)<0.002);
  console.log(JSON.stringify(results,null,2));
`,ctx,{timeout:120000});
fs.writeFileSync(path.join(__dirname,'closure-shadow-results.json'),JSON.stringify(ctx.results,null,2)+'\n');
console.log('PASS: page shadow, timestep refinement, and nine-body/shadow agreement.');
