/* KeyVault UI stack — shared runtime: shell (Header/Desktop, Nav bar, Header/Mobile, Mobile menu, Footer), icons, data, Game card, cart & wishlist store.
   Every page loads tokens.css + kv.css + this file, then its own script. */
const KV=window.KV||{}; KV.page=document.body.dataset.page||'';
const ICONS={shield:'<path d="M10 3L15.5 5V9.5C15.5 13 13.2 15.6 10 17C6.8 15.6 4.5 13 4.5 9.5V5L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',card:'<rect x="2.75" y="4.75" width="14.5" height="10.5" rx="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.75 8.25H17.25M5.5 12.25H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',support:'<path d="M4 11.5V10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11.25H5.5C6.05228 11.25 6.5 11.6977 6.5 12.25V14C6.5 14.5523 6.05228 15 5.5 15H5C4.44772 15 4 14.5523 4 14V11.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 11.25H14.5C13.9477 11.25 13.5 11.6977 13.5 12.25V14C13.5 14.5523 13.9477 15 14.5 15H15C15.5523 15 16 14.5523 16 14V11.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 15V15.25C16 16.4926 14.9926 17.5 13.75 17.5H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',star:'<path d="M10 2.5L12.2 7.05L17.13 7.68L13.53 11.12L14.41 16.02L10 13.65L5.59 16.02L6.47 11.12L2.87 7.68L7.8 7.05L10 2.5Z" fill="currentColor"/>',clock:'<path d="M10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 13.5899 6.41015 16.5 10 16.5Z" stroke="currentColor" stroke-width="1.5"/><path d="M10 6.5V10L12.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',search:'<path d="M9 14.5C12.0376 14.5 14.5 12.0376 14.5 9C14.5 5.96243 12.0376 3.5 9 3.5C5.96243 3.5 3.5 5.96243 3.5 9C3.5 12.0376 5.96243 14.5 9 14.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 13L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
'chevron-down':'<path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
'chevron-left':'<path d="M12 6L8 10L12 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
'chevron-right':'<path d="M8 6L12 10L8 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
close:'<path d="M6 6L14 14M14 6L6 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
filter:'<path d="M3.5 5.5H16.5M6 10H14M8.5 14.5H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
grid:'<path d="M7.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V7.5C3.5 8.05228 3.94772 8.5 4.5 8.5H7.5C8.05228 8.5 8.5 8.05228 8.5 7.5V4.5C8.5 3.94772 8.05228 3.5 7.5 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 3.5H12.5C11.9477 3.5 11.5 3.94772 11.5 4.5V7.5C11.5 8.05228 11.9477 8.5 12.5 8.5H15.5C16.0523 8.5 16.5 8.05228 16.5 7.5V4.5C16.5 3.94772 16.0523 3.5 15.5 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 11.5H4.5C3.94772 11.5 3.5 11.9477 3.5 12.5V15.5C3.5 16.0523 3.94772 16.5 4.5 16.5H7.5C8.05228 16.5 8.5 16.0523 8.5 15.5V12.5C8.5 11.9477 8.05228 11.5 7.5 11.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 11.5H12.5C11.9477 11.5 11.5 11.9477 11.5 12.5V15.5C11.5 16.0523 11.9477 16.5 12.5 16.5H15.5C16.0523 16.5 16.5 16.0523 16.5 15.5V12.5C16.5 11.9477 16.0523 11.5 15.5 11.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
list:'<path d="M7.5 5.5H16.5M7.5 10H16.5M7.5 14.5H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="4.25" cy="5.5" r=".75" fill="currentColor"/><circle cx="4.25" cy="10" r=".75" fill="currentColor"/><circle cx="4.25" cy="14.5" r=".75" fill="currentColor"/>',
menu:'<path d="M4.5 5.5H15.5M4.5 10H15.5M4.5 14.5H15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
check:'<path d="M5 10.5L8 13.5L15 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
sort:'<path d="M6.5 4V16M9.5 13L6.5 16L3.5 13M13.5 16V4M16.5 7L13.5 4L10.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
cart:'<path d="M3 4H5L6.6 12.2C6.64872 12.5622 6.82802 12.8942 7.10422 13.1336C7.38042 13.373 7.73452 13.5033 8.1 13.5H14.4C14.7509 13.5071 15.0932 13.3909 15.3673 13.1716C15.6414 12.9523 15.8299 12.6439 15.9 12.3L17 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8.25" cy="16.75" r=".75" stroke="currentColor" stroke-width="1.5"/><circle cx="14.25" cy="16.75" r=".75" stroke="currentColor" stroke-width="1.5"/>',
user:'<path d="M10 10.2C11.7673 10.2 13.2 8.76731 13.2 7C13.2 5.23269 11.7673 3.8 10 3.8C8.23268 3.8 6.8 5.23269 6.8 7C6.8 8.76731 8.23268 10.2 10 10.2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 17C5 14 7.3 12.5 10 12.5C12.7 12.5 15 14 16 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
heart:'<path d="M10 16C10 16 4 12.4 4 8C3.99944 7.29843 4.22248 6.61495 4.63674 6.04875C5.051 5.48256 5.63493 5.06312 6.30376 4.85133C6.97259 4.63953 7.69151 4.6464 8.35617 4.87094C9.02083 5.09547 9.59663 5.52599 10 6.1C10.4034 5.52599 10.9792 5.09547 11.6438 4.87094C12.3085 4.6464 13.0274 4.63953 13.6962 4.85133C14.3651 5.06312 14.949 5.48256 15.3633 6.04875C15.7775 6.61495 16.0006 7.29843 16 8C16 12.4 10 16 10 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
globe:'<path d="M10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 13.5899 6.41015 16.5 10 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 10H16.5M10 3.5C12 5.7 12 14.3 10 16.5C8 14.3 8 5.7 10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
bolt:'<path d="M11 3L5 11H9.5L9 17L15 9H10.5L11 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
flame:'<path d="M10 17C13 17 15 15 15 12C15 8.5 12 7 12 4C10 5 8.5 7 8.5 9C7.5 8.5 7 7.5 7 6.5C5.5 8 5 9.8 5 12C5 15 7 17 10 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
percent:'<path d="M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6.5" cy="6.5" r="1.8" stroke="currentColor" stroke-width="1.5"/><circle cx="13.5" cy="13.5" r="1.8" stroke="currentColor" stroke-width="1.5"/>',
'price-asc':'<path d="M5 4V16M7.5 13.5L5 16L2.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6H12.5M10 10H14.5M10 14H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
'price-desc':'<path d="M5 4V16M7.5 13.5L5 16L2.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6H16.5M10 10H14.5M10 14H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
sparkle:'<path d="M10 3L11.6 7.4L16 9L11.6 10.6L10 15L8.4 10.6L4 9L8.4 7.4L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 14V17M14 15.5H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
'sort-az':'<path d="M3.5 9L6 3L8.5 9M4.5 7H7.5M3.5 11.5H8.5L3.5 16.5H8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 4V16M16.5 13.5L14 16L11.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'};
const ic=(n,s='')=>{const m=s.match(/class="([^"]*)"/);const cls=m?m[1]:'';s=s.replace(/class="[^"]*"/,'');return `<svg class="i ${cls}" viewBox="0 0 20 20" fill="none" ${s}>${ICONS[n]}</svg>`};
const img=(n,cls='')=>`<img src="ic/${n}.png" alt="" class="${cls}" width="${cls==='flag'?24:20}" height="${cls==='flag'?16:20}">`;
const fmt=n=>n.toLocaleString('en-US').replace(/,/g,' ');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function hydrate(root=document){root.querySelectorAll('svg[data-i]').forEach(s=>{s.innerHTML=ICONS[s.dataset.i];s.removeAttribute('data-i');if(!s.classList.contains('i'))s.setAttribute('width',16),s.setAttribute('height',16)})}


