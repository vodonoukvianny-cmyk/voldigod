(()=>{'use strict';
const T=THREE,root=document.getElementById('game'),start=document.getElementById('start'),status=document.getElementById('loadStatus');
const scene=new T.Scene();scene.background=new T.Color(0x081426);scene.fog=new T.FogExp2(0x71849b,.0065);
const camera=new T.PerspectiveCamera(55,innerWidth/innerHeight,.1,300);
const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});const MOBILE=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||innerWidth<900;renderer.setPixelRatio(MOBILE?Math.min(devicePixelRatio||1,1.15):Math.min(devicePixelRatio||1,1.5));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=!MOBILE;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;root.appendChild(renderer.domElement);
scene.add(new T.HemisphereLight(0xa9cfff,0x26351f,2.1));
const sun=new T.DirectionalLight(0xdce8ff,2.5);sun.position.set(-40,55,25);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);
const M=(c,r=.8,m=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const G=(c,o=.85)=>new T.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false});
const mesh=(g,m)=>{const o=new T.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;return o};
const box=(w,h,d,m)=>mesh(new T.BoxGeometry(w,h,d),m),cyl=(r,h,m,n=16)=>mesh(new T.CylinderGeometry(r,r*.92,h,n),m),sph=(r,m)=>mesh(new T.SphereGeometry(r,18,14),m),cone=(r,h,m,n=7)=>mesh(new T.ConeGeometry(r,h,n),m);
const rand=(a,b)=>a+Math.random()*(b-a),dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);const envObstacles=[];
const world=box(190,.8,190,M(0x243d2d));world.position.y=-.4;scene.add(world);
const grass=box(175,.12,175,M(0x3d5c36));grass.position.y=.04;scene.add(grass);
const water=box(13,.22,175,M(0x1c6280,.28));water.position.set(35,.08,0);scene.add(water);
function road(x,z,w,d,r=0){const q=box(w,.07,d,M(0x9d7a58));q.position.set(x,.13,z);q.rotation.y=r;scene.add(q)}
road(0,10,7,130);road(-18,-16,5,55,Math.PI/2);road(18,-18,5,45,Math.PI/2);road(0,-42,5,40);
function tree(x,z,s=1,dead=false){const g=new T.Group();envObstacles.push({x,z,r:.7*s});const tr=cyl(.38,2.5,M(dead?0x3b3027:0x503322),12);tr.position.y=1.25;g.add(tr);if(dead){const br=cyl(.12,2,M(0x392a24),8);br.rotation.z=.65;br.position.set(.35,2.2,0);g.add(br)}else{for(const [y,r,c] of [[3.1,2.1,0x28583a],[4.55,1.65,0x347044],[5.55,1.05,0x418653]]){const a=cone(r,2.7,M(c),8);a.position.y=y;g.add(a)}}g.position.set(x,0,z);g.scale.setScalar(s);scene.add(g)}
for(let i=0;i<(MOBILE?30:55);i++){let x=rand(-78,78),z=rand(-78,78);if(Math.abs(x)<25&&Math.abs(z)<30)continue;tree(x,z,rand(.65,1.35),z<-48)}
function rock(x,z,s=1){envObstacles.push({x,z,r:1.35*s});const r=mesh(new T.DodecahedronGeometry(rand(.7,1.3)*s,1),M(0x66717a));r.position.set(x,rand(.2,.7),z);r.scale.y=.65;scene.add(r)}
for(let i=0;i<(MOBILE?22:42);i++)rock(rand(-80,80),rand(-80,80),rand(.6,1.5));
function mountain(x,z,s){const b=cone(11*s,20*s,M(0x3c4b60),8);b.position.set(x,10*s,z);scene.add(b);const sn=cone(4*s,7*s,M(0xd8e1e5),8);sn.position.set(x,18*s,z);scene.add(sn)}
mountain(-62,-70,2.4);mountain(-12,-82,2.8);mountain(48,-70,2.3);mountain(75,-20,1.8);
function house(x,z,s=1,c=0x713d3c){const g=new T.Group(),w=box(5*s,3.1*s,4*s,M(0xb88b63));w.position.y=1.55*s;g.add(w);const r=cone(3.7*s,2.6*s,M(c),4);r.rotation.y=Math.PI/4;r.position.y=4.3*s;g.add(r);const d=box(.85*s,1.65*s,.16*s,M(0x32231d));d.position.set(0,.82*s,2.08*s);g.add(d);g.position.set(x,0,z);scene.add(g)}
[[-10,-13,1.15], [10,-13,1.05],[-11,-25,.9],[11,-24,.95],[-20,-17,.8],[20,-20,.85]].forEach(p=>house(...p));
function castle(){const g=new T.Group(),st=M(0x737d89,.72),roof=M(0x29334a);const k=box(14,9,10,st);k.position.y=4.5;g.add(k);for(const x of[-9,9])for(const z of[-5,5]){const t=cyl(2.2,15,st,12);t.position.set(x,7.5,z);g.add(t);const r=cone(2.8,5,roof,8);r.position.set(x,17,z);g.add(r)}const gate=box(3,5,.4,M(0x2b211e));gate.position.set(0,2.5,5.2);g.add(gate);g.position.set(0,0,-49);g.scale.setScalar(1.25);scene.add(g)}
castle();
function guild(){const g=new T.Group(),w=box(9,5,5,M(0xa27650));w.position.y=2.5;g.add(w);const r=cone(6,4,M(0x3b465f),4);r.rotation.y=Math.PI/4;r.position.y=7;g.add(r);const sign=box(5,.9,.22,M(0x573822));sign.position.set(0,4.9,2.7);g.add(sign);const emblem=cyl(.72,.18,M(0xd8b65c,.35,.5),8);emblem.rotation.x=Math.PI/2;emblem.position.set(0,5.2,2.85);g.add(emblem);g.position.set(-17,-11,0);scene.add(g)}
guild();
function ruin(x,z){const g=new T.Group();for(const p of [[-3,2,0],[3,2,0],[-3,2,4],[3,2,4]]){const c=box(1.2,4,1.2,M(0x62636a));c.position.set(...p);g.add(c)}const ring=mesh(new T.TorusGeometry(3,.28,10,32),G(0x6b48ff));ring.rotation.x=Math.PI/2;ring.position.y=3;g.add(ring);g.position.set(x,0,z);scene.add(g)}
ruin(-42,25);ruin(49,32);
function portal(x,z,c=0x46d9ff){const g=new T.Group(),r=mesh(new T.TorusGeometry(3,.3,14,48),G(c));r.rotation.x=Math.PI/2;r.position.y=3;g.add(r);const q=sph(2,G(c,.28));q.position.y=3;q.scale.z=.12;g.add(q);g.position.set(x,0,z);scene.add(g);return g}
portal(42,37);portal(-48,-27,0xb45cff);
function homeBuild(){const g=new T.Group(),w=box(7,3.5,6,M(0xc9a27a));w.position.y=1.75;g.add(w);const r=cone(5.2,3.1,M(0x6a3d4b),4);r.rotation.y=Math.PI/4;r.position.y=5;g.add(r);const d=box(1.1,2,.18,M(0x34241e));d.position.set(0,1,3.05);g.add(d);g.position.set(4,0,19);scene.add(g);const I=new T.Group(),fl=box(8,.2,7,M(0x704f39));fl.position.y=.1;I.add(fl);const bed=box(2.8,.5,4,M(0x6a4637));bed.position.set(-2,.45,-1);I.add(bed);const pillow=box(2.3,.3,.9,M(0xf0e3cf));pillow.position.set(-2,.78,-2.45);I.add(pillow);const win=box(2.1,1.5,.12,M(0x5ba5c4,.25));win.position.set(2.7,1.9,-3.38);I.add(win);const desk=box(1.8,.75,.9,M(0x6b432c));desk.position.set(2,.55,2);I.add(desk);I.position.set(92,0,76);scene.add(I);return {out:new T.Vector3(4,0,22),inside:new T.Vector3(92,0,73)}}const HOME=homeBuild();let homeInside=false;function homeInteract(){if(homeInside&&dist(player,HOME.inside)<5){homeInside=false;player.x=HOME.out.x;player.z=HOME.out.z;toast('Sortie de la chambre');save();return true}if(!homeInside&&dist(player,{x:4,z:22})<4){homeInside=true;S.saveX=HOME.inside.x;S.saveZ=HOME.inside.z;player.x=HOME.inside.x;player.z=HOME.inside.z;toast('Chambre: lit = sauvegarde');save();return true}return false}
const ambientActors=[];function addAmbientAnimals(){const make=(kind)=>{const g=new T.Group();if(kind==='horse'){const b=box(1.5,.8,2.2,M(0x8a5b3d));b.position.y=1;g.add(b);const h=sph(.42,M(0x8a5b3d));h.position.set(0,1.7,1);g.add(h)}else if(kind==='sheep'){const b=sph(.72,M(0xe8e2d8));b.scale.set(1.2,.8,.9);b.position.y=.8;g.add(b)}else{const b=box(1.2,.7,1.7,M(0xc47a32));b.position.y=.9;g.add(b);const h=sph(.55,M(0x5b3520));h.position.set(0,1.25,.75);g.add(h)}return g};for(const q of [['horse',-18,-55],['horse',0,-58],['horse',18,-53],['sheep',-10,-50],['sheep',5,-55],['sheep',20,-50],['lion',58,-38],['lion',68,-30]]){const m=make(q[0]);m.position.set(q[1],0,q[2]);scene.add(m);ambientActors.push({m,x:q[1],z:q[2],p:rand(0,6)})}}addAmbientAnimals();
function addHorizons(){const sea=box(170,.15,45,M(0x155a7a,.22,.05));sea.position.set(25,-.02,-105);scene.add(sea);for(let i=0;i<12;i++){const f=sph(.22,M(0x4e9fc8));f.position.set(rand(-45,95),rand(.5,4),rand(-122,-92));scene.add(f);ambientActors.push({m:f,x:f.position.x,z:f.position.z,p:rand(0,6),fish:true})}const d=new T.Group(),b=sph(1,M(0x4b528a));b.scale.set(1.3,.7,1.8);d.add(b);const h=sph(.5,M(0x666db0));h.position.z=1.6;d.add(h);for(const x of[-1.5,1.5]){const w=box(1.8,.08,1.1,M(0x8d5aaa));w.position.set(x,.5,0);d.add(w)}d.position.set(60,25,-10);scene.add(d);ambientActors.push({m:d,x:60,z:-10,p:0,dragon:true});const city=new T.Group();for(let i=0;i<8;i++){const h2=box(rand(5,9),rand(7,17),rand(5,9),M(0x586a82));h2.position.set(rand(-24,24),h2.geometry.parameters.height/2,rand(-12,12));city.add(h2)}city.position.set(88,0,-72);scene.add(city)}addHorizons();
function addMythicLife(){for(let i=0;i<(MOBILE?4:8);i++){const b=sph(.2,M(0x39465b));b.position.set(rand(-70,70),rand(16,30),rand(-70,30));scene.add(b);ambientActors.push({m:b,x:b.position.x,z:b.position.z,p:rand(0,6),bird:true})}for(const q of [[36,18],[55,12],[62,5]]){const s=new T.Group();for(let i=0;i<8;i++){const p=sph(.16,M(0x3f7b52));p.position.set(Math.sin(i)*.3,.2,i*.22);s.add(p)}s.position.set(q[0],0,q[1]);scene.add(s);ambientActors.push({m:s,x:q[0],z:q[1],p:rand(0,6),snake:true})}const sd=new T.Group(),sb=sph(1,M(0x246b83));sb.scale.set(1.4,.65,2);sd.add(sb);const sh=sph(.5,M(0x2d91a8));sh.position.z=1.7;sd.add(sh);for(const x of[-1.6,1.6]){const w=box(1.7,.08,1,M(0x3fb9c7));w.position.set(x,.5,0);sd.add(w)}sd.position.set(35,3,-106);scene.add(sd);ambientActors.push({m:sd,x:35,z:-106,p:1,seaDragon:true})}addMythicLife();
function dungeon(){const g=new T.Group(),door=box(9,7,2,M(0x282936));door.position.y=3.5;g.add(door);const arch=mesh(new T.TorusGeometry(4,.55,12,32),M(0x4d465a));arch.position.set(0,4,1.1);g.add(arch);for(let i=0;i<4;i++){const t=cone(.55,1.8,M(0xff7438),7);t.position.set(i*2-3,7,0);g.add(t)}g.position.set(-42,-55,0);scene.add(g)}
dungeon();
for(const p of [[-5,-11],[5,-11],[-18,-11],[18,-11],[-42,-27],[42,37]]){const f=cyl(.22,1,M(0x4a3020));f.position.set(p[0],.5,p[1]);scene.add(f);const fl=cone(.48,1.25,G(0xff9a28));fl.position.set(p[0],1.35,p[1]);scene.add(fl)}
const md=sph(5,M(0xeaf4ff,.45));md.position.set(-48,52,-75);scene.add(md);
for(let i=0;i<(MOBILE?45:100);i++){const s=sph(.025,M(0xf0f6ff,.4));s.position.set(rand(-95,95),rand(25,85),rand(-105,-30));scene.add(s)}
let saved={};try{saved=JSON.parse(localStorage.getItem('otaku3d')||'{}')||{}}catch(e){saved={}};const S=Object.assign({saveVersion:4,level:1,xp:0,hp:120,maxHp:120,gold:40,rep:0,guild:0,bond:20,potions:3,kills:0,stage:0,skills:0,skillPoints:0,weaponLevel:1,armorLevel:1,crit:0,loot:0,day:0,saveX:0,saveZ:28},saved);
const player={x:Number.isFinite(+S.saveX)?+S.saveX:0,z:Number.isFinite(+S.saveZ)?+S.saveZ:28,model:new T.Group(),ready:false,mixer:null,actions:{},attack:0,attackT:0,walking:false,vx:0,vz:0};const lyra={x:-3,z:4,model:new T.Group(),ready:false,mixer:null,actions:{}};player.model.visible=true;lyra.model.visible=true;
scene.add(player.model,lyra.model);
function fit(obj,h){obj.visible=true;obj.updateMatrixWorld(true);const b=new T.Box3().setFromObject(obj),sz=b.getSize(new T.Vector3());if(sz.y)obj.scale.multiplyScalar(h/sz.y);obj.updateMatrixWorld(true);const b2=new T.Box3().setFromObject(obj);obj.position.y-=b2.min.y;obj.updateMatrixWorld(true);obj.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;n.frustumCulled=false}})}
function weapon(target,type){let hand=null;target.model.traverse(n=>{if(!hand&&/right.?hand|hand_r|mixamorigRightHand/i.test(n.name))hand=n});const g=new T.Group();if(type==='sword'){const blade=box(.13,1.65,.07,M(0xe6efff,.22,.8));blade.position.y=.82;g.add(blade);const guard=box(.58,.09,.13,M(0xd9b14d,.3,.7));guard.position.y=.1;g.add(guard)}else{const staff=cyl(.06,1.9,M(0x68452b),10);staff.position.y=.95;g.add(staff);const orb=sph(.18,G(0x64dcff));orb.position.y=1.98;g.add(orb)}if(hand)hand.add(g);else{g.position.set(0,1,0);target.model.add(g)}}
function fallbackHero(target,h,type){
 const g=new T.Group();
 const skin=M(0xd6a07f),hair=M(0x171923),cloth=M(0x24425f),cloth2=M(0x3e7180),metal=M(0xc8d1dc,.35,.7),gold=M(0xd7ae52,.25,.7),boot=M(0x292d36),eye=G(0x77d9ff);
 const legs=[];
 for(const x of[-.22,.22]){const leg=box(.25,.92,.3,boot);leg.position.set(x,.52,0);g.add(leg);legs.push(leg)}
 const torso=box(.9,1.05,.58,cloth);torso.position.y=1.25;g.add(torso);
 const chest=box(.72,.55,.62,metal);chest.position.set(0,1.42,.02);g.add(chest);
 const sash=box(.16,1.02,.67,cloth2);sash.position.set(.23,1.27,.34);sash.rotation.z=-.12;g.add(sash);
 const belt=box(.96,.14,.64,gold);belt.position.y=.83;g.add(belt);
 for(const x of[-.55,.55]){const arm=cyl(.13,.88,skin,8);arm.position.set(x,1.28,0);arm.rotation.z=x<0?.18:-.18;g.add(arm);const pa=box(.28,.7,.36,metal);pa.position.set(x,1.43,0);pa.rotation.z=x<0?.18:-.18;g.add(pa)}
 const head=sph(.46,skin);head.position.y=2.28;g.add(head);
 const haircap=sph(.5,hair);haircap.scale.set(1.05,.75,1.02);haircap.position.set(0,2.57,-.02);g.add(haircap);
 for(const x of[-.16,.16]){const eyeM=sph(.055,eye);eyeM.position.set(x,2.3,.42);g.add(eyeM)}
 const fringe=cone(.24,.55,hair,5);fringe.rotation.x=Math.PI;fringe.position.set(0,2.55,.4);g.add(fringe);
 const collar=cone(.28,.34,cloth2,6);collar.position.y=1.82;g.add(collar);
 const cape=box(.78,1.15,.08,M(0x17283f,.15));cape.position.set(0,1.32,-.34);g.add(cape);
 fit(g,h);target.model=g;target.ready=true;g.position.set(target.x||0,0,target.z||0);scene.add(g);weapon(target,type);heroMarker(target,'AREN',0x69a7ff);return g
}
function loadHero(target,url,h,type){return new Promise((resolve,reject)=>{const l=new T.GLTFLoader();let done=false;const ok=g=>{if(done)return;done=true;const m=g.scene;fit(m,h);target.model=m;target.ready=true;m.visible=true;m.position.set(target.x||0,0,target.z||0);scene.add(m);const idle=g.animations.find(a=>/idle|stand|breath/i.test(a.name))||g.animations[0],walk=g.animations.find(a=>/walk|run|locomotion|samba/i.test(a.name))||idle;const mixer=new T.AnimationMixer(m);target.mixer=mixer;target.actions={idle:idle?mixer.clipAction(idle):null,walk:walk?mixer.clipAction(walk):null};if(target.actions.idle)target.actions.idle.play();mixers.push(mixer);weapon(target,type);heroMarker(target,type==='sword'?'AREN':'LYRA',type==='sword'?0x69a7ff:0xff6f9d);resolve()};l.load(url,ok,undefined,e=>{if(!done){done=true;fallbackHero(target,h,type);resolve()}})})}
const AREN_URL='https://threejs.org/examples/models/gltf/Soldier.glb',LYRA_URL='https://threejs.org/examples/models/gltf/Michelle.glb';

