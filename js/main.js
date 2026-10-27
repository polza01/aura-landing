// Мобільне меню
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  });
});

// Фільтрація каталогу
const filterButtons = document.querySelectorAll('.filter-pill');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    productCards.forEach((card) => {
      card.classList.toggle(
        'hidden',
        filter !== 'all' && card.dataset.category !== filter
      );
    });
  });
});

// Демонстраційне повідомлення для справжніх кнопок дії.
// Посилання-стрілки в картках ведуть до історій ароматів, тому їхній перехід
// не потрібно перехоплювати й показувати повідомлення про товар.
let toastTimer;
function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

document.querySelectorAll('.add-button').forEach((element) => {
  element.addEventListener('click', () => {
    if (element.tagName === 'A') return;

    const productName = element.dataset.product || 'Обраний аромат';
    showToast(
      `«${productName}» — концептуальна картка аромату. Для реальної покупки перевірте інформацію на сайті бренду.`
    );
  });
});

// Демонстраційна форма підписки: дані нікуди не надсилаються.
document.querySelector('#newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('.form-message');
  if (message) {
    message.textContent = 'Дякуємо! Це демонстраційна форма — підписку не оформлено.';
  }
  event.target.reset();
});