/* ---------- Data (from Figma / difmark) ---------- */
const GAMES=[
 ['Shape of Dreams',8.01,'steam',0,''],['DOOM Eternal',0.50,'microsoft',1,'bethesda'],['Peak',3.07,'steam',0,''],['Ravenswatch',3.23,'steam',1,'nacon'],
 ['Wolfenstein: The Old Blood',0.50,'microsoft',1,'bethesda'],['Fallout 76',0.50,'microsoft',1,'bethesda'],['Mouthwashing',3.25,'steam',0,''],['Death Stranding Director’s Cut',6.43,'steam',1,'505'],
 ['Dune: Awakening',20.58,'steam',0,'funcom'],['DOOM',0.31,'gog',1,'bethesda'],['Wardogs',17.89,'steam',0,''],['Risk of Rain Returns',1.09,'steam',0,''],
 ['DOOM + DOOM II',0.08,'gog',0,'bethesda'],['Destroy All Humans!',1.93,'steam',0,'thq'],['Cronos: The New Dawn',16.84,'steam',1,'bloober'],['SNK 40th Anniversary Collection',1.45,'steam',0,'']
].map((g,i)=>({id:i,title:g[0],price:g[1],act:g[2],xbox:!!g[3],pub:g[4],cover:`covers/${String(i+1).padStart(2,'0')}.webp`}));
/* Discounts shown for demo (difmark currently has none) — same as Figma */
GAMES[7].old=39.99;GAMES[7].pct=84;GAMES[8].old=49.99;GAMES[8].pct=59;

