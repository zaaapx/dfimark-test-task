/* Catalog page: filters, sorting, grid/list views, pagination, mobile sheets. Loads after kv.js (shell, data, Game card, store). */
const TOTAL=26633;
const GROUPS={
 device:{t:'Device',opts:[['pc','PC',26594,'dev-pc'],['xbox','Xbox',30,'dev-xbox'],['switch','Nintendo Switch',9,'dev-switch']]},
 platform:{t:'Activation platform',search:'Search platform…',more:40,opts:[['steam','Steam',26524,'steam'],['gog','GOG',180,'gog'],['official','Official website',140,'official'],['ea','Electronic arts',72,'ea'],['epic','Epic Games',69,'epic'],['ubisoft','Ubisoft Connect',0,'ubisoft'],['battlenet','Battle.net',0,'battlenet'],['microsoft','Microsoft',0,'microsoft'],['rockstar','Rockstar',0,'rockstar'],['bethesda-l','Bethesda.net',0,'bethesda']]},
 region:{t:'Region',search:'Search country…',more:33,flag:1,az:1,opts:[['global','Global',19201,'global'],['ar','Argentina',8,'ar'],['br','Brazil',18,'br'],['de','Germany',7,'de'],['in','India',6,'in'],['it','Italy',2,'it'],['jp','Japan',463,'jp'],['kz','Kazakhstan',26,'kz'],['pl','Poland',27,'pl'],['tr','Turkey',43,'tr'],['ua','Ukraine',22,'ua'],['gb','United Kingdom',200,'gb'],['us','United States',96,'us']]},
 type:{t:'Product type',opts:[['game','Game',0,'t-game'],['dlc','DLC',0,'t-dlc'],['random','Random keys',0,'t-random']]},
 genre:{t:'Genre',opts:[['action','Action'],['adventure','Adventure'],['rpg','RPG'],['shooter','Shooter'],['strategy','Strategy'],['indie','Indie']]},
 publisher:{t:'Publisher',search:'Search publisher…',opts:[['bethesda','Bethesda Softworks'],['505','505 Games'],['funcom','Funcom'],['thq','THQ Nordic'],['nacon','Nacon'],['bloober','Bloober Team']]}
};
const SORTS=[['popular','Most popular','flame'],['discount','Best discount','percent'],['asc','Price: low to high','price-asc'],['desc','Price: high to low','price-desc'],['new','Newest releases','sparkle'],['az','Name A–Z','sort-az']];
const PMAX=300, PRESETS=[[0,5],[5,25],[25,100],[100,300]];
const DESK_ORDER=['price','device','platform','region','type','genre','publisher'];
const MOB_ORDER=['price','device','region','platform','type','genre','publisher'];
Object.assign(S,{sel:{device:new Set,platform:new Set,region:new Set(['global']),type:new Set,genre:new Set,publisher:new Set},price:[0,PMAX],disc:false,instant:false,q:'',sort:'popular',view:'grid',page:1,
  open:{desk:{price:1,device:1,platform:1,region:1},mob:{price:1,region:1,platform:1}},more:{},fq:{}});
/* ---------- Filters (Filter/Group, Filter/Option, Filter/Price range) ---------- */
function optHTML(g,o){const [v,l,c,i]=o, G=GROUPS[g], on=S.sel[g].has(v);
  return `<label class="opt ${on?'chk':''}"><input type="checkbox" data-g="${g}" value="${v}" ${on?'checked':''}><span class="box"><svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${i?`<span class="lead">${img(i,G.flag?'flag':'')}</span>`:''}<span class="lab">${l}</span>${c?`<span class="ct">${fmt(c)}</span>`:''}</label>`}
function groupBody(g,ctx){const G=GROUPS[g], q=(S.fq[ctx+g]||'').toLowerCase().trim();
  let opts=G.opts.filter(o=>!q||o[1].toLowerCase().includes(q));
  const showAll=S.more[g]||q; const limit=5;
  if(G.az) opts=[...opts.filter(o=>o[0]==='global'),...opts.filter(o=>o[0]!=='global').sort((x,y)=>x[1].localeCompare(y[1]))];
  const vis=showAll?opts:opts.slice(0,limit);
  let h='';
  if(G.search) h+=`<div class="sbox"><label class="field">${ic('search')}<input autocomplete="off" type="search" data-fq="${ctx+g}" placeholder="${G.search}" value="${S.fq[ctx+g]||''}" aria-label="${G.search.replace('…','')}"></label></div>`;
  h+=`<div class="opts">${vis.map(o=>optHTML(g,o)).join('')||'<div class="nores">Nothing found</div>'}</div>`;
  if(!q&&opts.length>limit) h+=`<button class="link" data-more="${g}" aria-expanded="${!!S.more[g]}">${S.more[g]?'Show less':'Show all '+(G.more||opts.length)}${ic('chevron-down')}</button>`;
  return h}
