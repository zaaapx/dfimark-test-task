/* Cart page: items with quantity, order summary, empty state, suggestions. State comes from the shared store (S.cart + QTY). */
const forceEmpty=qs.get('state')==='empty';
const lines=()=>forceEmpty?[]:[...S.cart].map(findGame).filter(Boolean);
const coverOf=g=>g.cover?`<img src="${g.cover}" alt="">`:'';
const covBg=g=>g.cover?'':`style="background:var(--gradient-cover-0${g.grad||1})"`;
const totals=L=>{let sub=0,tot=0,n=0;L.forEach(g=>{const q=qtyOf(g.id);n+=q;sub+=(g.old||g.price)*q;tot+=g.price*q});return{n,sub,tot,disc:sub-tot}};
const item=g=>{const q=qtyOf(g.id);return `<article class="ci" data-id="${g.id}"><div class="c-top"><a class="cov" href="product.html?id=${g.id}" ${covBg(g)} tabindex="-1" aria-hidden="true">${coverOf(g)}</a><div class="tx"><a class="t-mm" href="product.html?id=${g.id}">${g.title}</a><span class="t-cm">${PLAT[g.act]||'Steam'} · Global · Instant key</span></div></div>
 <div class="c-bot"><div class="qty" role="group" aria-label="Quantity of ${g.title}"><button data-q="-1" aria-label="Decrease quantity" ${q<=1?'disabled':''}>−</button><span class="t-mm" aria-live="polite">${q}</span><button data-q="1" aria-label="Increase quantity" ${q>=10?'disabled':''}>+</button></div>
 <div class="pr"><b class="t-pm">${eur(g.price*q)}</b>${g.old?`<s class="t-po">${eur(g.old*q)}</s>`:''}</div>
 <button class="ib" data-rm aria-label="Remove ${g.title} from cart">${ic('trash')}</button></div></article>`};
function render(){
  const L=lines(),T=totals(L);
  const rec=(L.length?[7,8,0,14,1]:[0,1,7,8,14]).map(i=>cardHTML(GAMES[i])).join('');
  const head=L.length?`<div class="ph"><h1 class="t-h1">Cart</h1><p class="t-sr">${T.n} item${T.n>1?'s':''} · Prices include VAT</p></div>
   <ol class="stepper" aria-label="Checkout progress"><li aria-current="step"><span class="dot">1</span>Cart</li><li class="ln"></li><li><span class="dot">2</span>Details</li><li class="ln"></li><li><span class="dot">3</span>Payment</li></ol>`
   :`<div class="ph"><h1 class="t-h1">Cart</h1></div>`;
  const body=L.length?`<div class="cbody"><div class="items">${L.map(item).join('')}
   <div class="notice info">${ic('info')}<div><b>Keys are delivered instantly</b><p>We email each key right after payment and keep it in your account.</p></div></div></div>
   <aside class="sum" aria-label="Order summary"><h2 class="t-h3">Order summary</h2>
    <div class="row"><span>Subtotal (${T.n} item${T.n>1?'s':''})</span><b>${eur(T.sub)}</b></div>
    <div class="row"><span>Discount</span><b class="disc">${T.disc>0?'−'+eur(T.disc):eur(0)}</b></div><hr>
    <div class="row tot"><span class="t-mm">Total</span><b class="t-pl">${eur(T.tot)}</b></div>
    <a class="btn btn-pri m" href="checkout.html">Go to checkout</a>
    <p class="assure">${ic('shield')}Secure payment · Keys delivered instantly</p></aside></div>`
   :`<div class="empty-st"><div class="tx"><h2 class="t-h3">Your cart is empty</h2><p class="t-sr">Add a game key, gift card or software licence and it will show up here</p></div><a class="btn btn-pri m" href="catalog.html">Browse game keys</a></div>`;
  $('#ct').innerHTML=`${head}${body}
   <section class="pd-more sec" aria-labelledby="h-more"><div class="sec-h"><h2 class="t-h2" id="h-more">${L.length?'You may also like':'Popular now'}</h2><a class="tlink" href="catalog.html">See all${ic('chevron-right')}</a></div><div class="hgrid">${rec}</div></section>`;
  syncCounts();
}
KV.render=render;render();
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const row=b.closest('.ci');if(!row)return;const id=+row.dataset.id;
  if(b.dataset.q){setQty(id,qtyOf(id)+ +b.dataset.q);render();const nb=$(`.ci[data-id="${id}"] [data-q="${b.dataset.q}"]`);if(nb&&!nb.disabled)nb.focus()}
  else if(b.hasAttribute('data-rm')){S.cart.delete(id);saveStore();render()}});