function heroMarker(target,name,color){
 const g=new T.Group();
 const ring=mesh(new T.RingGeometry(.75,.9,32),G(color,.72));ring.rotation.x=-Math.PI/2;ring.position.y=.035;g.add(ring);
 const glow=mesh(new T.CircleGeometry(.68,32),G(color,.10));glow.rotation.x=-Math.PI/2;glow.position.y=.025;g.add(glow);
 const cv=document.createElement('canvas');cv.width=512;cv.height=128;const cx=cv.getContext('2d');cx.font='bold 54px system-ui';cx.textAlign='center';cx.fillStyle='#ffffff';cx.strokeStyle='#111827';cx.lineWidth=10;cx.strokeText(name,256,70);cx.fillText(name,256,70);
 const tx=new T.CanvasTexture(cv);const sp=mesh(new T.PlaneGeometry(3.2,.8),new T.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}));sp.position.y=4.0;sp.rotation.x=0;g.add(sp);
 g.position.set(0,0,0);target.marker=g;target.model.add(g);
}
heroMarker(player,'AREN',0x69a7ff);heroMarker(lyra,'LYRA',0xff6f9d);

const mixers=[];

// Collision statique : rectangles/cercle autour des bâtiments et meubles.
const blockers=[];
function addBlocker(x,z,w,d,pad=.45){blockers.push({x,z,w:w+pad*2,d:d+pad*2});}
function blockedAt(x,z){
  const r=.55;
  for(const b of blockers){
    if(x>b.x-b.w/2-r&&x<b.x+b.w/2+r&&z>b.z-b.d/2-r&&z<b.z+b.d/2+r)return true;
  }
  return false;
}
function blockedDynamicAt(x,z){
  const heroR=.62;
  for(const o of envObstacles)if(Math.hypot(x-o.x,z-o.z)<heroR+o.r)return true;
  for(const e of enemies||[])if(!e.dead&&Math.hypot(x-e.x,z-e.z)<heroR+(e.radius||.7))return true;
  return false;
}
function blockedSolidAt(x,z){return blockedAt(x,z)||blockedDynamicAt(x,z)}
function movePlayer(nx,nz){
  if(!blockedSolidAt(nx,player.z))player.x=nx;else player.vx=0;
  if(!blockedSolidAt(player.x,nz))player.z=nz;else player.vz=0;
}
function separateFromDynamic(){
  for(const e of enemies){
    if(e.dead)continue;
    const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz),min=.62+(e.radius||.7);
    if(d>0&&d<min){const q=(min-d)/d;player.x+=dx*q;player.z+=dz*q;}
  }
}
function buildCollisions(){
  [[-10,-13,5.8,4.8],[10,-13,5.3,4.8],[-11,-25,4.6,4],[11,-24,4.8,4],[-20,-17,4,3.8],[20,-20,4.2,4]].forEach(v=>addBlocker(...v));
  addBlocker(-17,-11,9,5);
  addBlocker(0,-49,17.5,12.5);
  addBlocker(-42,-55,10,3);
  [[-45,25],[-39,25],[-45,29],[-39,29],[46,32],[52,32],[46,36],[52,36]].forEach(v=>addBlocker(v[0],v[1],1.8,1.8,.25));
  addBlocker(4,19,7,6);
  addBlocker(92,76,8,7);
  addBlocker(90,75,2.8,4.2);
  addBlocker(94,78,1.8,1.2);
  addBlocker(94.7,74.1,2.1,.35);
}
buildCollisions();
for(const o of envObstacles)addBlocker(o.x,o.z,o.r*2.1,o.r*2.1,.05);
// Sécurité de spawn : ne jamais placer Aren à l'intérieur d'un bâtiment/objet.
if(blockedAt(player.x,player.z)){player.x=0;player.z=28;S.saveX=0;S.saveZ=28;try{localStorage.setItem('otaku3d',JSON.stringify(S))}catch(e){}}
else if(player.x===0&&player.z===18){player.z=28;S.saveX=0;S.saveZ=28;try{localStorage.setItem('otaku3d',JSON.stringify(S))}catch(e){}}
// Le monde ne doit jamais attendre le téléchargement des modèles 3D distants.
// Les personnages se chargent en arrière-plan : le joueur peut entrer immédiatement.
start.disabled=false;start.textContent='ENTRER DANS LE MONDE';status.textContent='✓ Monde prêt · personnages 3D en chargement en arrière-plan…';
fallbackHero(player,3.25,'sword');
loadHero(lyra,LYRA_URL,3.05,'staff').then(()=>{status.textContent='✓ Aren + Lyra chargés · monde prêt.'}).catch(e=>{console.warn('Lyra model:',e);status.textContent='✓ Monde jouable · modèle de Lyra indisponible pour le moment.'});
function creatureFinish(g){g.traverse(o=>{if(o.isMesh){o.castShadow=!MOBILE;o.receiveShadow=!MOBILE}});return g}
function eyePair(g,y,z,color=0xffe15a){for(const x of[-1,1]){const e=sph(.085,G(color));e.position.set(x*.18,y,z);g.add(e)}}
function goblin(){const g=new T.Group(),skin=M(0x709b43),cloth=M(0x4b3a2a),leather=M(0x76502d),metal=M(0x9da7ad,.3,.5);
 const body=box(.7,1.05,.52,cloth);body.position.y=1.0;g.add(body);
 const head=sph(.55,skin);head.scale.set(1.05,1.1,.92);head.position.y=1.92;g.add(head);
 for(const x of[-1,1]){const ear=cone(.3,.72,skin,5);ear.rotation.z=x*.95;ear.position.set(x*.55,2.08,0);g.add(ear)}
 eyePair(g,1.98,.49,0xffe36e);
 const nose=cone(.18,.34,skin,6);nose.rotation.x=Math.PI/2;nose.position.set(0,1.83,.49);g.add(nose);
 for(const x of[-1,1]){const arm=cyl(.12,.78,skin,7);arm.position.set(x*.52,1.15,.02);arm.rotation.z=x*.45;g.add(arm);const hand=sph(.13,skin);hand.position.set(x*.74,.85,.05);g.add(hand)}
 for(const x of[-.22,.22]){const leg=cyl(.14,.72,leather,7);leg.position.set(x,.38,0);g.add(leg)}
 const rag=box(.86,.18,.58,leather);rag.position.y=.73;g.add(rag);
 const bow=mesh(new T.TorusGeometry(.42,.045,6,14,Math.PI),M(0x8b5a32));bow.position.set(.78,1.25,.1);bow.rotation.z=-.45;g.add(bow);
 return creatureFinish(g)}