function priceBody(){const [a,b]=S.price;
  return `<div class="range"><div class="trk"></div><div class="fill" style="left:${a/PMAX*100}%;right:${(1-b/PMAX)*100}%"></div>
  <input type="range" min="0" max="${PMAX}" value="${a}" data-r="0" aria-label="Minimum price"><input type="range" min="0" max="${PMAX}" value="${b}" data-r="1" aria-label="Maximum price"></div>
  <div class="prices"><label class="field price"><span>€</span><input autocomplete="off" inputmode="numeric" data-p="0" value="${a}" aria-label="Minimum price"></label><i>–</i><label class="field price"><span>€</span><input autocomplete="off" inputmode="numeric" data-p="1" value="${b}" aria-label="Maximum price"></label></div>
  <div class="chips">${PRESETS.map(([x,y])=>`<button class="chip ${a===x&&b===y?'on':''}" data-preset="${x}-${y}">€${x}–${y}</button>`).join('')}</div>`}
function filtersHTML(ctx){const order=ctx==='desk'?DESK_ORDER:MOB_ORDER;
  return order.map(g=>{const open=S.open[ctx][g], n=g==='price'?0:S.sel[g].size, t=g==='price'?'Price':GROUPS[g].t;
    return `<div class="grp ${g==='price'?'price':''} ${open?'open':''}" data-grp="${g}"><button class="grp-h" data-tog="${g}" aria-expanded="${!!open}"><span class="tt">${t}</span>${n?`<span class="n">${n}</span>`:''}${ic('chevron-down','class="chev"')}</button><div class="grp-b">${open?(g==='price'?priceBody():groupBody(g,ctx)):''}</div></div>`}).join('')
  +`<div class="toggles"><label class="sw"><span>Only discounted</span><input type="checkbox" data-sw="disc" ${S.disc?'checked':''}><span class="tg"></span></label><label class="sw"><span>Instant delivery</span><input type="checkbox" data-sw="instant" ${S.instant?'checked':''}><span class="tg"></span></label></div>`}
function renderFilters(){
  const f=document.activeElement, key=f&&f.dataset&&(f.dataset.fq||f.dataset.p), pos=f&&f.selectionStart, inSheet=f&&f.closest&&f.closest('#fMob');
  $('#fDesk').innerHTML=filtersHTML('desk'); $('#fMob').innerHTML=filtersHTML('mob');
  if(key){const t=[...document.querySelectorAll(`[data-fq="${key}"],[data-p="${key}"]`)].find(e=>!!e.closest('#fMob')===!!inSheet); if(t){t.focus();try{t.setSelectionRange(pos,pos)}catch(e){}}}
}

/* ---------- Results ---------- */
function filtered(){
  let list=GAMES.filter(g=>{
    if(S.sel.device.size&&!(S.sel.device.has('pc')||(S.sel.device.has('xbox')&&g.xbox))) return false;
    if(S.sel.platform.size&&!S.sel.platform.has(g.act)) return false;
    if(S.sel.publisher.size&&!S.sel.publisher.has(g.pub)) return false;
    /* Region = where the key can be activated: Global keys work everywhere, regional keys only in their region */
    const rg=[...S.sel.region].filter(r=>r!=='global'); if(rg.length&&g.reg!=='global'&&!rg.includes(g.reg)) return false;
    if(g.price<S.price[0]||g.price>S.price[1]) return false;
    if(S.q&&!g.title.toLowerCase().includes(S.q.toLowerCase())) return false;
    if(S.disc&&!g.pct) return false;
    return true});
  const by={discount:(a,b)=>(b.pct||0)-(a.pct||0),asc:(a,b)=>a.price-b.price,desc:(a,b)=>b.price-a.price,az:(a,b)=>a.title.localeCompare(b.title),new:(a,b)=>b.id%5-a.id%5||a.id-b.id};
  if(by[S.sort]) list=[...list].sort(by[S.sort]);
  return list}
