/* Gaziantep Ege Temizlik — etkileşim betikleri */

// ---- İletişim bilgileri ----
const WA_NUMBER = '905320630389';
// Yeni Google Ads dönüşüm etiketi buraya yazılacak (ör. 'AW-XXXXXXXXX/abcDEF...').
// Boş bırakılırsa dönüşüm gönderilmez, sadece WhatsApp'a yönlendirilir.
const ADS_CONVERSION_SEND_TO = '';

// ---- Mobil menü ----
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ---- Scroll'da header gölgesi ----
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ---- SSS akordeonu ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.toggle('open');
    answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : null;
  });
});

// ---- Form gönderimi → WhatsApp'a yönlendir ----
function submitForm(e) {
  e.preventDefault();
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

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  if (typeof gtag === 'function' && ADS_CONVERSION_SEND_TO) {
    const telInput = form.querySelector('input[type="tel"]');
    const rawPhone = telInput ? (telInput.value || '').replace(/\D/g, '') : '';
    let phoneE164 = '';
    if (rawPhone) {
      if (rawPhone.startsWith('90') && rawPhone.length === 12) phoneE164 = '+' + rawPhone;
      else if (rawPhone.startsWith('0') && rawPhone.length === 11) phoneE164 = '+9' + rawPhone;
      else if (rawPhone.length === 10) phoneE164 = '+90' + rawPhone;
      else phoneE164 = '+' + rawPhone;
    }
    if (phoneE164) gtag('set', 'user_data', { phone_number: phoneE164 });

    gtag('event', 'conversion', {
      'send_to': ADS_CONVERSION_SEND_TO,
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

// ---- Kayan giriş animasyonu ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