function giantSpider(){const g=new T.Group(),bodyM=M(0x272a32),abd=M(0x4a3b42),legM=M(0x1a1c22),eyeM=G(0xff4f62);
 const abdomen=sph(.72,abd);abdomen.scale.set(1.15,.82,1.38);abdomen.position.set(0,.92,-.18);g.add(abdomen);
 const thorax=sph(.55,bodyM);thorax.scale.set(1.18,.82,1.05);thorax.position.set(0,.92,.72);g.add(thorax);
 const head=sph(.38,bodyM);head.position.set(0,.98,1.2);g.add(head);eyePair(g,1.12,1.5,0xff5566);
 for(const x of[-1,1])for(let i=0;i<4;i++){const leg=cyl(.075,1.35,legM,6);const sx=x*(.42+i*.06), sz=.72-i*.48;leg.position.set(sx,.78,sz);leg.rotation.z=x*(.65+i*.12);leg.rotation.x=(i-1.5)*.12;g.add(leg);const foot=cyl(.055,.62,legM,6);foot.position.set(x*(.95+i*.1),.46,sz+(i%2?.18:-.12));foot.rotation.z=x*1.05;g.add(foot)}
 return creatureFinish(g)}
function slime(){const g=new T.Group(),body=sph(.82,M(0x6d9bcb,.25));body.scale.set(1.08,.7,.95);body.position.y=.62;g.add(body);eyePair(g,.68,.68,0xfff1a8);return creatureFinish(g)}
function wolf(){const g=new T.Group(),fur=M(0x7c7d7d),dark=M(0x34383b),nose=M(0x18191b);
 const torso=sph(.82,fur);torso.scale.set(1.45,.72,1.0);torso.position.y=.95;g.add(torso);
 const chest=sph(.48,fur);chest.scale.set(.85,1.05,.8);chest.position.set(0,1.12,.65);g.add(chest);
 const head=sph(.48,fur);head.position.set(0,1.72,1.0);g.add(head);
 const muzzle=sph(.25,fur);muzzle.scale.set(.8,.7,1.25);muzzle.position.set(0,1.6,1.35);g.add(muzzle);
 const sn=sph(.085,nose);sn.position.set(0,1.59,1.58);g.add(sn);eyePair(g,1.84,1.36,0xffd55c);
 for(const x of[-1,1]){const ear=cone(.23,.58,fur,5);ear.position.set(x*.3,2.08,.93);ear.rotation.z=x*.18;g.add(ear)}
 for(const x of[-.5,.5])for(const z of[-.38,.35]){const leg=cyl(.12,.72,dark,7);leg.position.set(x,.4,z);g.add(leg);const paw=sph(.14,dark);paw.position.set(x,.08,z+.08);g.add(paw)}
 const tail=cyl(.12,1.0,fur,7);tail.position.set(0,1.12,-.9);tail.rotation.x=-.95;tail.rotation.z=.25;g.add(tail);
 return creatureFinish(g)}
