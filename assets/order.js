/* Order success: key cards (Hidden → Revealed → Copied). Reads the order saved by checkout; falls back to the demo order from Figma. */
let O=null;try{O=JSON.parse(localStorage.getItem('kv-order')||'null')}catch(e){}
if(!O)O={id:'KV-48213',email:'marta.k@example.com',ids:[100,102]};
const items=O.ids.map(findGame).filter(Boolean);
const first=qs.get('state');
const ST={};items.forEach((g,i)=>ST[g.id]=i===0&&first==='revealed'?'revealed':i===0&&first==='copied'?'copied':'hidden');
const card=g=>keyCardHTML(g,ST[g.id],O.id);
const plat0=items[0]?PLAT[items[0].act]||'Steam':'Steam';
$('#os').innerHTML=`<div class="osc"><div class="oh">${ic('check-circle')}<h1 class="t-h1">Your order is confirmed</h1><p class="t-mr">Order ${O.id} · keys sent to ${O.email}</p></div>
 <div class="keys" aria-live="polite">${items.map(card).join('')}</div>
 <div class="notice info">${ic('info')}<div><b>Need a hand activating?</b><p>Open ${plat0}, go to Games → Activate a Product on ${plat0} and paste the key. Our help centre has step-by-step guides.</p></div></div>
 <div class="oact"><a class="btn btn-pri m" href="account.html">View my orders</a><a class="btn btn-sec m" href="catalog.html">Continue shopping</a></div></div>`;
document.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;
  const draw=(id)=>{const g=findGame(id);const el=$(`.kc[data-id="${id}"]`);el.outerHTML=card(g)};
  if(b.dataset.reveal){const id=+b.dataset.reveal;ST[id]='revealed';draw(id);$(`.kc[data-id="${id}"] [data-copy]`).focus()}
  else if(b.dataset.copy){const id=+b.dataset.copy;try{await navigator.clipboard.writeText(keyOf(findGame(id)))}catch(_){}
    ST[id]='copied';draw(id);$(`.kc[data-id="${id}"] [data-copy]`).focus();setTimeout(()=>{if(ST[id]==='copied'){ST[id]='revealed';draw(id)}},2000)}});