function foundCount(list){
  if(!list.length) return 0;
  const sum=g=>[...S.sel[g]].reduce((s,v)=>s+((GROUPS[g].opts.find(o=>o[0]===v)||[])[2]||0),0);
  let n=S.sel.region.size?sum('region'):TOTAL; if(!n) n=TOTAL;
  for(const g of ['device','platform']) if(S.sel[g].size){const s=sum(g); if(s) n=Math.min(n,s)}
  const narrowed=S.disc||S.q||S.price[0]>0||S.price[1]<PMAX||S.sel.publisher.size||S.sel.genre.size||S.sel.type.size||S.instant;
  return narrowed?list.length:Math.max(n,list.length)}
function pagesHTML(total){const mob=innerWidth<1024, per=mob?8:16, pages=Math.max(1,Math.ceil(total/per)), p=Math.min(S.page,pages);
  const nums=[]; const win=mob?3:4;
  if(pages<=win+2){for(let i=1;i<=pages;i++)nums.push(i)} else {
    let s=Math.max(1,Math.min(p-1,pages-win)); if(p<=2)s=1;
    if(s>1)nums.push(1); if(s>2)nums.push('…'); for(let i=s;i<s+win&&i<=pages;i++)nums.push(i); if(s+win<pages)nums.push('…'); if(nums[nums.length-1]!==pages)nums.push(pages)}
  const viewed=Math.min(total,p*per);
  return `<div class="prog"><span class="vw">You’ve viewed ${fmt(viewed)} of ${fmt(total)} games</span><div class="pr"><i style="width:${Math.max(2,viewed/total*100)}%"></i></div></div>
  <div class="pages"><button class="ib mob" data-page="${p-1}" ${p===1?'disabled':''} aria-label="Previous page">${ic('chevron-left')}</button><button class="pi prev" data-page="${p-1}" ${p===1?'disabled':''} aria-label="Previous page">${ic('chevron-left')}Prev</button>
  ${nums.map(n=>n==='…'?'<span class="pi dots">…</span>':`<button data-page="${n}" class="pi ${n===p?'on':''}" ${n===p?'aria-current="page"':''}>${fmt(n)}</button>`).join('')}
  <button class="pi next" data-page="${p+1}" ${p===pages?'disabled':''} aria-label="Next page">Next${ic('chevron-right')}</button><button class="ib mob" data-page="${p+1}" ${p===pages?'disabled':''} aria-label="Next page">${ic('chevron-right')}</button></div>`}
function activeChips(){const out=[];
  for(const g in S.sel) for(const v of S.sel[g]){const o=GROUPS[g].opts.find(x=>x[0]===v); out.push([`${g}:${v}`,o[1]])}
  if(S.price[0]>0||S.price[1]<PMAX) out.push(['price',`€${S.price[0]}–${S.price[1]}`]);
  if(S.disc) out.push(['sw:disc','Discounted']); if(S.instant) out.push(['sw:instant','Instant delivery']);
  return out}