function wraith(){const g=new T.Group(),body=G(0x6d9dff,.48),core=sph(.7,body);core.position.y=1.25;core.scale.set(1,.95,.75);g.add(core);const hood=cone(.7,.9,G(0x354f91,.75),8);hood.position.y=1.85;g.add(hood);eyePair(g,1.45,.58,0xffffff);for(const x of[-.5,.5]){const arm=cyl(.1,1.0,G(0x78b8ff,.38),7);arm.position.set(x,1.05,.05);arm.rotation.z=x<0?-.8:.8;g.add(arm)}return creatureFinish(g)}
function orc(){const g=new T.Group(),skin=M(0x617640),armor=M(0x453c35),leather=M(0x6d472c),fur=M(0x302d2b),metal=M(0xb7bec5,.3,.6);
 const belly=sph(.72,skin);belly.scale.set(1.25,1.12,.82);belly.position.y=1.12;g.add(belly);
 const chest=box(1.28,.72,.72,armor);chest.position.set(0,1.5,.05);g.add(chest);
 const head=sph(.68,skin);head.scale.set(1.08,1,.92);head.position.y=2.35;g.add(head);
 for(const x of[-1,1]){const ear=cone(.3,.6,skin,5);ear.position.set(x*.7,2.42,0);ear.rotation.z=x*.5;g.add(ear)}
 eyePair(g,2.4,.57,0xffc34d);
 for(const x of[-1,1]){const tusk=cone(.11,.4,M(0xe8dec7),6);tusk.position.set(x*.18,2.05,.6);tusk.rotation.x=Math.PI;g.add(tusk)}
 for(const x of[-.34,.34]){const leg=cyl(.2,.85,armor,8);leg.position.set(x,.48,0);g.add(leg)}
 for(const x of[-1,1]){const arm=cyl(.2,1.0,skin,8);arm.position.set(x*.75,1.35,0);arm.rotation.z=x*.3;g.add(arm);const br=box(.42,.28,.52,leather);br.position.set(x*.7,1.25,.08);g.add(br)}
 const shoulder=box(1.5,.2,.8,fur);shoulder.position.y=1.9;g.add(shoulder);
 const axe=box(.11,1.55,.13,metal);axe.position.set(.98,1.25,.1);axe.rotation.z=-.55;g.add(axe);const blade=box(.7,.42,.14,metal);blade.position.set(1.0,1.86,.1);g.add(blade);
 return creatureFinish(g)}
