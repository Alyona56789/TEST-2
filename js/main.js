const ctaArea = document.querySelector('.cta-area');
if (ctaArea) {
  const setK = () => {
    ctaArea.style.setProperty('--k', Math.min(1, ctaArea.clientWidth / 1199));
  };
  setK();
  window.addEventListener('resize', setK);
}

const cardsBox = document.getElementById('cards');
if (cardsBox) {
  const setKc = () => {
    const w = cardsBox.clientWidth;
    const k = Math.max(0.55, Math.min(1, w / 1200));
    cardsBox.style.setProperty('--k', k);
  };
  setKc();
  window.addEventListener('resize', setKc);
}

const formMobile = document.getElementById('lead-form-mobile');
if (formMobile) {
  formMobile.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    formMobile.querySelectorAll('input[required]').forEach((input) => {
      input.classList.toggle('error', !input.value.trim());
      if (!input.value.trim()) ok = false;
    });

    const consentMobile = formMobile.querySelector('input[type="checkbox"]');
    if (!consentMobile.checked) {
      alert('Необходимо согласие на обработку персональных данных');
      return;
    }
    if (!ok) return;

    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    formMobile.reset();
  });
}

(function () {
  const cta = document.querySelector('.cta-mobile');
  if (!cta) return;

  const parent  = cta.parentElement;
  const hasZoom = window.CSS && CSS.supports('zoom', '1');

  const fit = () => {
    const cs = getComputedStyle(parent);
    const avail = parent.clientWidth
      - parseFloat(cs.paddingLeft  || 0)
      - parseFloat(cs.paddingRight || 0);   
    const k = Math.min(1, avail / 350);

    if (hasZoom) {
      cta.style.zoom = k;
    } else {
      cta.style.transform       = 'scale(' + k + ')';
      cta.style.transformOrigin = 'top center';
      cta.style.marginLeft      = 'calc(50% - 175px)';
      cta.style.marginBottom    = (-789 * (1 - k)) + 'px';
    }
  };

  fit();
  window.addEventListener('resize', fit);
})();


const phone = document.getElementById('phone');

phone.addEventListener('input', () => {
  let digits = phone.value.replace(/\D/g, '');
  if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  let result = '+7';
  if (digits.length) result += ' (' + digits.slice(0, 3);
  if (digits.length >= 4) result += ') ' + digits.slice(3, 6);
  if (digits.length >= 7) result += '-' + digits.slice(6, 8);
  if (digits.length >= 9) result += '-' + digits.slice(8, 10);

  phone.value = digits.length ? result : '';
});

const form = document.getElementById('lead-form');
const consent = document.getElementById('consent');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;

  form.querySelectorAll('input[required]').forEach((input) => {
    input.classList.toggle('error', !input.value.trim());
    if (!input.value.trim()) ok = false;
  });

  if (!consent.checked) {
    alert('Необходимо согласие на обработку персональных данных');
    return;
  }
  if (!ok) return;

  alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  form.reset();
});

const cards = document.getElementById('cards');

cards.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    cards.scrollLeft += e.deltaY;
  }
}, { passive: false });

let isDown = false, startX = 0, startScroll = 0;

cards.addEventListener('pointerdown', (e) => {
  isDown = true;
  startX = e.clientX;
  startScroll = cards.scrollLeft;
  cards.classList.add('dragging');
});
window.addEventListener('pointermove', (e) => {
  if (!isDown) return;
  cards.scrollLeft = startScroll - (e.clientX - startX);
});
window.addEventListener('pointerup', () => {
  isDown = false;
  cards.classList.remove('dragging');
});


const SPECIALIST_PHOTO = 'images/form/specialist.png';

document.querySelectorAll('.cta-photo, .cta-mobile-photo').forEach((img) => {
  img.src = SPECIALIST_PHOTO;
  img.addEventListener('error', () => img.classList.add('is-missing'), { once: true });
});