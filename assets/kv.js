/* KeyVault UI stack — shared runtime: shell (Header/Desktop, Nav bar, Header/Mobile, Mobile menu, Footer), icons, data, Game card, cart & wishlist store.
   Every page loads tokens.css + kv.css + this file, then its own script. */
const KV=window.KV||{}; KV.page=document.body.dataset.page||'';
const ICONS={'language':'<path d="M18.09 15L10.91 15L13.78 9.01C14.01 8.53 14.12 8.28 14.28 8.21C14.42 8.14 14.58 8.14 14.72 8.21C14.88 8.28 14.99 8.53 15.22 9.01L18.09 15ZM18.09 15L20 19M10.91 15L9 19M0 3L6 3M6 3L9.5 3M6 3L6 1M9.5 3L12 3M9.5 3C9 5.96 7.85 8.64 6.17 10.88M6.17 10.88C6.76 11.34 7.39 11.72 8 12M6.17 10.88C4.81 9.85 3.6 8.43 3 7M6.17 10.88C4.56 13.02 2.47 14.77 0 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','shield':'<path d="M9.3 19.61C9.52 19.74 9.63 19.81 9.79 19.84C9.91 19.87 10.09 19.87 10.21 19.84C10.37 19.81 10.48 19.74 10.7 19.61C12.65 18.48 18 14.91 18 10L18 5.22C18 4.42 18 4.02 17.87 3.67C17.75 3.37 17.57 3.1 17.32 2.89C17.05 2.64 16.67 2.5 15.92 2.22L10.56 0.21C10.35 0.13 10.25 0.09 10.14 0.08C10.05 0.06 9.95 0.06 9.86 0.08C9.75 0.09 9.65 0.13 9.44 0.21L4.08 2.22C3.33 2.5 2.95 2.64 2.68 2.89C2.43 3.1 2.25 3.37 2.13 3.67C2 4.02 2 4.42 2 5.22L2 10C2 14.91 7.35 18.48 9.3 19.61ZM7 9.5L9 11.5L13.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','card':'<path d="M16.8 17C17.92 17 18.48 17 18.91 16.78C19.28 16.59 19.59 16.28 19.78 15.91C20 15.48 20 14.92 20 13.8L20 6.2C20 5.08 20 4.52 19.78 4.09C19.59 3.72 19.28 3.41 18.91 3.22C18.48 3 17.92 3 16.8 3L3.2 3C2.08 3 1.52 3 1.09 3.22C0.72 3.41 0.41 3.72 0.22 4.09C0 4.52 0 5.08 0 6.2L0 13.8C0 14.92 0 15.48 0.22 15.91C0.41 16.28 0.72 16.59 1.09 16.78C1.52 17 2.08 17 3.2 17L16.8 17ZM20 8L0 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','support':'<path d="M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20ZM10 14C12.21 14 14 12.21 14 10C14 7.79 12.21 6 10 6C7.79 6 6 7.79 6 10C6 12.21 7.79 14 10 14ZM7.14 7.14L2.93 2.93M2.93 17.07L7.17 12.83M12.86 12.86L17.07 17.07M17.07 2.93L12.83 7.17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','star':'<path d="M9.28 1.45C9.51 0.99 9.63 0.75 9.78 0.68C9.92 0.61 10.08 0.61 10.22 0.68C10.37 0.75 10.49 0.99 10.72 1.45L12.9 5.88C12.97 6.02 13.01 6.09 13.06 6.14C13.1 6.19 13.15 6.23 13.21 6.26C13.28 6.29 13.35 6.3 13.51 6.32L18.4 7.04C18.91 7.11 19.17 7.15 19.29 7.27C19.39 7.38 19.44 7.53 19.42 7.68C19.4 7.86 19.21 8.04 18.84 8.4L15.3 11.85C15.19 11.95 15.14 12.01 15.1 12.07C15.07 12.13 15.05 12.19 15.04 12.25C15.03 12.33 15.05 12.4 15.07 12.55L15.91 17.42C15.99 17.94 16.04 18.19 15.96 18.34C15.88 18.48 15.76 18.57 15.61 18.6C15.44 18.63 15.21 18.51 14.75 18.27L10.37 15.97C10.24 15.89 10.17 15.86 10.1 15.84C10.03 15.83 9.97 15.83 9.9 15.84C9.83 15.86 9.76 15.89 9.63 15.97L5.25 18.27C4.79 18.51 4.56 18.63 4.39 18.6C4.24 18.57 4.12 18.48 4.04 18.34C3.96 18.19 4.01 17.94 4.09 17.42L4.93 12.55C4.95 12.4 4.97 12.33 4.96 12.25C4.95 12.19 4.93 12.13 4.9 12.07C4.86 12.01 4.81 11.95 4.7 11.85L1.16 8.4C0.79 8.04 0.6 7.86 0.58 7.68C0.56 7.53 0.61 7.38 0.71 7.27C0.83 7.15 1.09 7.11 1.6 7.04L6.49 6.32C6.65 6.3 6.72 6.29 6.79 6.26C6.85 6.23 6.9 6.19 6.94 6.14C6.99 6.09 7.03 6.02 7.1 5.88L9.28 1.45Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>','clock':'<path d="M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20ZM10 4L10 10L14 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','search':'<path d="M9 17C13.42 17 17 13.42 17 9C17 4.58 13.42 1 9 1C4.58 1 1 4.58 1 9C1 13.42 4.58 17 9 17ZM19 19L14.65 14.65" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','chevron-down':'<path d="M4 7L10 13L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','chevron-left':'<path d="M13 16L7 10L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','chevron-right':'<path d="M7 16L13 10L7 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','close':'<path d="M16 4L4 16M4 4L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','filter':'<path d="M4 10L16 10M1 4L19 4M7 16L13 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','grid':'<path d="M6.4 1L2.6 1C2.04 1 1.76 1 1.55 1.11C1.36 1.2 1.2 1.36 1.11 1.55C1 1.76 1 2.04 1 2.6L1 6.4C1 6.96 1 7.24 1.11 7.45C1.2 7.64 1.36 7.8 1.55 7.89C1.76 8 2.04 8 2.6 8L6.4 8C6.96 8 7.24 8 7.45 7.89C7.64 7.8 7.8 7.64 7.89 7.45C8 7.24 8 6.96 8 6.4L8 2.6C8 2.04 8 1.76 7.89 1.55C7.8 1.36 7.64 1.2 7.45 1.11C7.24 1 6.96 1 6.4 1ZM17.4 1L13.6 1C13.04 1 12.76 1 12.55 1.11C12.36 1.2 12.2 1.36 12.11 1.55C12 1.76 12 2.04 12 2.6L12 6.4C12 6.96 12 7.24 12.11 7.45C12.2 7.64 12.36 7.8 12.55 7.89C12.76 8 13.04 8 13.6 8L17.4 8C17.96 8 18.24 8 18.45 7.89C18.64 7.8 18.8 7.64 18.89 7.45C19 7.24 19 6.96 19 6.4L19 2.6C19 2.04 19 1.76 18.89 1.55C18.8 1.36 18.64 1.2 18.45 1.11C18.24 1 17.96 1 17.4 1ZM17.4 12L13.6 12C13.04 12 12.76 12 12.55 12.11C12.36 12.2 12.2 12.36 12.11 12.55C12 12.76 12 13.04 12 13.6L12 17.4C12 17.96 12 18.24 12.11 18.45C12.2 18.64 12.36 18.8 12.55 18.89C12.76 19 13.04 19 13.6 19L17.4 19C17.96 19 18.24 19 18.45 18.89C18.64 18.8 18.8 18.64 18.89 18.45C19 18.24 19 17.96 19 17.4L19 13.6C19 13.04 19 12.76 18.89 12.55C18.8 12.36 18.64 12.2 18.45 12.11C18.24 12 17.96 12 17.4 12ZM6.4 12L2.6 12C2.04 12 1.76 12 1.55 12.11C1.36 12.2 1.2 12.36 1.11 12.55C1 12.76 1 13.04 1 13.6L1 17.4C1 17.96 1 18.24 1.11 18.45C1.2 18.64 1.36 18.8 1.55 18.89C1.76 19 2.04 19 2.6 19L6.4 19C6.96 19 7.24 19 7.45 18.89C7.64 18.8 7.8 18.64 7.89 18.45C8 18.24 8 17.96 8 17.4L8 13.6C8 13.04 8 12.76 7.89 12.55C7.8 12.36 7.64 12.2 7.45 12.11C7.24 12 6.96 12 6.4 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','list':'<path d="M2 11C2.55 11 3 10.55 3 10C3 9.45 2.55 9 2 9C1.45 9 1 9.45 1 10C1 10.55 1.45 11 2 11ZM2 5C2.55 5 3 4.55 3 4C3 3.45 2.55 3 2 3C1.45 3 1 3.45 1 4C1 4.55 1.45 5 2 5ZM2 17C2.55 17 3 16.55 3 16C3 15.45 2.55 15 2 15C1.45 15 1 15.45 1 16C1 16.55 1.45 17 2 17ZM19 10L7 10M19 4L7 4M19 16L7 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','menu':'<path d="M1 10L13 10M1 4L19 4M1 16L19 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','check':'<path d="M18 4L7 15L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','sort':'<path d="M11 14L15 18L19 14M1 6L5 2L9 6M15 18L15 2M5 2L5 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','cart':'<path d="M15.35 14.5L6.79 14.5C5.8 14.5 5.31 14.5 4.91 14.32C4.56 14.16 4.26 13.9 4.06 13.57C3.82 13.2 3.76 12.71 3.62 11.73L2.57 4L19.03 4C19.36 4 19.53 4 19.65 4.07C19.75 4.13 19.83 4.22 19.87 4.33C19.91 4.46 19.88 4.62 19.82 4.95L18.5 11.9C18.32 12.82 18.23 13.29 17.99 13.63C17.78 13.94 17.49 14.18 17.15 14.33C16.77 14.5 16.29 14.5 15.35 14.5ZM7 20C7.55 20 8 19.55 8 19C8 18.45 7.55 18 7 18C6.45 18 6 18.45 6 19C6 19.55 6.45 20 7 20ZM15 20C15.55 20 16 19.55 16 19C16 18.45 15.55 18 15 18C14.45 18 14 18.45 14 19C14 19.55 14.45 20 15 20ZM2.57 4L2.1 0.69C2.06 0.44 2.05 0.32 1.99 0.23C1.94 0.15 1.86 0.09 1.77 0.05C1.68 0 1.55 0 1.31 0L0 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','user':'<path d="M10 10C12.49 10 14.5 7.99 14.5 5.5C14.5 3.01 12.49 1 10 1C7.51 1 5.5 3.01 5.5 5.5C5.5 7.99 7.51 10 10 10ZM18 19C18 17.6 18 16.91 17.83 16.34C17.44 15.06 16.44 14.06 15.16 13.67C14.59 13.5 13.9 13.5 12.5 13.5L7.5 13.5C6.1 13.5 5.41 13.5 4.84 13.67C3.56 14.06 2.56 15.06 2.17 16.34C2 16.91 2 17.6 2 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','heart':'<path d="M9.99 3.14C7.99 0.8 4.66 0.17 2.15 2.31C-0.35 4.45 -0.7 8.03 1.26 10.56C2.9 12.67 7.85 17.1 9.47 18.54C9.65 18.7 9.74 18.78 9.85 18.81C9.94 18.84 10.04 18.84 10.14 18.81C10.24 18.78 10.33 18.7 10.51 18.54C12.14 17.1 17.09 12.67 18.72 10.56C20.69 8.03 20.38 4.43 17.83 2.31C15.28 0.19 11.99 0.8 9.99 3.14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','globe':'<path d="M10 0C12.5 2.74 13.92 6.29 14 10C13.92 13.71 12.5 17.26 10 20C7.5 17.26 6.08 13.71 6 10C6.08 6.29 7.5 2.74 10 0ZM10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20ZM20 10L0 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','bolt':'<path d="M11 0L2.09 10.69C1.74 11.11 1.57 11.32 1.57 11.49C1.57 11.65 1.63 11.79 1.75 11.89C1.89 12 2.16 12 2.71 12L10 12L9 20L17.91 9.31C18.26 8.89 18.43 8.68 18.43 8.51C18.43 8.35 18.37 8.21 18.25 8.11C18.11 8 17.84 8 17.29 8L10 8L11 0Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','flame':'<path d="M20 5L12.13 12.87C11.74 13.26 11.54 13.46 11.31 13.54C11.11 13.6 10.89 13.6 10.69 13.54C10.46 13.46 10.26 13.26 9.87 12.87L7.13 10.13C6.74 9.74 6.54 9.54 6.31 9.46C6.11 9.4 5.89 9.4 5.69 9.46C5.46 9.54 5.26 9.74 4.87 10.13L0 15M13 5L20 5L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','percent':'<path d="M5 7C6.1 7 7 6.1 7 5C7 3.9 6.1 3 5 3C3.9 3 3 3.9 3 5C3 6.1 3.9 7 5 7ZM15 17C16.1 17 17 16.1 17 15C17 13.9 16.1 13 15 13C13.9 13 13 13.9 13 15C13 16.1 13.9 17 15 17ZM17 3L3 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','price-asc':'<path d="M4 8L10 2L16 8M10 2L10 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','price-desc':'<path d="M16 12L10 18L4 12M10 18L10 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','sparkle':'<path d="M11 1L12.73 5.51C13.02 6.24 13.16 6.61 13.38 6.92C13.57 7.19 13.81 7.43 14.08 7.62C14.39 7.84 14.76 7.98 15.49 8.27L20 10L15.49 11.73C14.76 12.02 14.39 12.16 14.08 12.38C13.81 12.57 13.57 12.81 13.38 13.08C13.16 13.39 13.02 13.76 12.73 14.49L11 19L9.27 14.49C8.98 13.76 8.84 13.39 8.62 13.08C8.43 12.81 8.19 12.57 7.92 12.38C7.61 12.16 7.24 12.02 6.51 11.73L2 10L6.51 8.27C7.24 7.98 7.61 7.84 7.92 7.62C8.19 7.43 8.43 7.19 8.62 6.92C8.84 6.61 8.98 6.24 9.27 5.51L11 1ZM2.5 20L2.5 15M2.5 5L2.5 0M0 2.5L5 2.5M0 17.5L5 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>','sort-az':'<path d="M1 14L5 18L9 14M11 6L15 2L19 6M5 18L5 2M15 2L15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'};
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
      <div class="f-sel"><button class="sel" aria-label="Region and currency: Portugal, EUR">${ic('globe')}<span>Portugal · EUR</span>${ic('chevron-down','class="chev"')}</button>
        <div class="lang-wrap"><button class="sel" id="langSel" data-pop aria-haspopup="listbox" aria-expanded="false">${ic('language')}<span class="langLbl">English</span>${ic('chevron-down','class="chev"')}</button><div class="pop lang-pop" id="langPop" role="listbox" aria-label="Language"></div></div></div></div>
    ${FCOLS.map(([t,l])=>`<nav class="f-col" aria-label="${t}"><p class="t-caps cap">${t.toUpperCase()}</p><ul>${l.map(([x,h])=>`<li><a href="${h}">${x}</a></li>`).join('')}</ul></nav>`).join('')}
  </div>
  <hr>
  <div class="f-pay"><p class="t-caps cap">WE ACCEPT</p><ul>${Object.entries(PAY).map(([k,[vb,svg,w,h]])=>`<li class="paym" title="${PAYNAMES[k]}"><svg viewBox="${vb}" width="${w}" height="${h}" fill="none" role="img" aria-label="${PAYNAMES[k]}">${svg}</svg></li>`).join('')}</ul></div>
  <hr>
  <div class="f-bot">
    <div class="f-legal"><p>© 2026 KeyVault. A design concept: products, prices and reviews are sample data.</p><p>Game titles, artwork and platform logos are trademarks of their respective owners.</p></div>
    <ul class="f-soc">${Object.entries(SOCIAL).map(([k,svg])=>`<li><a href="#" aria-label="KeyVault on ${SOCNAMES[k]}"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${svg}</svg></a></li>`).join('')}</ul>
  </div>