const kinds=[['Gobelin',goblin,65,12,1.8],['Araignée géante',giantSpider,95,17,1.7],['Loup des Brumes',wolf,80,15,2.2],['Spectre',wraith,105,18,1.4],['Orc',orc,145,22,1.55]];
const enemies=[];
function spawn(kind,x,z){const k=kinds[kind],e={kind:k[0],model:k[1](),x,z,radius:k[4]*.28,hp:k[2]+S.level*7,max:k[2]+S.level*7,atk:k[3],speed:k[4],cd:rand(0,.8),dead:false};e.model.position.set(x,0,z);scene.add(e.model);enemies.push(e);return e}
for(let i=0;i<5;i++)spawn(0,rand(-48,-27),rand(-40,5));
for(let i=0;i<4;i++)spawn(1,rand(25,65),rand(-45,45));
for(let i=0;i<4;i++)spawn(2,rand(20,60),rand(25,70));
for(let i=0;i<3;i++)spawn(3,rand(-65,-30),rand(25,65));
for(let i=0;i<2;i++)spawn(4,rand(-55,-30),rand(-68,-52));
function chest(x,z){const g=new T.Group(),c=box(1.4,.75,1,M(0x7b4a25));c.position.y=.45;g.add(c);const lid=box(1.45,.35,1.05,M(0xb67a32));lid.position.y=.93;g.add(lid);const lock=box(.18,.22,.08,M(0xf0cc57,.3,.7));lock.position.set(0,.65,.54);g.add(lock);g.position.set(x,0,z);scene.add(g);return g}
const chests=[chest(-28,13),chest(27,-8),chest(48,26),chest(-53,-45)];const opened=new Set();
function rank(){return S.guild>=100?'S':S.guild>=75?'A':S.guild>=55?'B':S.guild>=35?'C':S.guild>=18?'D':S.guild>=7?'E':'F'}
function need(){return 80+(S.level-1)*60}
function save(){S.saveVersion=4;try{localStorage.setItem('otaku3d',JSON.stringify(S));}catch(e){toast('Sauvegarde indisponible sur cet appareil.')}hud()}
function gainxp(n){S.xp+=n;while(S.xp>=need()){S.xp-=need();S.level++;S.maxHp+=18;S.hp=S.maxHp;S.skillPoints=(S.skillPoints||0)+1;if(S.level%3===0)S.weaponLevel=(S.weaponLevel||1)+1;if(S.level%5===0)S.armorLevel=(S.armorLevel||1)+1;if(S.level===3){S.awakening=1;toast('Eveil 1 : Lame de l Heritage debloquee !')}else if(S.level===6){S.awakening=2;toast('Eveil 2 : Frappe royale debloquee !')}else if(S.level===10){S.awakening=3;toast('Eveil 3 : Heritage du Royaume debloque !')}else toast('Niveau '+S.level+' - +1 point de technique !')}}
function hud(){const hp=Math.max(0,100*S.hp/S.maxHp),xp=100*S.xp/need();const chapter=S.chapter||1;document.getElementById('stats').innerHTML='<b>AREN · HÉRITIER · RANG '+rank()+'</b><br>❤️ '+Math.round(S.hp)+'/'+S.maxHp+' · Niv. '+S.level+' · 💰 '+S.gold+'<div class="bar"><div class="hp" style="width:'+hp+'%"></div></div><div class="bar"><div class="xp" style="width:'+xp+'%"></div></div><span class="small">XP '+S.xp+'/'+need()+' · Réputation '+S.rep+' · Relics '+(S.relics||0)+'/7 · Éveil '+(S.awakening||0)+'</span>';const q=S.stage===0?'Retrouver Lyra et découvrir l’héritage':S.stage===1?'Accepter le premier contrat de la Guilde':S.stage===2?'Vaincre 3 créatures pour prouver ta valeur ('+S.kills+'/3)':S.stage===3?'Retourner à Lyra : la carte du Royaume':S.stage===4?'Récupérer les fragments du Royaume perdu ('+(S.relics||0)+'/3)':S.stage===5?'Atteindre les Ruines du Trône oublié':S.stage===6?'Briser le sceau du Royaume perdu':'Explorer les terres et révéler les secrets des Héritiers';document.getElementById('quest').innerHTML='<b>📜 CHAPITRE '+chapter+' · QUÊTE</b><br>'+q+'<br><span class="small">Guilde '+rank()+' · 🧪 '+S.potions+' · ⚔️ '+S.skills+' techniques · 🔥 Héritage '+(S.awakening||0)+'</span>'}
let toastTimer=0;function toast(t){const e=document.getElementById('message');e.textContent=t;e.style.display='block';toastTimer=3}
let dialog=false;function closeDialog(){dialog=false;document.getElementById('dialog').style.display='none';hud()}
function dialogBox(w,t,opts){dialog=true;document.getElementById('speaker').textContent=w;document.getElementById('dialogText').textContent=t;const c=document.getElementById('choices');c.innerHTML='';opts.forEach(o=>{const b=document.createElement('button');b.className='choice';b.textContent=o[0];b.onclick=o[1];c.appendChild(b)});document.getElementById('dialog').style.display='block'}
function interact(){if(!started||dialog)return;if(homeInteract())return;if(dist(player,lyra)<4.5){if(S.stage===0)dialogBox('LYRA · GARDIENNE DES HÉRITIERS','Aren… le Royaume n’a pas disparu. Il a été scellé. Ton sang porte l’un des héritages capables de briser le sceau. Je t’ai cherché pour une raison.',[['Éveiller l’héritage',()=>{S.stage=1;S.chapter=1;S.bond+=10;closeDialog();toast('🌟 Chapitre I : Le dernier Héritier commence.');save()}]]);else if(S.stage===1)dialogBox('LYRA','La Guilde ignore encore qui tu es. Trois créatures doivent tomber avant que nous puissions traverser les frontières du Royaume.',[['Accepter le contrat',()=>{S.stage=2;S.guild+=5;closeDialog();toast('⚔️ Contrat accepté : prouve ta valeur.');save()}]]);else if(S.stage===2&&S.kills>=3)dialogBox('LYRA','Tu as réussi. Regarde cette carte : sept fragments de la Couronne d’Aube sont dispersés dans le Royaume perdu.',[['Suivre la carte',()=>{S.stage=4;S.chapter=2;S.rep+=20;S.guild+=15;S.gold+=80;gainxp(100);closeDialog();toast('🗺️ Chapitre II : Les Fragments de la Couronne.');save()}]]);else if(S.stage===3)dialogBox('LYRA','Le premier fragment réagit à ta présence. Les montagnes cachent les Ruines du Trône oublié.',[['Continuer',()=>{S.stage=4;S.chapter=2;S.rep+=20;S.guild+=15;gainxp(80);closeDialog();toast('🗺️ La chasse aux fragments commence.');save()}]]);else if(S.stage===4)dialogBox('LYRA','Chaque fragment renforce ton héritage. Mais les orcs gardent les chemins anciens et les spectres protègent les ruines.',[['Continuer',()=>{S.stage=5;S.chapter=3;S.relics=Math.min(7,(S.relics||0)+1);closeDialog();toast('🏰 Chapitre III : Les Ruines du Trône.');save()}]]);else if(S.stage===5)dialogBox('LYRA','Le sceau est proche. Lorsque les sept fragments seront réunis, le Royaume perdu pourra renaître.',[['Jurer de poursuivre',()=>{S.stage=6;S.chapter=4;S.bond+=5;closeDialog();toast('👑 Chapitre IV : Le Royaume perdu t’attend.');save()}]]);else dialogBox('LYRA','Nous sommes désormais au cœur du Royaume perdu. Chaque niveau révèle une part de ton pouvoir. Continue de combattre, explorer et retrouver les fragments.',[['Continuer l’exploration',()=>{S.bond++;closeDialog()}]]);return}
for(const c of chests){if(!opened.has(c)&&Math.hypot(player.x-c.position.x,player.z-c.position.z)<2.7){opened.add(c);c.rotation.x=-.25;S.gold+=rand(15,45)|0;S.loot++;if((S.stage||0)>=4)S.relics=Math.min(7,(S.relics||0)+1);gainxp(25);toast((S.stage||0)>=4?'👑 Fragment du Royaume retrouvé !':'🎁 Coffre ouvert : butin trouvé !');if(S.relics>=3&&S.stage===4){S.stage=5;S.chapter=3;toast('🏰 Trois fragments réunis : les Ruines du Trône sont révélées !')}save();return}}toast('Il n’y a personne à qui parler ici.')}
function potion(){if(S.potions<=0)return toast('Plus de potion.');if(S.hp>=S.maxHp)return toast('PV au maximum.');S.potions--;S.hp=Math.min(S.maxHp,S.hp+55);save();toast('🧪 Potion utilisée : +55 PV')}
let attackCd=0;
function slashEffect(){const g=new T.Group();const a=mesh(new T.TorusGeometry(1.35,.1,8,24,Math.PI*1.35),G(0x9fe6ff,.95));a.rotation.x=Math.PI/2;g.add(a);g.position.set(player.x,1.4,player.z+1);scene.add(g);fx.push({g,t:0})}
const fx=[];
function attack(){if(!started||dialog||attackCd>0)return;attackCd=.45;let best=null,bd=4;for(const e of enemies){const d=dist(player,e);if(d<bd){bd=d;best=e}}if(!best)return toast('Aucun ennemi à portée.');const critChance=.08+(S.crit||0)*.03;const critical=Math.random()<critChance;let power=1;if((S.awakening||0)>=1)power+=.12;if((S.awakening||0)>=2&&critical)power+=.25;if((S.awakening||0)>=3)power+=.12;const damage=Math.round((25+S.level*6+(S.weaponLevel||1)*4+(S.skills||0)*3)*power*(critical?1.8:1));best.hp-=damage;player.attack=.42;player.attackT=0;slashEffect();toast((critical?'💥 CRITIQUE — ':'⚔️ IMPACT — ')+best.kind+' -'+damage);if(best.hp<=0){scene.remove(best.model);best.dead=true;S.kills++;S.gold+=best.kind==='Gobelin'?16:11;S.rep+=best.kind==='Gobelin'?4:2;S.guild+=2;if((S.stage||0)>=4&&Math.random()<.55){S.relics=Math.min(7,(S.relics||0)+1);toast('👑 Un fragment ancien tombe de '+best.kind+' !')}gainxp(best.kind==='Loup des Brumes'?38:28);if(S.stage===2&&S.kills>=3){S.stage=3;toast('🏆 Mission accomplie ! Retourne voir Lyra.')}if(S.relics>=7&&S.stage>=5){S.stage=6;S.chapter=4;toast('👑 Les sept fragments sont réunis : le sceau peut être brisé !')}save()}}
function skill(){S.skillPoints=S.skillPoints||0;if(S.skillPoints>0){S.skillPoints--;S.skills++;S.maxHp+=7;S.crit=Math.min(8,(S.crit||0)+1);toast('✨ Technique '+S.skills+' débloquée !');save();return}if(S.gold<35)return toast('Aucun point de technique. Il faut 35 pièces pour apprendre.');S.gold-=35;S.skills++;S.maxHp+=5;S.crit=Math.min(8,(S.crit||0)+1);toast('✨ Nouvelle technique apprise !');save()}
function animate(dt){for(const m of mixers)m.update(dt);for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;f.g.scale.setScalar(1+f.t*1.7);f.g.rotation.y+=dt*10;f.g.children[0].material.opacity=Math.max(0,1-f.t*3);if(f.t>.55){scene.remove(f.g);fx.splice(i,1)}}if(lyra.model)lyra.model.position.y=Math.sin(phase*1.6)*.025;const a=player.actions,w=a&&(player.attack>0?a.idle:(player.walking?a.walk:a.idle));if(w&&!w.isRunning()){Object.values(a).filter(Boolean).forEach(x=>x.stop());w.reset().fadeIn(.12).play()}if(player.attack>0){player.attack=Math.max(0,player.attack-dt);player.attackT+=dt;const p=Math.min(1,player.attackT/.42);player.model.rotation.y+=Math.sin(p*Math.PI)*1.8}}
async function startGame(e){if(e){e.preventDefault();e.stopPropagation()}if(started)return;started=true;try{if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen({navigationUI:'hide'}).catch(()=>{});if(screen.orientation&&screen.orientation.lock)await screen.orientation.lock('landscape').catch(()=>{});}catch(_){}const intro=document.getElementById('intro');if(intro)intro.style.display='none';toast('🌅 Les Héritiers du Royaume Perdu commencent. Retrouve Lyra au village.');try{renderer.domElement.focus()}catch(_){} }
window.__OTAKU_START__=startGame;
start.addEventListener('pointerdown',e=>{e.preventDefault();startGame(e)},{passive:false});
start.addEventListener('click',e=>{e.preventDefault();startGame(e)});
hud();
const keys={};
const keyMap={ArrowUp:'w',ArrowDown:'s',ArrowLeft:'a',ArrowRight:'d',z:'w',q:'a',w:'w',s:'s',a:'a',d:'d'};
window.addEventListener('keydown',e=>{
 const raw=e.key, k=raw.length===1?raw.toLowerCase():raw;
 const mapped=keyMap[k];
 if(mapped){keys[mapped]=true;e.preventDefault()}
 if(raw===' '){e.preventDefault();attack()}
 else if(k==='e'){e.preventDefault();interact()}
 else if(k==='p'){e.preventDefault();potion()}
 else if(k==='k'){e.preventDefault();skill()}
});
window.addEventListener('keyup',e=>{
 const raw=e.key, k=raw.length===1?raw.toLowerCase():raw, mapped=keyMap[k];
 if(mapped){keys[mapped]=false;e.preventDefault()}
});
document.querySelectorAll('[data-key]').forEach(b=>{const k=b.dataset.key;b.onpointerdown=e=>{e.preventDefault();keys[k]=true};b.onpointerup=b.onpointercancel=b.onpointerleave=()=>keys[k]=false});document.querySelectorAll('[data-act]').forEach(b=>{let skipClick=false;const run=()=>{const fn={attack,potion,interact,skill}[b.dataset.act];if(fn)fn()};b.addEventListener('pointerup',e=>{if(e.pointerType==='mouse')return;e.preventDefault();skipClick=true;run();setTimeout(()=>skipClick=false,350)});b.addEventListener('click',e=>{e.preventDefault();if(skipClick)return;run()})});

