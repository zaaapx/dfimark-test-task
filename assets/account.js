/* Account: Orders, My keys, Wishlist, Settings. Desktop shows a sidebar; mobile shows a menu screen, then the chosen tab with a back link. */
let USER={name:'Marta Kowalska',email:'marta.k@example.com'};try{Object.assign(USER,JSON.parse(localStorage.getItem('kv-user')||'{}'))}catch(e){}
let NOTIF={orders:true,price:false};try{Object.assign(NOTIF,JSON.parse(localStorage.getItem('kv-notif')||'{}'))}catch(e){}
const TABS=[['orders','Orders','receipt'],['keys','My keys','key'],['wishlist','Wishlist','heart'],['settings','Settings','settings']];
const tabParam=qs.get('tab');const desk=()=>matchMedia('(min-width:1024px)').matches;
let TAB=TABS.some(t=>t[0]===tabParam)?tabParam:'';
const SAMPLE=[[100,'KV-48213','12 Sep 2026','Completed'],[102,'KV-48213','12 Sep 2026','Processing'],[103,'KV-47102','03 Aug 2026','Completed'],[104,'KV-45870','21 Jun 2026','Refunded']];
let LAST=null;try{LAST=JSON.parse(localStorage.getItem('kv-order')||'null')}catch(e){}
const ORDERS=[...(LAST?LAST.ids.map(id=>[id,LAST.id,new Date(LAST.at||Date.now()).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),'Completed']):[]),...SAMPLE.filter(s=>!(LAST&&LAST.ids.includes(s[0])&&s[1]===LAST.id))];
const KST={};ORDERS.forEach((o,i)=>KST[o[0]]=KST[o[0]]||(i===0?'revealed':'hidden'));
const KEYS=[...new Map(ORDERS.filter(o=>o[3]!=='Refunded').map(o=>[o[0],o])).values()].slice(0,3);
const pill=s=>`<span class="pill ${s.toLowerCase()}">${s}</span>`;
const orderRow=([id,no,dt,st])=>{const g=findGame(id);if(!g)return '';return `<article class="or"><span class="cv2" ${coverBg(g)}>${coverImg(g)}</span><div class="tx"><b class="t-mm">${g.title}</b><span class="t-cm"><span class="ono">Order </span>${no} · ${dt}</span></div>${pill(st)}<b class="t-pm pr2">${eur(g.price)}</b></article>`};
const sw=(k,l)=>`<div class="swr"><span class="t-sm">${l}</span><button type="button" class="tg ${NOTIF[k]?'on':''}" role="switch" aria-checked="${NOTIF[k]}" aria-label="${l}" data-tg="${k}"><i></i></button></div>`;
function content(t){
  if(t==='orders')return `<h1 class="t-h1">Orders</h1><div class="orders">${ORDERS.map(orderRow).join('')}</div>`;
  if(t==='keys')return `<h1 class="t-h1">My keys</h1><div class="keys">${KEYS.map(o=>keyCardHTML(findGame(o[0]),KST[o[0]],o[1])).join('')}</div>`;
  if(t==='wishlist'){const L=[...S.wish].map(i=>GAMES[i]).filter(Boolean);
    return `<h1 class="t-h1">Wishlist</h1>${L.length?`<div class="grid">${L.map(cardHTML).join('')}</div>`:`<div class="empty-st"><div class="tx"><h2 class="t-h3">Your wishlist is empty</h2><p class="t-sr">Tap the heart on any game and it will be saved here</p></div><a class="btn btn-pri m" href="catalog.html">Browse game keys</a></div>`}`}
  return `<h1 class="t-h1">Settings</h1>
  <form class="cg" id="prof" novalidate><h2 class="t-h3">Profile</h2><div class="row2">${fld('name','Name',USER.name,'Your name',{ac:'name'})}${fld('email','Email',USER.email,'name@example.com',{type:'email',ac:'email'})}</div><button class="btn btn-pri m" type="submit">Save changes</button></form>
  <section class="cg" aria-labelledby="h-nt"><h2 class="t-h3" id="h-nt">Notifications</h2>${sw('orders','Email me about order updates')}${sw('price','Email me when wishlist games get cheaper')}</section>
  <section class="cg" aria-labelledby="h-sc"><h2 class="t-h3" id="h-sc">Security</h2><div><button class="btn btn-sec m" type="button" data-pw>Change password</button></div></section>`}