</div></footer>`);
document.body.insertAdjacentHTML('beforeend',`<div class="scrim" id="scrim"></div>
<div class="sheet" id="lSheet" role="dialog" aria-modal="true" aria-label="Language"><div class="grab"></div><div class="sheet-h"><h2 class="t-h3">Language</h2><button class="ib s" data-close aria-label="Close">${ic('close')}</button></div><div class="sopts" id="lMob" role="radiogroup" aria-label="Language"></div></div>
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
function closePops(){$$('#mega,#sortPop,#langPop').forEach(e=>e.classList.remove('open'));$$('[aria-expanded=true][data-nav],#sortBtn,#langSel').forEach(b=>b.setAttribute('aria-expanded','false'))}
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

/* ---------- Language: Select + Language menu (desktop) / Bottom sheet Type=Language (mobile). Prototype: label only ---------- */
const LANGS=['English','Deutsch','Español','Français','Italiano','Polski','Português','Türkçe'];
let LANG='English';try{LANG=localStorage.getItem('kv-lang')||'English'}catch(e){}
function renderLang(){$$('.langLbl').forEach(e=>e.textContent=LANG);$('#langSel').setAttribute('aria-label','Language: '+LANG);
  $('#langPop').innerHTML=LANGS.map(l=>`<button class="mi ${l===LANG?'on':''}" data-lang="${l}" role="option" aria-selected="${l===LANG}"><span class="c">${l}</span>${ic('check','class="chk"')}</button>`).join('');
  $('#lMob').innerHTML=LANGS.map(l=>`<button class="ropt ${l===LANG?'on':''}" data-lang="${l}" role="radio" aria-checked="${l===LANG}"><span class="rd"></span>${l}</button>`).join('')}
renderLang();

/* ---------- Shared events ---------- */
function rerender(){syncCounts();KV.render&&KV.render()}
document.addEventListener('click',e=>{
  const t=e.target.closest('button,a,[data-close]'); if(!t){ if(!e.target.closest('.pop,.mega'))closePops(); return }
  const d=t.dataset;
  if(t.tagName==='A'&&t.getAttribute('href')==='#') e.preventDefault();
  if(d.nav!==undefined) return toggleNav(+d.nav,t);
  if(t.id==='langSel'){if(innerWidth<1024)return openSheet('#lSheet');const o=$('#langPop').classList.contains('open');closePops();if(!o){$('#langPop').classList.add('open');t.setAttribute('aria-expanded','true')}return}
  if(d.lang){LANG=d.lang;try{localStorage.setItem('kv-lang',LANG)}catch(e){}renderLang();closePops();if($('#lSheet').classList.contains('open'))setTimeout(closeSheets,150);return}
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