/* ---------- Store: cart + wishlist persist between pages (prototype only) ---------- */
const S={wish:new Set,cart:new Set};
try{const d=JSON.parse(localStorage.getItem('kv-store')||'{}');S.wish=new Set(d.wish||[]);S.cart=new Set(d.cart||[])}catch(e){}
function saveStore(){try{localStorage.setItem('kv-store',JSON.stringify({wish:[...S.wish],cart:[...S.cart]}))}catch(e){}}
function syncCounts(){$$('.cartCt').forEach(e=>{e.textContent=S.cart.size;e.hidden=!S.cart.size});$$('.wishCt').forEach(e=>{e.textContent=S.wish.size;e.hidden=!S.wish.size})}

/* ---------- Shell markup ---------- */
document.body.insertAdjacentHTML('afterbegin',`<header class="hdr">
  <div class="top"><div class="wrap">
    <button class="ib m-only" id="menuBtn" aria-label="Menu"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="menu"></svg></button>
    <a href="index.html" class="logo" aria-label="KeyVault home"><b><svg width="14" height="16" viewBox="0 0 70 80" aria-hidden="true"><path d="M0 0H20V80H0Z M50 0H70V20H50Z M30 20H50V60H30Z M50 60H70V80H50Z" fill="#fff"/></svg></b>keyvault</a>
    <label class="field l site d-only"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="search"></svg><input type="search" autocomplete="off" placeholder="Search games, gift cards, software…" aria-label="Search the store"></label>
    <div class="hr d-only">
      <button class="region" aria-label="Region and currency: Portugal, EUR"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="globe"></svg>Portugal · EUR</button>
      <div class="actions">
        <button class="ib" aria-label="Wishlist"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="heart"></svg><span class="counter wishCt" hidden>0</span></button>
        <button class="ib" aria-label="Cart"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="cart"></svg><span class="counter cartCt" hidden>0</span></button>
        <button class="ib" aria-label="Account"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="user"></svg></button>
      </div>
    </div>
    <button class="ib m-only" id="mSearchBtn" aria-label="Search" aria-expanded="false"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="search"></svg></button>
    <button class="ib m-only" aria-label="Wishlist"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="heart"></svg><span class="counter wishCt" hidden>0</span></button>
    <button class="ib m-only" aria-label="Cart"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="cart"></svg><span class="counter cartCt" hidden>0</span></button>
  </div></div>
  <div class="msearch" id="msearch" role="dialog" aria-modal="true" aria-label="Search">
    <div class="ms-top"><label class="field"><svg class="i" viewBox="0 0 20 20" fill="none" data-i="search"></svg><input id="msq" type="search" placeholder="Search games, gift cards…" aria-label="Search the store" autocomplete="off"></label><button class="btn btn-ghost" id="msCancel">Cancel</button></div>
    <div class="ms-body" id="msBody"></div>
  </div>
  <div class="mega" id="mega"></div>
</header>
<nav class="nav d-only" aria-label="Catalog"><div class="wrap">
    <ul id="navList"></ul>
    <div class="links"><a href="#">Help center</a><a href="#">How to activate</a></div>
  </div></nav>`);
