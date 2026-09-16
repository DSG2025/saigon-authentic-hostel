const WHATSAPP_NUMBER = '84971978439';
function waLink(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
function todayISO(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().split('T')[0]}
function setupDates(){document.querySelectorAll('input[type=date]').forEach(el=>{if(!el.min) el.min=todayISO()})}
function setupNav(){const nav=document.querySelector('.nav');const toggle=document.querySelector('.mobile-toggle');if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'))}}
function setupWaLinks(){document.querySelectorAll('[data-wa-message]').forEach(a=>{a.href=waLink(a.dataset.waMessage)})}
function setupBookingForms(){document.querySelectorAll('[data-booking-form]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();const checkin=form.querySelector('[name=checkin]')?.value||'Not sure yet';const checkout=form.querySelector('[name=checkout]')?.value||'Not sure yet';const guests=form.querySelector('[name=guests]')?.value||'1';const room=form.dataset.room||'available room options';const msg=`Hi Saigon Authentic 👋\nI'd like to check ${room}.\n\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${guests}\n\nCould you send me the available options and rates?`;window.open(waLink(msg),'_blank','noopener')})})}
document.addEventListener('DOMContentLoaded',()=>{setupDates();setupNav();setupWaLinks();setupBookingForms()});