function render(){
  const list=filtered(), total=foundCount(list), mob=innerWidth<1024;
  const per=mob?8:16, rot=list.length?((S.page-1)*per)%list.length:0;
  const shown=list.length?[...list.slice(rot),...list.slice(0,rot)].slice(0,per):[];
  const grid=$('#grid'); grid.className='grid'+(S.view==='list'?' list':'');
  grid.innerHTML=shown.length?shown.map(cardHTML).join(''):`<div class="empty"><div class="tx"><h3 class="t-h3">No games match these filters</h3><p>Try widening the price range or removing a filter.</p></div><button class="btn btn-pri m" data-act="reset">Reset filters</button></div>`;
  $('#pg').innerHTML=total?pagesHTML(total):''; $('#pg').style.display=total?'':'none';
  $('#found').textContent=fmt(total);
  $('#showBtn').textContent=total?`Show ${fmt(total)} games`:'No games found';
  const ch=activeChips();
  $('#active').innerHTML=ch.map(([k,l])=>`<button class="ach" data-rm="${k}">${l}${ic('close')}</button>`).join('')+(ch.length?'<button class="btn btn-ghost" data-act="reset">Clear all</button>':'');
  $('#fCt').textContent=ch.length; $('#fCt').hidden=!ch.length;
  $$('.sortLbl').forEach(e=>e.textContent=SORTS.find(s=>s[0]===S.sort)[1]);
  $('#sortPop').innerHTML=SORTS.map(([v,l,i])=>`<button class="mi ${S.sort===v?'on':''}" data-sort="${v}" role="menuitemradio" aria-checked="${S.sort===v}"><span class="c">${ic(i)}${l}</span>${ic('check','class="chk"')}</button>`).join('');
  $('#sMob').innerHTML=SORTS.map(([v,l,i])=>`<button class="ropt ${S.sort===v?'on':''}" data-sort="${v}" role="radio" aria-checked="${S.sort===v}"><span class="rd"></span>${ic(i)}${l}</button>`).join('');
  $$('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.view===S.view));
  $('#mView').innerHTML=ic(S.view==='grid'?'list':'grid');
}
function update(){S.page=1;renderFilters();render()}
/* ---------- Events ---------- */
document.addEventListener('click',e=>{
  const t=e.target.closest('button,a'); if(!t) return;
  const d=t.dataset;
  if(t.id==='sortBtn'){const o=$('#sortPop').classList.contains('open');closePops();if(!o){$('#sortPop').classList.add('open');t.setAttribute('aria-expanded','true')}return}
  if(d.sort){S.sort=d.sort;S.page=1;closePops();render();if($('#sSheet').classList.contains('open'))setTimeout(closeSheets,150);return}
  if(d.view){S.view=d.view;return render()}
  if(t.id==='mView'){S.view=S.view==='grid'?'list':'grid';return render()}
  if(d.tog){const ctx=t.closest('#fMob')?'mob':'desk';S.open[ctx][d.tog]=!S.open[ctx][d.tog];return renderFilters()}
  if(d.more){S.more[d.more]=!S.more[d.more];return renderFilters()}
  if(d.preset){const [a,b]=d.preset.split('-').map(Number);S.price=(S.price[0]===a&&S.price[1]===b)?[0,PMAX]:[a,b];return update()}
  if(d.rm){const [g,v]=d.rm.split(':');if(g==='price')S.price=[0,PMAX];else if(g==='sw')S[v]=false;else S.sel[g].delete(v);return update()}
  if(d.act==='reset'){for(const g in S.sel)S.sel[g].clear();S.price=[0,PMAX];S.disc=S.instant=false;S.q='';$('#q').value='';S.fq={};return update()}
  if(d.page){if(t.disabled)return;S.page=+d.page;render();return $('.ttl').scrollIntoView({behavior:'smooth'})}
  if(t.id==='openFilters')return openSheet('#fSheet');
  if(t.id==='openSort')return openSheet('#sSheet');
});
document.addEventListener('change',e=>{const t=e.target,d=t.dataset;
  if(d.g){t.checked?S.sel[d.g].add(t.value):S.sel[d.g].delete(t.value);return update()}
  if(d.sw){S[d.sw]=t.checked;return update()}
  if(d.p!==undefined){let v=Math.max(0,Math.min(PMAX,parseInt(t.value)||0));S.price[+d.p]=v;if(S.price[0]>S.price[1])S.price=[Math.min(...S.price),Math.max(...S.price)];return update()}
});
document.addEventListener('input',e=>{const t=e.target,d=t.dataset;
  if(t.id==='q'){S.q=t.value;S.page=1;return render()}
  if(d.fq!==undefined){S.fq[d.fq]=t.value;return renderFilters()}
  if(d.r!==undefined){const i=+d.r;let v=+t.value;if(i===0)v=Math.min(v,S.price[1]);else v=Math.max(v,S.price[0]);S.price[i]=v;
    const range=t.closest('.range'),fill=range.querySelector('.fill');fill.style.left=S.price[0]/PMAX*100+'%';fill.style.right=(1-S.price[1]/PMAX)*100+'%';
    range.parentElement.querySelectorAll('[data-p]').forEach(p=>p.value=S.price[+p.dataset.p]);S.page=1;render()}
});
document.addEventListener('pointerup',e=>{if(e.target.dataset&&e.target.dataset.r!==undefined)renderFilters()});
document.addEventListener('keyup',e=>{if(e.target.dataset&&e.target.dataset.r!==undefined)renderFilters()});
let pTop=136,lastY=scrollY;
function stickPanel(){const pn=$('.panel');if(!pn||innerWidth<1024)return;const max=$('.nav').classList.contains('hide')?88:136,min=Math.min(max,innerHeight-pn.offsetHeight-16);
  pTop=Math.max(min,Math.min(max,pTop-(scrollY-lastY)));lastY=scrollY;pn.style.top=pTop+'px'}
new ResizeObserver(stickPanel).observe($('.panel'));addEventListener('resize',stickPanel);addEventListener('scroll',stickPanel,{passive:true});
/* Hooks for kv.js: re-render after cart/wishlist changes and breakpoint switch; mobile search filters in place */
KV.render=render;
KV.onSearch=q=>{S.q=q;$('#q').value=q;S.page=1;render();$('.ttl').scrollIntoView()};
const q0=new URLSearchParams(location.search).get('q'); if(q0){S.q=q0;$('#q').value=q0}
renderFilters();render();