/* Footer (Figma: Footer Device=Desktop | Mobile) */
const FCOLS=[['Shop',[['Game keys','catalog.html'],['Gift cards','#'],['Software','#'],['Subscriptions','#'],['Deals of the week','#deals']]],['Help',[['Help center','#'],['How to activate','#'],['How to buy','#'],['FAQ','index.html#faq'],['Contact us','#']]],['Company',[['About KeyVault','#'],['Affiliate program','#'],['Reviews','index.html#reviews'],['Careers','#']]],['Legal',[['Terms of use','#'],['Privacy policy','#'],['Refund policy','#'],['Cookie policy','#']]]];
const PAYNAMES={visa:'Visa',mastercard:'Mastercard',paypal:'PayPal',applepay:'Apple Pay',googlepay:'Google Pay',klarna:'Klarna',skrill:'Skrill',sepa:'SEPA bank transfer'};
const SOCNAMES={discord:'Discord',x:'X',youtube:'YouTube',instagram:'Instagram',telegram:'Telegram',twitch:'Twitch'};
const LOGO_MARK='<b><svg width="14" height="16" viewBox="0 0 70 80" aria-hidden="true"><path d="M0 0H20V80H0Z M50 0H70V20H50Z M30 20H50V60H30Z M50 60H70V80H50Z" fill="#fff"/></svg></b>keyvault';
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap">
  <div class="f-top">
    <div class="f-brand"><a href="index.html" class="logo" aria-label="KeyVault home">${LOGO_MARK}</a>
      <p>Game keys for Steam, EA app, Epic Games, GOG, Ubisoft Connect and Battle.net. Checked before sale, delivered instantly.</p>
      <div class="f-sel"><button class="btn btn-sec" aria-label="Region and currency: Portugal, EUR">Portugal · EUR</button><button class="btn btn-sec" aria-label="Language: English">English</button></div></div>
    ${FCOLS.map(([t,l])=>`<nav class="f-col" aria-label="${t}"><p class="t-caps cap">${t.toUpperCase()}</p><ul>${l.map(([x,h])=>`<li><a href="${h}">${x}</a></li>`).join('')}</ul></nav>`).join('')}
  </div>
  <hr>
  <div class="f-pay"><p class="t-caps cap">WE ACCEPT</p><ul>${Object.entries(PAY).map(([k,[vb,svg]])=>`<li class="paym" title="${PAYNAMES[k]}"><svg viewBox="${vb}" fill="none" role="img" aria-label="${PAYNAMES[k]}">${svg}</svg></li>`).join('')}</ul></div>
  <hr>
  <div class="f-bot">
    <div class="f-legal"><p>© 2026 KeyVault. A design concept: products, prices and reviews are sample data.</p><p>Game titles, artwork and platform logos are trademarks of their respective owners.</p></div>
    <ul class="f-soc">${Object.entries(SOCIAL).map(([k,svg])=>`<li><a href="#" aria-label="KeyVault on ${SOCNAMES[k]}"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${svg}</svg></a></li>`).join('')}</ul>
  </div>