function render(){
  const cur=TAB||(desk()?'orders':'');
  document.title=(cur?TABS.find(t=>t[0]===cur)[1]:'Account')+' · KeyVault';
  const nav=TABS.map(([k,l,i])=>`<a class="ni ${cur===k?'on':''}" href="account.html?tab=${k}" data-tab="${k}" ${cur===k?'aria-current="page"':''}>${ic(i)}<span>${l}</span></a>`).join('')+`<button class="ni" type="button" data-out>${ic('logout')}<span>Sign out</span></button>`;
  $('#ac').innerHTML=`<div class="acc ${cur?'has-tab':'no-tab'}"><nav class="side" aria-label="Account"><div class="mh"><h1 class="t-h1">Account</h1><div class="usr"><b class="t-mm">${USER.name}</b><span class="t-sr">${USER.email}</span></div></div>${nav}</nav>
  <section class="cnt"><a class="back t-sm" href="account.html" data-back>${ic('arrow-left')}Account</a>${cur?content(cur):''}</section></div>`;
  syncCounts();
}
if(TAB==='wishlist'||(!TAB&&desk()&&false)){}
try{if((TAB==='wishlist')&&!localStorage.getItem('kv-wish-seeded')&&!S.wish.size){[7,8,0,14,1,2,3,4].forEach(i=>S.wish.add(i));saveStore();localStorage.setItem('kv-wish-seeded','1')}else if(TAB==='wishlist')localStorage.setItem('kv-wish-seeded','1')}catch(e){}
KV.render=render;render();
matchMedia('(min-width:1024px)').addEventListener('change',render);
document.addEventListener('click',async e=>{
  const a=e.target.closest('a[data-tab],a[data-back]');
  if(a){e.preventDefault();TAB=a.dataset.tab||'';history.pushState(null,'',TAB?`?tab=${TAB}`:location.pathname);render();window.scrollTo(0,0);return}
  const b=e.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-out')){try{localStorage.removeItem('kv-user')}catch(_){}location.href='auth.html'}
  else if(b.dataset.tg){NOTIF[b.dataset.tg]=!NOTIF[b.dataset.tg];try{localStorage.setItem('kv-notif',JSON.stringify(NOTIF))}catch(_){}render();$(`[data-tg="${b.dataset.tg}"]`).focus()}
  else if(b.hasAttribute('data-pw'))toast('Password reset link sent to '+USER.email)
  else if(b.dataset.reveal){const id=+b.dataset.reveal;KST[id]='revealed';render();$(`.kc[data-id="${id}"] [data-copy]`).focus()}
  else if(b.dataset.copy){const id=+b.dataset.copy;try{await navigator.clipboard.writeText(keyOf(findGame(id)))}catch(_){}KST[id]='copied';render();toast('Copied to clipboard');setTimeout(()=>{if(KST[id]==='copied'){KST[id]='revealed';render()}},2000)}});
window.addEventListener('popstate',()=>{const p=new URLSearchParams(location.search).get('tab');TAB=TABS.some(t=>t[0]===p)?p:'';render()});
document.addEventListener('input',e=>{if(e.target.id==='name')USER.name=e.target.value;if(e.target.id==='email')USER.email=e.target.value});
document.addEventListener('submit',e=>{if(e.target.id!=='prof')return;e.preventDefault();
  try{localStorage.setItem('kv-user',JSON.stringify({name:USER.name,email:USER.email}))}catch(_){}toast('Changes saved')});
