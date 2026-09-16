
const WHATSAPP_NUMBER = '84971978439';
function waLink(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
function todayISO(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().split('T')[0]}
function setupDates(){document.querySelectorAll('input[type=date]').forEach(el=>{if(!el.min) el.min=todayISO()})}
function setupNav(){
  const nav=document.querySelector('.nav');
  const toggle=document.querySelector('.mobile-toggle');
  const links=document.querySelectorAll('.nav-links a');
  if(toggle&&nav){
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click',()=>{
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false');toggle.textContent=nav.classList.contains('open')?'×':'☰';
    });
    links.forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));
    document.addEventListener('click',(e)=>{if(nav.classList.contains('open')&&!nav.contains(e.target)){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}})
  }
}
function setupWaLinks(){document.querySelectorAll('[data-wa-message]').forEach(a=>{a.href=waLink(a.dataset.waMessage)})}
function setupBookingForms(){document.querySelectorAll('[data-booking-form]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();const checkin=form.querySelector('[name=checkin]')?.value||'Not sure yet';const checkout=form.querySelector('[name=checkout]')?.value||'Not sure yet';const guests=form.querySelector('[name=guests]')?.value||'1';const room=form.dataset.room||'available room options';const msg=`Hi Saigon Authentic 👋
I'd like to check ${room}.

Check-in: ${checkin}
Check-out: ${checkout}
Guests: ${guests}

Could you send me the available options and rates?`;window.open(waLink(msg),'_blank','noopener')})})}
function setupCurrentNav(){
  const path=window.location.pathname.replace(/index\.html$/,'').replace(/\/$/,'') || '/';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=new URL(a.getAttribute('href'), window.location.origin).pathname.replace(/index\.html$/,'').replace(/\/$/,'') || '/';
    if(path===href){a.classList.add('is-current')}
  });
}
function setupMobileWa(){
  const bar=document.querySelector('.mobile-wa');
  if(!bar) return;
  let formVisible=false;
  const forms=[...document.querySelectorAll('[data-booking-form]')];
  if('IntersectionObserver' in window && forms.length){
    const observer=new IntersectionObserver(entries=>{
      formVisible=entries.some(entry=>entry.isIntersecting);
      update();
    },{threshold:.15});
    forms.forEach(form=>observer.observe(form));
  }
  const update=()=>{
    if(window.innerWidth>680 || window.scrollY<420 || formVisible){bar.classList.remove('show');return;}
    bar.classList.add('show');
  };
  update();
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
}
document.addEventListener('DOMContentLoaded',()=>{setupDates();setupNav();setupWaLinks();setupBookingForms();setupCurrentNav();setupMobileWa()});