</div></footer>`);
document.body.insertAdjacentHTML('beforeend',`<div class="scrim" id="scrim"></div>
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu"></div>`);
const mainEl=document.querySelector('main'); if(mainEl) mainEl.after(document.querySelector('footer'));

/* ---------- Game card: View=Grid | List | Compact (mobile) ---------- */
const ACT_ICON={steam:'steam',gog:'gog',microsoft:'microsoft'};
/* Game card: View=Grid | List | Compact (mobile) */
function cardHTML(g){const w=S.wish.has(g.id), c=S.cart.has(g.id);
  const wish=cls=>`<button class="ib ${cls} ${w?'on':''}" data-wish="${g.id}" aria-pressed="${w}" aria-label="Add ${g.title} to wishlist">${ic('heart')}</button>`;
  return `<article class="card"><div class="cv"><img src="${g.cover}" alt="${g.title} cover" loading="lazy">${g.pct?`<span class="dbadge">−${g.pct}%</span>`:''}${wish('s ov')}</div>
  <div class="cb"><div class="info"><h3><a class="cl" href="#">${g.title}</a></h3><div class="plat" aria-label="Activation and devices">${img(ACT_ICON[g.act])}<span class="sep"></span>${img('dev-pc')}${g.xbox?img('dev-xbox'):''}<span class="sep"></span><span class="reg">${img('global','flag')}<span>Global</span></span></div><span class="sub">Digital key · Instant delivery</span></div>
  <div class="prow"><span class="price">${g.pct?`<span class="oldrow"><s>€${g.old.toFixed(2)}</s><b>−${g.pct}%</b></span>`:''}<span class="cur t-pl">€${g.price.toFixed(2)}</span></span><button class="ib ${c?'added':''}" data-cart="${g.id}" aria-label="Add ${g.title} to cart">${ic(c?'check':'cart')}</button><span class="lact">${wish('')}<button class="btn btn-pri" data-cart="${g.id}">${c?'In cart':'Buy now'}</button></span></div></div></article>`}

/* ---------- Header: Nav/Item + Nav/Dropdown — Game keys ---------- */
const NAV=[['Game keys',1],['Gift cards',2],['Software',2],['Subscriptions',2],['Top-up',2],['Deals',0]];
$('#navList').innerHTML=NAV.map(([l,k],i)=>`<li><button class="nav-i ${i===0&&KV.page==='catalog'?'on':''}" data-nav="${i}" ${k===1?'aria-haspopup="true" aria-expanded="false"':''}>${l}${k?ic('chevron-down'):''}</button></li>`).join('');
const col=(t,items)=>`<div class="col"><p class="t-caps cap">${t}</p>${items}</div>`;
$('#mega').innerHTML=col('BY ACTIVATION PLATFORM',[['steam','Steam',26697],['ea','EA app',227],['ubisoft','Ubisoft Connect',189],['gog','GOG',363],['epic','Epic Games',91],['battlenet','Battle.net',28]].map(([i,l,c])=>`<a class="ml" href="catalog.html">${img(i)}${l}<span class="ct t-cm">${fmt(c)}</span></a>`).join(''))
 +col('BY DEVICE',[['dev-pc','PC'],['dev-ps','PlayStation'],['dev-xbox','Xbox'],['dev-switch','Nintendo Switch']].map(([i,l])=>`<a class="ml" href="catalog.html">${img(i)}${l}</a>`).join(''))
 +col('COLLECTIONS',[['flame','Bestsellers'],['sparkle','New releases'],['percent','Random keys'],['bolt','Pre-orders'],['globe','Global keys']].map(([i,l])=>`<a class="ml" href="catalog.html">${ic(i)}${l}</a>`).join(''))
 +`<a class="promo" href="catalog.html" style="background-image:url(covers/04.webp)"><div><small>Upcoming · 2 576 games</small><strong>Pre-order now</strong></div></a>`;
