/* Product page: Gallery, Buy box (Standard / Pre-order / Out of stock), About, Details, System requirements, Reviews, More like this */
const ST=qs.get('state')||''; /* ''|preorder|oos */
let P=null; const pid=qs.get('id');
if(pid!==null&&findGame(+pid)) P=findGame(+pid); else P=ST==='preorder'?EXTRA[1]:EXTRA[0];
const X=Object.assign({sub:`Game · ${PLAT[P.act]||'Steam'} key`,editions:[['Standard Edition','Base game, instant key',P.price]],
  about:[`Digital key for ${PLAT[P.act]||'Steam'}. Instant delivery to your account and by email.`],min:null,rec:null,
  details:[['Platform',PLAT[P.act]||'Steam'],['Region','Global'],['Device',P.xbox?'PC, Xbox':'PC']]},P);
const preorder=ST==='preorder'||!!P.preorder, oos=ST==='oos';
const V={ed:0,img:0,notified:false};
document.title=`${X.title} · KeyVault`;
const covers=['01','05','09','12'];
const galImg=(i,main)=>X.cover?`<img src="${X.cover}" alt="" style="${i?`object-position:${[0,20,80,50][i]}% ${[0,30,70,20][i]}%;`:''}${i&&main?'transform:scale(1.15)':''}">`:'';
const galBg=i=>X.cover?'':`style="background:var(--gradient-cover-0${(((X.grad||1)-1+i)%4)+1})"`;
const featsBy=[['shield','Instant delivery','Your key arrives by email in under a minute'],['shield','Buyer protection','Every key is checked before it goes on sale'],['shield',`Activate on ${PLAT[X.act]||'Steam'}`,'Redeem in Games → Activate a Product']];
const spec=(l,v)=>`<div class="spec"><span>${l}</span><b>${v}</b></div>`;
const cart=()=>S.cart.has(X.id);
function render(){
  const ed=X.editions[V.ed], price=ed[2], hasOld=X.old&&V.ed===0;
  const inCart=cart();
  const priceRow=oos?`<div class="prc dim"><span class="t-pl">${eur(price)}</span>${hasOld?`<s>${eur(X.old)}</s><span class="pbadge disc">−${X.pct}%</span>`:''}</div>`
    :`<div class="prc"><span class="t-pl">${eur(price)}</span>${hasOld?`<s>${eur(X.old)}</s><span class="pbadge disc">−${X.pct}%</span>`:''}</div>`;
  const notice=preorder?`<div class="notice warn">${ic('alert')}<div><b>Releases ${X.preorder||'14 Nov 2026'}</b><p>Your key is delivered on release day. Cancel any time before then for a full refund.</p></div></div>`
    :oos?`<div class="notice err">${ic('alert')}<div><b>Out of stock</b><p>This key isn’t available right now. Get notified when it’s back.</p></div></div>`:'';
  const acts=oos?`<div class="acts"><button class="btn btn-pri m" disabled>Out of stock</button><button class="btn btn-sec m sec-fix" data-notify ${V.notified?'disabled':''}>${V.notified?'We’ll email you':'Notify me'}</button>${wishBtn()}</div>`
    :`<div class="acts"><button class="btn btn-pri m" data-add>${preorder?'Pre-order now':inCart?'In cart · View cart':'Add to cart'}</button>${wishBtn()}</div>`;
  function wishBtn(){const w=S.wish.has(X.id);return `<button class="ib l ${w?'on':''}" data-wish="${X.id}" aria-pressed="${w}" aria-label="Add ${X.title} to wishlist">${ic('heart')}</button>`}
  const thumbs=[0,1,2,3].map(i=>`<button ${galBg(i)} aria-current="${i===V.img}" data-img="${i}" aria-label="Image ${i+1}">${galImg(i,false)}</button>`).join('');
  const mainStyle=X.cover?'':galBg(V.img);
  const rec=[7,8,0,14,1].map(i=>cardHTML(GAMES[i])).join('');
  const rv=[['MK','Marta K.','Key arrived in under a minute and activated in Steam straight away.','2 days ago'],['JD','Jonas D.','Cheaper than the store and the support answered within ten minutes.','1 week ago'],['AL','Ana L.','Second order here. Smooth checkout and instant delivery both times.','3 weeks ago']]
    .map(([i,n,t,m])=>`<article class="rev"><div class="ra"><span class="av" aria-hidden="true">${i}</span><div><b>${n}</b><small>${X.title}</small></div></div><span class="stars" role="img" aria-label="5 out of 5">${starIcons()}</span><p>${t}</p><small>Verified purchase · ${m}</small></article>`).join('');
  const sysrq=X.min?`<section class="pd-sys" aria-labelledby="h-sys"><h3 class="t-h3" id="h-sys">System requirements</h3><div class="cols2"><div><p class="t-caps cap">MINIMUM</p>${X.min.map(r=>spec(...r)).join('')}</div><div><p class="t-caps cap">RECOMMENDED</p>${X.rec.map(r=>spec(...r)).join('')}</div></div></section>`:'';
  $('#pd').innerHTML=`
  <nav class="crumbs" aria-label="Breadcrumbs"><a href="index.html">Home</a>${ic('chevron-right')}<a href="catalog.html">Game keys</a>${ic('chevron-right')}<span>${X.title}</span></nav>
  <div class="pd-top">
    <div class="gal"><div class="gal-main" ${mainStyle}>${X.cover?`<img src="${X.cover}" alt="${X.title} cover" ${V.img?`style="object-position:${[0,20,80,50][V.img]}% ${[0,30,70,20][V.img]}%;transform:scale(1.15)"`:''}>`:''}</div><div class="gal-th">${thumbs}</div></div>
    <div class="buy">
      <div class="badges"><span class="pbadge">${img(ACT_ICON[X.act]||'steam')}${PLAT[X.act]||'Steam'}</span><span class="pbadge">${ic('globe')}Global</span>${preorder?'<span class="pbadge pre">Pre-order</span>':''}</div>
      <div class="ttl"><h1 class="t-h1">${X.title}</h1><p class="sub">${X.sub}</p><div class="rrow">${ic('star')}<b>4.8</b><span>12,480 verified reviews</span></div></div>
      <div class="eds" role="radiogroup" aria-label="Edition"><p class="t-caps cap">EDITION</p><div class="eds-l">${X.editions.map((e,i)=>`<button class="ed" role="radio" aria-checked="${i===V.ed}" data-ed="${i}"><b>${e[0]}</b><small>${e[1]}</small><span>${eur(e[2])}</span></button>`).join('')}</div></div>
      ${priceRow}${notice}${acts}
      <div class="feats">${featsBy.map(([i,t,d])=>`<div class="feat"><span class="ft">${ic(i)}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
    </div>
  </div>
  <div class="pd-body">
    <section class="pd-about" aria-labelledby="h-about"><h2 class="t-h2" id="h-about">About this game</h2>${X.about.map(p=>`<p>${p}</p>`).join('')}</section>
    ${sysrq}
    <section class="pd-det" aria-labelledby="h-det"><h3 class="t-h3" id="h-det">Details</h3><div>${X.details.map(r=>spec(...r)).join('')}</div></section>
  </div>
  <section class="pd-rev" aria-labelledby="h-rv"><div class="sec-h"><h2 class="t-h2" id="h-rv">Customer reviews</h2></div>
    <div class="rating"><b class="t-h1">4.8</b><div><span class="stars" role="img" aria-label="4.8 out of 5">${starIcons()}</span><p>12 480 reviews from verified orders</p></div></div>
    <div class="cards">${rv}</div></section>
  <section class="pd-more sec" aria-labelledby="h-more"><div class="sec-h"><h2 class="t-h2" id="h-more">You may also like</h2><a class="tlink" href="catalog.html">See all${ic('chevron-right')}</a></div><div class="hgrid">${rec}</div></section>`;
}
KV.render=render;render();
document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;
  if(d.ed!==undefined){V.ed=+d.ed;render();$(`[data-ed="${V.ed}"]`).focus()}
  else if(d.img!==undefined){V.img=+d.img;render();$(`[data-img="${V.img}"]`).focus()}
  else if(d.add!==undefined){if(cart()){location.href='cart.html';return}S.cart.add(X.id);saveStore();setQty(X.id,1);render();syncCounts()}
  else if(d.notify!==undefined){V.notified=true;render()}});
