// Mobil menü
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Menü linkine tıklayınca kapansın
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Scroll'da header gölgesi
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Form gönderimi → WhatsApp'a yönlendir
function submitForm(e) {
  e.preventDefault();
  const waNumber = '905451332859';
  const form = e.target;

  const fields = [];
  form.querySelectorAll('input, select, textarea').forEach(el => {
    let label = el.placeholder || el.name || '';
    if (!label && el.tagName === 'SELECT' && el.options[0] && !el.options[0].value) {
      label = el.options[0].text;
    }
    const value = (el.value || '').trim();
    if (value) fields.push(`${label}: ${value}`);
  });

  const message =
    'Merhaba, gaziantepapartmantemizligi.com üzerinden teklif almak istiyorum.\n\n' +
    fields.join('\n');

  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  if (typeof gtag === 'function') {
    const telInput = form.querySelector('input[type="tel"]');
    const rawPhone = telInput ? (telInput.value || '').replace(/\D/g, '') : '';
    let phoneE164 = '';
    if (rawPhone) {
      if (rawPhone.startsWith('90') && rawPhone.length === 12) phoneE164 = '+' + rawPhone;
      else if (rawPhone.startsWith('0') && rawPhone.length === 11) phoneE164 = '+9' + rawPhone;
      else if (rawPhone.length === 10) phoneE164 = '+90' + rawPhone;
      else phoneE164 = '+' + rawPhone;
    }
    if (phoneE164) {
      gtag('set', 'user_data', { phone_number: phoneE164 });
    }
    gtag('event', 'conversion', {
      'send_to': 'AW-18098874554/gdk-CLzprq4cELrRm7ZD',
      'value': 50.0,
      'currency': 'TRY',
      'event_callback': function () { window.location.href = url; }
    });
    setTimeout(function () { window.location.href = url; }, 1500);
  } else {
    window.location.href = url;
  }
  return false;
}

// Kayan giriş animasyonu
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .region-card, .why-card, .testimonial, .feature').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
