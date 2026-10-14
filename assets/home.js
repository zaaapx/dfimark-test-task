/* Home page: featured carousel, platforms, popular now (tabs), games under €1, collections, how it works. Loads after kv.js. */
/* ---------- Home: data (same as Figma "Home — Desktop 1440") ---------- */
const HERO=[7,8,14,0];
const PLATFORMS=[['steam','Steam',26697],['ea','EA app',227],['ubisoft','Ubisoft Connect',189],['gog','GOG',363],['epic','Epic Games',91],['battlenet','Battle.net',28]];
const TABS=[['best','Bestsellers'],['new','New releases'],['deals','Deals']];
const COLLECTIONS=[['Upcoming · 2 576 games','Pre-order now','04'],['Collection','New releases','15'],['Collection','Random keys','11'],['Any region','Global keys','09']];
const STEPS=[['Choose a game','Filter by activation platform, device and region to find a key that works for you.'],['Pay securely','Pay by card, PayPal or crypto. Prices are final, with no hidden fees at checkout.'],['Get your key instantly','The key appears in your account and arrives by email. Activate it in Steam, EA app or another launcher.']];
const H={slide:0,tab:'best'};

/* Hero/Featured */
function heroHTML(){const g=GAMES[HERO[H.slide]], w=S.wish.has(g.id), c=S.cart.has(g.id);
  return `<img class="bd" src="${g.cover}" alt="" aria-hidden="true"><div class="scr"></div>
  <div class="hl"><div class="hc" aria-live="polite">${g.pct?`<span class="hbadge">−${g.pct}%</span>`:''}
    <h2 class="t-h1">${g.title}</h2>
    <div class="hmeta">${img(ACT_ICON[g.act])}<span>${{steam:'Steam',gog:'GOG',microsoft:'Microsoft Store'}[g.act]} key · PC${g.xbox?' · Xbox':''} · Global</span></div>
    <div class="hprice"><span class="cur">€${g.price.toFixed(2)}</span>${g.pct?`<s>€${g.old.toFixed(2)}</s>`:''}</div>
    <div class="hact"><button class="btn btn-pri m" data-cart="${g.id}">${ic(c?'check':'cart')}${c?'In cart':'Add to cart'}</button><button class="ib l ${w?'on':''}" data-wish="${g.id}" aria-pressed="${w}" aria-label="Add ${g.title} to wishlist">${ic('heart')}</button></div></div>
    <div class="hctl"><div class="arr"><button class="ib ov" data-slide="-1" aria-label="Previous slide">${ic('chevron-left')}</button><button class="ib ov" data-slide="1" aria-label="Next slide">${ic('chevron-right')}</button></div>
    <div class="dots">${HERO.map((_,i)=>`<button data-go="${i}" aria-label="Slide ${i+1} of ${HERO.length}" aria-current="${i===H.slide}"></button>`).join('')}</div></div></div>
  <a class="hm" href="catalog.html" tabindex="-1" aria-hidden="true"><img src="${g.cover}" alt=""></a>`}

/* Popular now: tabs switch the list */
function popList(){const l=[...GAMES];
  if(H.tab==='new') return l.sort((a,b)=>b.id%5-a.id%5||a.id-b.id).slice(0,10);
  if(H.tab==='deals') return l.sort((a,b)=>(b.pct||0)-(a.pct||0)||a.price-b.price).slice(0,10);
  return l.slice(0,10)}

function render(){
  $('#hero').innerHTML=heroHTML();
  $('#tabs').innerHTML=TABS.map(([v,l])=>`<button class="tab" role="tab" data-tab="${v}" aria-selected="${H.tab===v}" tabindex="${H.tab===v?0:-1}">${l}</button>`).join('');
  $('#popGrid').innerHTML=popList().map(cardHTML).join('');
  $('#cheapRow').innerHTML=GAMES.filter(g=>g.price<1).sort((a,b)=>a.price-b.price).map(cardHTML).join('');
  syncCounts();
}
$('#plats').innerHTML=PLATFORMS.map(([i,l,c])=>`<a class="ptile" href="catalog.html">${img(i)}<span><b>${l}</b><small>${fmt(c)} games</small></span></a>`).join('');
$('#cols').innerHTML=COLLECTIONS.map(([e,t,a])=>`<a class="promo" href="catalog.html" style="background-image:url(covers/${a}.webp)"><div><small>${e}</small><strong>${t}</strong></div></a>`).join('');
$('#steps').innerHTML=STEPS.map(([t,d],i)=>`<li class="step"><span class="n" aria-hidden="true">${i+1}</span><div><b>${t}</b><p>${d}</p></div></li>`).join('');

document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;
  if(d.slide){H.slide=(H.slide+ +d.slide+HERO.length)%HERO.length;return render()}
  if(d.go!==undefined){H.slide=+d.go;return render()}
  if(d.tab){H.tab=d.tab;render();$(`[data-tab="${d.tab}"]`).focus()}});
$('#tabs').addEventListener('keydown',e=>{if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;const i=TABS.findIndex(t=>t[0]===H.tab),n=(i+(e.key==='ArrowRight'?1:-1)+TABS.length)%TABS.length;H.tab=TABS[n][0];render();$(`[data-tab="${H.tab}"]`).focus()});
KV.render=render;
render();
