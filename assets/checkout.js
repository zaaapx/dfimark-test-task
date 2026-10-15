/* Checkout: Contact, Payment method, Card details, Terms, Order summary. States: default | error (declined) | processing. */
const L=[...S.cart].map(findGame).filter(Boolean);
if(!L.length){location.replace('cart.html')}
const T=(()=>{let sub=0,tot=0,n=0;L.forEach(g=>{const q=qtyOf(g.id);n+=q;sub+=(g.old||g.price)*q;tot+=g.price*q});return{n,sub,tot,disc:sub-tot}})();
const METHODS=[['card','visa','Credit or debit card','Visa, Mastercard — keys delivered instantly'],['paypal','paypal','PayPal','Pay with your PayPal balance or linked account'],['applepay','applepay','Apple Pay','Pay with Face ID or Touch ID'],['googlepay','googlepay','Google Pay','Pay with your saved Google Pay card']];
const V={st:qs.get('state')||'default',email:'marta.k@example.com',method:'card',num:qs.get('state')==='error'?'4000 0000 0000 0002':'',exp:'',cvc:'',terms:true,errs:{}};
const logo=k=>{const [vb,svg,w,h]=PAY[k];return `<span class="paym"><svg viewBox="${vb}" width="${w}" height="${h}" fill="none" aria-hidden="true">${svg}</svg></span>`};
function render(){
  const proc=V.st==='processing',E=V.errs;
  const notice=V.st==='error'?`<div class="notice err" role="alert">${ic('alert')}<div><b>Payment was declined</b><p>Check your card details or choose another payment method. You haven’t been charged.</p></div></div>`
   :proc?`<div class="notice info" role="status">${ic('info')}<div><b>Confirming your payment…</b><p>Please don’t close this page. Your keys will appear on the next screen.</p></div></div>`:'';
  const step=n=>V.st==='processing'?(n<3?'done':n===3?'cur':''):(n<2?'done':n===2?'cur':'');
  const stp=['Cart','Details','Payment'].map((l,i)=>`<li class="${step(i+1)}" ${step(i+1)==='cur'?'aria-current="step"':''}><span class="dot">${i+1}</span>${l}</li>`);
  const stepper=`<ol class="stepper" aria-label="Checkout progress">${stp[0]}<li class="ln ${step(2)==='done'||step(2)==='cur'?'on':''}"></li>${stp[1]}<li class="ln ${step(3)==='cur'?'on':''}"></li>${stp[2]}</ol>`;
  const opts=METHODS.map(([k,lg,t,d])=>`<button type="button" class="po ${V.method===k?'on':''}" role="radio" aria-checked="${V.method===k}" data-m="${k}" ${proc?'disabled':''}><span class="rd"></span>${logo(lg)}<span class="tx"><b class="t-mm">${t}</b><span class="t-cm">${d}</span></span></button>`).join('');
  const card=V.method==='card'?`<div class="cg"><h2 class="t-h3">Card details</h2>${fld('num','Card number',V.num,'1234 1234 1234 1234',{err:E.num||(V.st==='error'?'This card was declined by your bank':''),dis:proc,mode:'numeric',ac:'cc-number'})}
   <div class="row2">${fld('exp','Expiry date',V.exp,'MM / YY',{err:E.exp,dis:proc,mode:'numeric',ac:'cc-exp'})}${fld('cvc','Security code',V.cvc,'CVC',{err:E.cvc,dis:proc,mode:'numeric',ac:'cc-csc'})}</div></div>`:'';
  $('#co').innerHTML=`<h1 class="t-h1">Checkout</h1>${stepper}
  <div class="cbody"><form class="form" novalidate>${notice}
   <div class="cg"><h2 class="t-h3">Contact</h2>${fld('email','Email for key delivery',V.email,'name@example.com',{help:'We’ll send your keys and receipt here',err:E.email,dis:proc,type:'email',ac:'email'})}</div>
   <div class="cg pm" role="radiogroup" aria-label="Payment method"><h2 class="t-h3">Payment method</h2>${opts}</div>${card}
   <div class="terms"><button type="button" class="cb2 ${V.terms?'on':''}" role="checkbox" aria-checked="${V.terms}" data-t aria-labelledby="tl" ${proc?'disabled':''}>${V.terms?'<svg viewBox="0 0 12 12" width="12" height="12" fill="none"><path d="M2 6.2L4.8 9L10 3.2" stroke="var(--static-white)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>':''}</button><span id="tl" class="t-sr">I agree to the <a href="#">Terms of use</a> and the <a href="#">Refund policy</a>${E.terms?`<em class="er"> — required</em>`:''}</span></div></form>
   <aside class="sum" aria-label="Order summary"><h2 class="t-h3">Order summary</h2>
    <div class="row"><span>Subtotal (${T.n} item${T.n>1?'s':''})</span><b>${eur(T.sub)}</b></div>
    <div class="row"><span>Discount</span><b class="disc">${T.disc>0?'−'+eur(T.disc):eur(0)}</b></div><hr>
    <div class="row tot"><span class="t-mm">Total</span><b class="t-pl">${eur(T.tot)}</b></div>
    <button class="btn btn-pri m" data-pay ${proc?'disabled':''}>${proc?'Processing…':'Pay '+eur(T.tot)}</button>
    <p class="assure">${ic('shield')}Secure payment · Keys delivered instantly</p></aside></div>`;
  syncCounts();
}
const fmtNum=s=>s.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
const fmtExp=s=>{const d=s.replace(/\D/g,'').slice(0,4);return d.length>2?d.slice(0,2)+' / '+d.slice(2):d};
function validate(){const e={};
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(V.email))e.email='Enter a valid email address';
  if(V.method==='card'){const d=V.num.replace(/\D/g,'');if(d.length!==16)e.num='Enter the 16 digits on your card';
   const x=V.exp.replace(/\D/g,'');if(x.length!==4||+x.slice(0,2)<1||+x.slice(0,2)>12)e.exp='Enter a valid expiry date';
   if(V.cvc.replace(/\D/g,'').length<3)e.cvc='Enter the 3 digits on the back';}
  if(!V.terms)e.terms=1;return e}