function closePops(){$$('#mega,#sortPop').forEach(e=>e.classList.remove('open'));$$('[aria-expanded=true][data-nav],#sortBtn').forEach(b=>b.setAttribute('aria-expanded','false'))}
function toggleNav(i,btn){
  if(NAV[i][1]!==1) return;
  const wasOpen=btn.getAttribute('aria-expanded')==='true'; closePops(); if(wasOpen) return;
  btn.setAttribute('aria-expanded','true');
  const m=$('#mega'),r=btn.getBoundingClientRect(),h=$('.hdr').getBoundingClientRect();m.classList.add('open');
  m.style.left=Math.max(16,Math.min(r.left-h.left,innerWidth-m.offsetWidth-16))+'px';m.style.top=(r.bottom-h.top+12)+'px'}
$('#drawer').innerHTML=`<div class="dh"><span class="logo"><b><svg width="14" height="16" viewBox="0 0 70 80" aria-hidden="true"><path d="M0 0H20V80H0Z M50 0H70V20H50Z M30 20H50V60H30Z M50 60H70V80H50Z" fill="#fff"/></svg></b>keyvault</span><button class="ib s" data-close aria-label="Close menu">${ic('close')}</button></div><div class="db">`+NAV.map(([l])=>`<a class="ml" href="catalog.html">${l}</a>`).join('')+`<div class="dv"></div><a class="ml" href="catalog.html">${ic('user')}Account</a><a class="ml" href="catalog.html">${ic('globe')}Portugal · EUR</a><div class="dv"></div><a class="ml" href="catalog.html">Help center</a><a class="ml" href="catalog.html">How to activate</a></div>`;

/* ---------- Sheets + drawer ---------- */
let lastFocus=null;
function openSheet(id){lastFocus=document.activeElement;closePops();$('#scrim').classList.add('open');$(id).classList.add('open');document.body.style.overflow='hidden';setTimeout(()=>{const b=$(id).querySelector('[data-close]');b&&b.focus()},50)}
function closeSheets(){$$('.sheet,.drawer').forEach(s=>s.classList.remove('open'));$('#scrim').classList.remove('open');document.body.style.overflow='';lastFocus&&lastFocus.focus&&lastFocus.focus()}

