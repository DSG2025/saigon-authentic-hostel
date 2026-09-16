(() => {
  const PHONE = '84971978439';
  const dialog = document.getElementById('bookingDialog');
  const form = document.getElementById('bookingForm');
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  const guests = document.getElementById('guests');
  const interest = document.getElementById('interest');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const iso = d => d.toISOString().split('T')[0];
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today); dayAfter.setDate(dayAfter.getDate() + 2);
  checkin.min = iso(today);
  checkout.min = iso(tomorrow);
  checkin.value = iso(tomorrow);
  checkout.value = iso(dayAfter);

  const prettyDate = value => {
    if (!value) return '';
    return new Intl.DateTimeFormat('en', { day:'numeric', month:'short', year:'numeric' }).format(new Date(value + 'T12:00:00'));
  };

  function openBooking(selectedInterest){
    if (selectedInterest && [...interest.options].some(o => o.value === selectedInterest)) interest.value = selectedInterest;
    dialog.showModal();
  }

  document.querySelectorAll('.js-open-booking').forEach(btn => btn.addEventListener('click', () => openBooking(btn.dataset.interest)));

  checkin.addEventListener('change', () => {
    if (!checkin.value) return;
    const next = new Date(checkin.value + 'T12:00:00'); next.setDate(next.getDate() + 1);
    checkout.min = iso(next);
    if (!checkout.value || checkout.value <= checkin.value) checkout.value = iso(next);
  });

  document.getElementById('continueWhatsApp').addEventListener('click', () => {
    if (!checkin.value || !checkout.value) { form.reportValidity(); return; }
    const msg = `Hi Saigon Authentic 👋\nI'd like to check availability and rates.\n\nCheck-in: ${prettyDate(checkin.value)}\nCheck-out: ${prettyDate(checkout.value)}\nGuests: ${guests.value}\nInterested in: ${interest.value}\n\nCould you show me the available options and rates?`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }));
  document.getElementById('year').textContent = new Date().getFullYear();
})();