function pay(){V.errs=validate();V.st='default';
  if(Object.keys(V.errs).length){render();const f=$('[aria-invalid="true"]');if(f)f.focus();return}
  if(V.method==='card'&&V.num.replace(/\D/g,'').startsWith('4000')){V.st='error';render();return}
  V.st='processing';render();setTimeout(()=>{try{localStorage.setItem('kv-order',JSON.stringify({id:'KV-'+(10000+Math.floor(Math.random()*89999)),email:V.email,ids:L.map(g=>g.id),at:Date.now()}))}catch(e){}S.cart.clear();saveStore();location.href='order-success.html'},1800)}
KV.render=render;if(L.length)render();
document.addEventListener('input',e=>{const t=e.target;if(!t.id)return;
  if(t.id==='num'){V.num=fmtNum(t.value);t.value=V.num}else if(t.id==='exp'){V.exp=fmtExp(t.value);t.value=V.exp}
  else if(t.id==='cvc'){V.cvc=t.value.replace(/\D/g,'').slice(0,4);t.value=V.cvc}else if(t.id==='email')V.email=t.value;
  if(V.errs[t.id]){delete V.errs[t.id];const f=t.closest('.tf');f.querySelector('.field').classList.remove('bad');const h=f.querySelector('.er');if(h&&t.id!=='email')h.remove();else if(h){h.textContent='We’ll send your keys and receipt here';h.classList.remove('er')}}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.m){V.method=b.dataset.m;if(V.st==='error')V.st='default';render();$(`[data-m="${V.method}"]`).focus()}
  else if(b.dataset.t!==undefined){V.terms=!V.terms;if(V.terms)delete V.errs.terms;render();$('[data-t]').focus()}
  else if(b.dataset.pay!==undefined){e.preventDefault();pay()}});
document.addEventListener('submit',e=>{e.preventDefault();pay()});