// Mobile virtual joystick: continuous 360° movement, no button mashing required.
const joystick=document.getElementById('joystick'),stick=document.getElementById('stick');
if(joystick&&stick){
 let pid=null;
 const move=e=>{if(pid===null)return;const r=joystick.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,max=r.width*.34;let dx=e.clientX-cx,dy=e.clientY-cy;const d=Math.hypot(dx,dy),q=d>max?max/d:1;dx*=q;dy*=q;stick.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`;joystick.dataset.x=(dx/max).toFixed(3);joystick.dataset.z=(dy/max).toFixed(3);};
 const end=()=>{pid=null;joystick.dataset.active='0';joystick.dataset.x='0';joystick.dataset.z='0';stick.style.transform='translate(-50%,-50%)'};
 joystick.addEventListener('pointerdown',e=>{pid=e.pointerId;joystick.dataset.active='1';joystick.setPointerCapture(pid);move(e)});
 joystick.addEventListener('pointermove',move);joystick.addEventListener('pointerup',end);joystick.addEventListener('pointercancel',end);
}
function tryLandscape(){try{if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{});}catch(e){}}
document.addEventListener('pointerdown',tryLandscape,{once:true});document.addEventListener('click',tryLandscape,{once:true});window.addEventListener('orientationchange',()=>{setTimeout(()=>{tryLandscape();resizeGame()},120)});
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(MOBILE?Math.min(devicePixelRatio||1,1.15):Math.min(devicePixelRatio||1,1.5))});
let started=false,last=performance.now(),phase=0;
function loop(t){const dt=Math.min(.05,(t-last)/1000);last=t;phase+=dt;
if(started&&!dialog){lyra.model.position.set(lyra.x,0,lyra.z);lyra.model.rotation.y=Math.sin(phase*.5)*.18;let x=(keys.d?1:0)-(keys.a?1:0),z=(keys.s?1:0)-(keys.w?1:0);const joy=document.getElementById('joystick');if(joy&&joy.dataset.active==='1'){x=+(joy.dataset.x||0);z=+(joy.dataset.z||0)}const l=Math.hypot(x,z);if(l>0.04){x/=l;z/=l;const accel=22;player.vx+=(x*5.8-player.vx)*Math.min(1,accel*dt);player.vz+=(z*5.8-player.vz)*Math.min(1,accel*dt);const nx=player.x+player.vx*dt,nz=player.z+player.vz*dt;movePlayer(nx,nz);if(Math.hypot(player.vx,player.vz)>.05)player.model.rotation.y=Math.atan2(player.vx,player.vz)+Math.PI;player.walking=true}else{player.vx*=Math.pow(.001,dt);player.vz*=Math.pow(.001,dt);if(Math.hypot(player.vx,player.vz)<.05){player.vx=0;player.vz=0}player.walking=Math.hypot(player.vx,player.vz)>.12;}
separateFromDynamic();player.x=Math.max(-82,Math.min(82,player.x));player.z=Math.max(-82,Math.min(82,player.z));player.model.position.set(player.x,0,player.z);
for(const e of enemies){if(e.dead)continue;e.cd-=dt;const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz);if(d<22&&d>.4){const ex=e.x+dx/d*e.speed*dt,ez=e.z+dz/d*e.speed*dt;
if(!blockedAt(ex,ez)){e.x=ex;e.z=ez;}
e.model.position.set(e.x,0,e.z);e.model.rotation.y=Math.atan2(dx,dz)}if(d<1.7&&e.cd<=0){e.cd=1.1;const taken=Math.max(1,e.atk-Math.floor((S.armorLevel||1)*1.5));S.hp=Math.max(0,S.hp-taken);toast('💥 '+e.kind+' t’attaque ! -'+taken);if(S.hp===0){S.hp=S.maxHp*.55;player.x=S.saveX??0;player.z=S.saveZ??28;player.vx=0;player.vz=0;S.gold=Math.max(0,S.gold-20);toast('💀 Tu as été vaincu. Retour au village.')}save()}}
attackCd=Math.max(0,attackCd-dt);if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)document.getElementById('message').style.display='none'}hud()}
const night=(Math.sin(phase*.025)+1)/2;sun.intensity=1.15+night*1.4;scene.fog.density=.0058+night*.003;scene.background.setHSL(.60,.45,.07+.06*night);animate(dt);
const camDist=MOBILE?7.8:10.5;const camTarget=new T.Vector3(player.x+camDist*.72,MOBILE?5.2:6.6,player.z+camDist);camera.position.lerp(camTarget,1-Math.pow(.001,dt));camera.lookAt(new T.Vector3(player.x,1.55,player.z));renderer.render(scene,camera);requestAnimationFrame(loop)}
requestAnimationFrame(loop);
})();
