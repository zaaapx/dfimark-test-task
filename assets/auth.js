/* Auth: Sign in / Sign up with error states. Demo only: any valid email with an 8+ character password signs in; the demo email below is "already registered". */
let USER=null;try{USER=JSON.parse(localStorage.getItem('kv-user')||'null')}catch(e){}
const TAKEN='marta.k@example.com';
const A={mode:qs.get('mode')==='signup'?'signup':'in',err:qs.get('state')==='error',name:'',email:qs.get('state')==='error'||qs.get('mode')!=='signup'?'marta.k@example.com':'',pw:qs.get('state')==='error'&&qs.get('mode')!=='signup'?'wrongpass':'',remember:false,terms:true,fe:{}};
const chev=ic('chevron-right');
function render(){
  const up=A.mode==='signup';document.title=(up?'Create account':'Sign in')+' · KeyVault';
  const E=A.fe;
  const notice=!A.err?'':up?`<div class="notice err" role="alert">${ic('alert')}<div><b>We couldn’t create your account</b><p>An account with this email already exists. Try signing in instead.</p></div></div>`
   :`<div class="notice err" role="alert">${ic('alert')}<div><b>Email or password is incorrect</b><p>Check your details and try again, or reset your password.</p></div></div>`;
  const bad=A.err&&!up?' ':'';
  const fields=up?`${fld('name','Name',A.name,'Your name',{err:E.name,ac:'name'})}${fld('email','Email',A.email,'name@example.com',{err:E.email||(A.err?'This email is already registered':''),type:'email',ac:'email'})}${fld('pw','Password',A.pw,'At least 8 characters',{help:'At least 8 characters',err:E.pw,type:'password',ac:'new-password'})}`
   :`${fld('email','Email',A.email,'name@example.com',{err:E.email,bad:A.err,type:'email',ac:'email'})}${fld('pw','Password',A.pw,'Your password',{err:E.pw,bad:A.err,type:'password',ac:'current-password'})}`;
  $('#au').innerHTML=`<form class="acard" novalidate><div class="ah"><h1 class="t-h2">${up?'Create your account':'Sign in'}</h1><p class="t-sr">${up?'Keep your keys, orders and wishlist in one place.':'Welcome back. Your keys and orders are waiting.'}</p></div>${notice}
  <div class="af">${fields}</div>
  ${up?`<div class="terms">${cbx(A.terms,'data-t aria-labelledby="tl"')}<span id="tl" class="t-sr">I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy policy</a>${E.terms?'<em class="er"> — required</em>':''}</span></div>`
   :`<div class="arow"><label class="rem">${cbx(A.remember,'data-r aria-label="Remember me"')}<span class="t-sr">Remember me</span></label><a class="tlink" href="#">Forgot password?${chev}</a></div>`}
  <button class="btn btn-pri m" type="submit">${up?'Create account':'Sign in'}</button>
  <div class="asw"><span class="t-sr">${up?'Already have an account?':'New to KeyVault?'}</span><a class="tlink" href="auth.html${up?'':'?mode=signup'}" data-sw>${up?'Sign in':'Create an account'}${chev}</a></div></form>`;
  syncCounts();
}
KV.render=render;render();
const go=()=>{const n=qs.get('next');location.href=n&&/^[a-z-]+\.html/.test(n)?n:'account.html'};
document.addEventListener('input',e=>{const t=e.target;if(t.id==='name')A.name=t.value;else if(t.id==='email')A.email=t.value;else if(t.id==='pw')A.pw=t.value;else return;
  if(A.fe[t.id]){delete A.fe[t.id];t.closest('.field').classList.remove('bad');const h=t.closest('.tf').querySelector('.er');if(h)h.remove()}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(b){if(b.dataset.t!==undefined){A.terms=!A.terms;if(A.terms)delete A.fe.terms;render();$('[data-t]').focus()}else if(b.dataset.r!==undefined){A.remember=!A.remember;render();$('[data-r]').focus()}return}
  const s=e.target.closest('[data-sw]');if(s){e.preventDefault();A.mode=A.mode==='signup'?'in':'signup';A.err=false;A.fe={};history.replaceState(null,'',s.getAttribute('href').replace('auth.html','')||location.pathname);render()}});
document.addEventListener('submit',e=>{e.preventDefault();const up=A.mode==='signup',E={};
  if(up&&!A.name.trim())E.name='Enter your name';
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(A.email))E.email='Enter a valid email address';
  if(A.pw.length<8)E.pw='Use at least 8 characters';
  if(up&&!A.terms)E.terms=1;
  A.fe=E;A.err=false;
  if(Object.keys(E).length){render();const f=$('[aria-invalid="true"]');if(f)f.focus();return}
  if(up){if(A.email.toLowerCase()===TAKEN){A.err=true;render();$('#email').focus();return}}
  else if(A.pw==='wrongpass'){A.err=true;render();return}
  try{localStorage.setItem('kv-user',JSON.stringify({name:up?A.name.trim():'Marta Kowalska',email:A.email}))}catch(_){}
  go()});
