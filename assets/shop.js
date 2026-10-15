/* Shop pages: sample products that are not in the catalog list, quantities, helpers. Loads after kv.js. */
const EXTRA=[
 {id:100,title:'Elden Ring',price:49.99,old:59.99,pct:17,act:'steam',xbox:false,pub:'',cover:'covers/04.webp',grad:1,sub:'Action RPG · FromSoftware · Released 25 Feb 2022',
  editions:[['Standard Edition','Base game, instant key',49.99],['Deluxe Edition','Game + soundtrack + artbook',64.99]],
  about:['Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.','A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected.'],
  min:[['OS','Windows 10'],['Processor','Intel Core i5-8400'],['Memory','12 GB RAM'],['Graphics','GTX 1060 3 GB'],['Storage','60 GB']],
  rec:[['OS','Windows 10/11'],['Processor','Intel Core i7-8700K'],['Memory','16 GB RAM'],['Graphics','GTX 1070 8 GB'],['Storage','60 GB SSD']],
  details:[['Platform','Steam'],['Region','Global'],['Release date','25 Feb 2022'],['Developer','FromSoftware'],['Publisher','Bandai Namco'],['Genres','Action RPG, Open world'],['Languages','English, German, French, +10']]},
 {id:101,title:'Hollow Knight: Silksong',price:29.99,act:'steam',xbox:false,pub:'',cover:'covers/01.webp',grad:3,preorder:'14 Nov 2026',sub:'Action Platformer · Team Cherry · Releases 14 Nov 2026',
  editions:[['Standard Edition','Base game, instant key',29.99],['Deluxe Edition','Game + soundtrack + artbook',39.99]],
  about:['Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.','A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected.'],
  min:[['OS','Windows 10'],['Processor','Intel Core i5-8400'],['Memory','12 GB RAM'],['Graphics','GTX 1060 3 GB'],['Storage','60 GB']],
  rec:[['OS','Windows 10/11'],['Processor','Intel Core i7-8700K'],['Memory','16 GB RAM'],['Graphics','GTX 1070 8 GB'],['Storage','60 GB SSD']],
  details:[['Platform','Steam'],['Region','Global'],['Release date','14 Nov 2026'],['Developer','Team Cherry'],['Publisher','Team Cherry'],['Genres','Action, Platformer'],['Languages','English, German, French, +10']]} ,
 {id:102,title:'Cyberpunk 2077',price:29.99,old:59.99,pct:50,act:'steam',xbox:false,pub:'',cover:'covers/16.webp',grad:4,sub:'Action RPG · CD PROJEKT RED · Released 10 Dec 2020',
  editions:[['Standard Edition','Base game, instant key',29.99]],
  about:['Cyberpunk 2077 is an open-world action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.'],
  details:[['Platform','Steam'],['Region','Global'],['Release date','10 Dec 2020'],['Developer','CD PROJEKT RED']]} ,
 {id:103,title:'Hades II',price:24.99,old:29.99,pct:17,act:'steam',xbox:false,pub:'',cover:'covers/07.webp',grad:2},
 {id:104,title:'Hogwarts Legacy',price:34.99,act:'steam',xbox:false,pub:'',cover:'covers/09.webp',grad:3}
];
const findGame=id=>GAMES[id]||EXTRA.find(g=>g.id===id);
/* quantities per cart item (default 1) */
let QTY={};try{QTY=JSON.parse(localStorage.getItem('kv-qty')||'{}')}catch(e){}
const qtyOf=id=>Math.max(1,Math.min(10,QTY[id]||1));
function setQty(id,n){QTY[id]=Math.max(1,Math.min(10,n));try{localStorage.setItem('kv-qty',JSON.stringify(QTY))}catch(e){}}
const eur=n=>'€'+n.toFixed(2);
const starIcons=()=>Array.from({length:5},()=>ic('star')).join('');
const qs=new URLSearchParams(location.search);
const PLAT={steam:'Steam',gog:'GOG',microsoft:'Microsoft Store'};

/* Demo content: the very first visit starts with two items in the cart (same as the Figma frames). Later changes are kept. */
try{if(!localStorage.getItem('kv-seeded')&&!S.cart.size){S.cart.add(100);S.cart.add(102);saveStore();localStorage.setItem('kv-seeded','1')}else localStorage.setItem('kv-seeded','1')}catch(e){}
try{syncCounts()}catch(e){}

/* Text field (label, field, helper/error) used by checkout and auth */
const fld=(id,label,val,ph,{help='',err='',bad=false,dis=false,type='text',mode='',ac=''}={})=>`<div class="tf"><label for="${id}" class="t-cm">${label}</label><div class="field l ${err||bad?'bad':''}"><input id="${id}" name="${id}" type="${type}" ${mode?`inputmode="${mode}"`:''} ${ac?`autocomplete="${ac}"`:''} value="${val}" placeholder="${ph}" ${dis?'disabled':''} aria-invalid="${!!(err||bad)}" ${err||help?`aria-describedby="${id}-h"`:''}></div>${err||help?`<p class="t-cm ${err?'er':''}" id="${id}-h">${err||help}</p>`:''}</div>`;
const CHECK='<svg viewBox="0 0 12 12" width="12" height="12" fill="none"><path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="var(--static-white)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const cbx=(on,attr,dis)=>`<button type="button" class="cb2 ${on?'on':''}" role="checkbox" aria-checked="${on}" ${attr} ${dis?'disabled':''}>${on?CHECK:''}</button>`;

/* Key card (Hidden / Revealed / Copied) used by order success and the account "My keys" tab */
const keyFor=g=>{const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let h=(g.id+7)*2654435761>>>0,o=[];for(let i=0;i<15;i++){h=(h*1103515245+12345)>>>0;o.push(A[(h>>>16)%A.length])}return [o.slice(0,5),o.slice(5,10),o.slice(10,15)].map(a=>a.join('')).join('-')};
const keyOf=g=>g.id===100?'K8F2M-QX7WP-93LDN':keyFor(g);
const coverBg=g=>g.cover?'':`style="background:var(--gradient-cover-0${g.grad||1})"`;
const coverImg=g=>g.cover?`<img src="${g.cover}" alt="">`:'';
function keyCardHTML(g,s,orderNo){const plat=PLAT[g.act]||'Steam';
  const act=s==='hidden'?`<button class="btn btn-pri" data-reveal="${g.id}">${ic('eye')}Reveal key</button>`:`<button class="btn btn-sec" data-copy="${g.id}">${ic(s==='copied'?'check':'copy')}${s==='copied'?'Copied':'Copy'}</button>`;
  return `<article class="kc ${s==='copied'?'ok':''}" data-id="${g.id}"><div class="kh"><span class="cv2" ${coverBg(g)}>${coverImg(g)}</span><div class="tx"><b class="t-mm">${g.title}</b><span class="t-cm">${plat} · Global · Order ${orderNo}</span></div></div>
  <div class="kb"><code class="t-key" ${s==='hidden'?'aria-label="Key hidden"':''}>${s==='hidden'?'•••••-•••••-•••••':keyOf(g)}</code>${act}</div>
  <p class="hint t-cm">${ic('info')}<span>Redeem on ${plat}: Games → Activate a Product on ${plat}.</span></p></article>`}
/* Toast */
function toast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}
  t.innerHTML=ic('check-circle')+'<span class="t-sm">'+msg+'</span>';t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2400)}
