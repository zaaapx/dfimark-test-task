/* Home page: featured carousel, platforms, popular now (tabs), games under €1, collections, how it works. Loads after kv.js. */
/* ---------- Home: data (same as Figma "Home — Desktop 1440") ---------- */
const HERO=[7,8,14,0];
const PLATFORMS=[['steam','Steam',26697],['ea','EA app',227],['ubisoft','Ubisoft Connect',189],['gog','GOG',363],['epic','Epic Games',91],['battlenet','Battle.net',28]];
const TABS=[['best','Bestsellers'],['new','New releases'],['deals','Deals']];
const COLLECTIONS=[['Upcoming · 2 576 games','Pre-order now','04'],['Collection','New releases','15'],['Collection','Random keys','11'],['Any region','Global keys','09']];
const STEPS=[['Choose a game','Filter by activation platform, device and region to find a key that works for you.'],['Pay securely','Pay by card, PayPal or crypto. Prices are final, with no hidden fees at checkout.'],['Get your key instantly','Your key appears in your account and arrives by email, ready to activate.']];
const H={slide:0,tab:'best'};

/* Hero/Featured */
function heroHTML(){const g=GAMES[HERO[H.slide]], w=S.wish.has(g.id), c=S.cart.has(g.id);
  return `<img class="bd" src="${g.cover}" alt="" aria-hidden="true"><div class="scr"></div>
  <div class="hl"><div class="hc" aria-live="polite">${g.pct?`<span class="hbadge">−${g.pct}%</span>`:''}
    <div class="hhd"><h2 class="t-h1">${g.title}</h2>
    <div class="hmeta">${img(ACT_ICON[g.act])}<span>${{steam:'Steam',gog:'GOG',microsoft:'Microsoft Store'}[g.act]} key · PC${g.xbox?' · Xbox':''} · Global</span></div></div>
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

/* ---------- Trust row (Feature) ---------- */
const TRUST=[['shield','Buyer protection','Every key is checked before it goes on sale'],['bolt','Instant delivery','Keys arrive in your account and by email'],['card','Pay your way','Cards, PayPal, wallets and crypto'],['support','Support 24/7','Real people in chat, replies in 10 minutes']];
$('#trust').innerHTML=TRUST.map(([i,t,d])=>`<div class="feat"><span class="ft">${ic(i)}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('');

/* ---------- Deals of the week: real weekly deadline, Sunday 23:59:59 Europe/Lisbon ---------- */
const DEAL_ART=[['08',-24,56,-10],['15',48,196,6],['12',1128,40,10],['04',1040,196,-6]];
const DEAL_ART_M=[['08',-20,40,-8],['15',95,24,0],['12',210,40,8]];
const cover=([n,x,y,r],cls)=>`<img class="dc ${cls}" src="covers/${n}.webp" alt="" style="left:${x}px;top:${y}px;transform:rotate(${-r}deg)">`;
$('#dealsArt').innerHTML=`<i class="glow" style="left:-40px;top:80px"></i><i class="glow" style="left:1144px;top:80px"></i>${DEAL_ART.map(a=>cover(a,'d')).join('')}<i class="glow m" style="left:100px;top:0"></i>${DEAL_ART_M.map(a=>cover(a,'m')).join('')}`;
function timeLeft(){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Lisbon',weekday:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));
  const dow=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday), sec=+p.hour*3600+ +p.minute*60+ +p.second;
  return ((7-dow)%7)*86400+86399-sec}
const pad2=n=>String(n).padStart(2,'0');
function tick(){const t=timeLeft(),u=[[Math.floor(t/86400),'Days'],[Math.floor(t%86400/3600),'Hours'],[Math.floor(t%3600/60),'Min'],[t%60,'Sec']];
  $('#countdown').innerHTML=u.map(([v,l])=>`<span class="cu"><b>${pad2(v)}</b><small>${l}</small></span>`).join('')}
tick();setInterval(tick,1000);

/* ---------- Gift cards / Software (Category card + Voucher) ---------- */
const CATS=[['Gift cards','Top up Steam, PlayStation, Xbox and Nintendo accounts in any currency.','33 766 products',[['nintendo','Nintendo eShop','€25'],['psn','PlayStation Store','€50'],['steam','Steam Wallet','€20']]],
 ['Software','Operating systems, office suites and security tools with lifetime licences.','1 410 products',[['official','VPN · 1 year','5 devices'],['microsoft','Office 2021','Lifetime'],['microsoft','Windows 11 Pro','Lifetime']]]];