/* ---------- Mobile search (Header/Mobile State=Search open + Search/Suggestion) ---------- */
const RECENT=['Cyberpunk 2077','Elden Ring','Steam gift card'];
const POPULAR=[0,5,8,14];
const esc=q=>q.replace(/[<>"&]/g,'');
function hl(t,q){if(!q)return t;const i=t.toLowerCase().indexOf(q.toLowerCase());return i<0?t:t.slice(0,i)+'<mark>'+t.slice(i,i+q.length)+'</mark>'+t.slice(i+q.length)}
function sugHTML(g,q){return `<button class="sug" data-pick="${g.id}"><img class="th" src="${g.cover}" alt=""><span class="nm"><span>${hl(g.title,q)}</span><span class="meta2">${img(ACT_ICON[g.act])}${img('dev-pc')}${g.xbox?img('dev-xbox'):''}</span></span><span class="t-sm">€${g.price.toFixed(2)}</span></button>`}
function renderMS(){const q=$('#msq').value.trim();let h='';
  if(!q){h=`<div class="ms-sec"><p class="t-caps cap">Recent searches</p><div class="chips">${RECENT.map(r=>`<button class="chip" data-recent="${r}">${r}</button>`).join('')}</div></div><div class="ms-sec"><p class="t-caps cap">Popular now</p><div>${POPULAR.map(i=>sugHTML(GAMES[i],'')).join('')}</div></div>`}
  else{const m=GAMES.filter(g=>g.title.toLowerCase().includes(q.toLowerCase()));
    h=m.length?`<div class="ms-sec"><p class="t-caps cap">Games</p><div>${m.slice(0,6).map(g=>sugHTML(g,esc(q))).join('')}</div></div><button class="btn btn-sec m ms-all" data-msall>See all results for “${esc(q)}”</button>`
      :`<div class="ms-empty"><b>Nothing found for “${esc(q)}”</b>Check the spelling or try a shorter query.</div>`}
  $('#msBody').innerHTML=h}
function openMS(){closePops();$('#msearch').classList.add('open');$('#mSearchBtn').setAttribute('aria-expanded','true');document.body.style.overflow='hidden';renderMS();setTimeout(()=>$('#msq').focus(),30)}
function closeMS(){$('#msearch').classList.remove('open');$('#mSearchBtn').setAttribute('aria-expanded','false');document.body.style.overflow='';$('#mSearchBtn').focus()}
function applyMS(q){if(KV.onSearch){KV.onSearch(q);closeMS()}else location.href='catalog.html?q='+encodeURIComponent(q)}
$('#mSearchBtn').addEventListener('click',e=>{e.stopPropagation();openMS()});
$('#msCancel').addEventListener('click',e=>{e.stopPropagation();closeMS()});
$('#msq').addEventListener('input',renderMS);
$('#msq').addEventListener('keydown',e=>{if(e.key==='Enter')applyMS($('#msq').value.trim());if(e.key==='Escape'){e.stopPropagation();closeMS()}});
$('#msBody').addEventListener('click',e=>{e.stopPropagation();const t=e.target.closest('button');if(!t)return;
  if(t.dataset.recent){$('#msq').value=t.dataset.recent;renderMS();$('#msq').focus()}
  else if(t.dataset.pick!==undefined)applyMS(GAMES[+t.dataset.pick].title)
  else if(t.dataset.msall!==undefined)applyMS($('#msq').value.trim())});


/* ---------- Category bar: hides on scroll down, returns on scroll up ---------- */
let navY=scrollY;function navBar(){const n=$('.nav'),y=scrollY,d=y-navY;if(Math.abs(d)<8)return;const hide=d>0&&y>120&&!$('#mega.open');n.classList.toggle('hide',hide);navY=y}
addEventListener('scroll',navBar,{passive:true});

/* ---------- Shared events ---------- */
function rerender(){syncCounts();KV.render&&KV.render()}
document.addEventListener('click',e=>{
  const t=e.target.closest('button,a,[data-close]'); if(!t){ if(!e.target.closest('.pop,.mega'))closePops(); return }
  const d=t.dataset;
  if(t.tagName==='A'&&t.getAttribute('href')==='#') e.preventDefault();
  if(d.nav!==undefined) return toggleNav(+d.nav,t);
  if(d.wish){const id=+d.wish;S.wish.has(id)?S.wish.delete(id):S.wish.add(id);saveStore();return rerender()}
  if(d.cart){const id=+d.cart;S.cart.has(id)?S.cart.delete(id):S.cart.add(id);saveStore();return rerender()}
  if(t.id==='menuBtn')return openSheet('#drawer');
  if(d.close!==undefined)return closeSheets();
  if(!t.closest('.pop,.mega')&&d.pop===undefined)closePops();
});
$('#scrim').addEventListener('click',closeSheets);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePops();closeSheets()}});
let kvMob=innerWidth<1024;addEventListener('resize',()=>{const m=innerWidth<1024;if(m!==kvMob){kvMob=m;closePops();closeSheets();if(!m&&$('#msearch').classList.contains('open'))closeMS();KV.render&&KV.render()}});
/* Desktop header search: Enter searches the catalog */
const siteSearch=$('.site input');siteSearch.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const q=siteSearch.value.trim();if(KV.onSearch)KV.onSearch(q);else location.href='catalog.html'+(q?'?q='+encodeURIComponent(q):'')});
hydrate();syncCounts();