$('#cats').innerHTML=CATS.map(([t,d,n,v])=>`<a class="cat" href="catalog.html"><div class="ct"><div><h2 class="t-h2">${t}</h2><p>${d}</p></div><span class="cn">${n}${ic('chevron-right')}</span></div>
  <div class="ca" aria-hidden="true"><i class="glow"></i>${v.map(([l,a,b],i)=>`<span class="vch v${i}"><img src="ic/${l}.png" alt="" width="24" height="24"><span><b>${a}</b><small>${b}</small></span></span>`).join('')}</div></a>`).join('');

/* ---------- Genres, devices ---------- */
const GENRES=[['Action','05'],['Adventure','08'],['RPG','06'],['Shooter','02'],['Strategy','11'],['Indie','03']];
$('#genres').innerHTML=GENRES.map(([l,c])=>`<a class="genre" href="catalog.html" style="background-image:url(covers/${c}.webp)"><span>${l}</span></a>`).join('');
const DEVICES=[['dev-pc','PC','Steam, EA app, Epic Games, GOG','Steam, EA app, Epic, GOG'],['dev-ps','PlayStation','PSN gift cards and games','PSN cards and games'],['dev-xbox','Xbox','Xbox keys and Game Pass','Keys and Game Pass'],['dev-switch','Nintendo Switch','eShop gift cards and games','eShop cards and games']];
$('#devices').innerHTML=DEVICES.map(([i,n,s,sm])=>`<a class="dev" href="catalog.html"><span class="dt"><img src="ic/${i}.png" alt="" width="40" height="40"></span><span><b>${n}</b><small><span class="dl">${s}</span><span class="m-only">${sm}</span></small></span></a>`).join('');

/* ---------- Reviews (concept data), guides, FAQ ---------- */
const stars=()=>ic('star').repeat(5);
$$('.rating .stars').forEach(e=>e.innerHTML=stars());
const REVIEWS=[['MK','Marta K.','Death Stranding Director’s Cut','Key arrived in under a minute and activated in Steam straight away.','2 days ago'],['TH','Tom H.','DOOM Eternal','Cheaper than the seasonal sale, and the region was clearly marked on the card.','4 days ago'],['IR','Inês R.','Steam Wallet €20','Bought a top-up for my brother. The code came by email right away.','1 week ago'],['LB','Lukas B.','Dune: Awakening','Support sorted out my EA app and Steam mix-up in chat within five minutes.','2 weeks ago']];
$('#reviewList').innerHTML=REVIEWS.map(([i,n,p,t,m])=>`<article class="rev"><div class="ra"><span class="av" aria-hidden="true">${i}</span><div><b>${n}</b><small>${p}</small></div></div><span class="stars" role="img" aria-label="5 out of 5">${stars()}</span><p>${t}</p><small>Verified purchase · ${m}</small></article>`).join('');
const GUIDES=[['GUIDE','3 min read','How to activate a Steam key','Redeem a product code in the Steam app or in the browser, step by step.','01'],['GUIDE','4 min read','What region-locked keys mean','Global, EU or country keys: check before you buy so the key works for you.','09'],['GUIDE','2 min read','Redeeming a code in the EA app','Where to find Redeem code and what to do if the app says the code was used.','14'],['TIPS','5 min read','Gift cards or game keys?','When a top-up is the better buy, and how currencies and fees work.','12']];
$('#guides').innerHTML=GUIDES.map(([g,r,t,e,c])=>`<a class="guide" href="#"><img src="covers/${c}.webp" alt="" loading="lazy"><span class="gb"><span class="gm"><span class="gt">${g}</span>${ic('clock')}<span>${r}</span></span><b>${t}</b><span class="gx">${e}</span></span></a>`).join('');
const FAQ=[['What is KeyVault and how does it work?','KeyVault sells digital keys for PC and console games, gift cards and software. You pay, the key appears in your account and arrives by email, then you activate it on the platform.'],['Is KeyVault a marketplace?','No. KeyVault buys keys directly from publishers and authorised distributors and sells them as one store, so every key comes with the same guarantee.'],['How fast will I get my key?','Most keys are delivered instantly. Pre-orders arrive on release day, and we email you as soon as the key is ready.'],['Will the key work in my country?','Every product shows its region. Global keys work everywhere; regional keys only activate in the listed countries.'],['Which payment methods can I use?','Cards, PayPal, Apple Pay, Google Pay, Klarna, Skrill and SEPA bank transfer. The price you see is final at checkout.'],['What if my key does not work?','Contact support from your order page. We check the key and replace it or refund you, usually within an hour.']];
$('#faqList').innerHTML=FAQ.map(([q,a],i)=>`<details class="qa"${i?'':' open'}><summary>${q}${ic('chevron-down')}</summary><p>${a}</p></details>`).join('');

KV.render=render;
render();
