const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const filterButtons = document.querySelectorAll('.filter-btn');
const photoCards = [...document.querySelectorAll('.photo-card')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let visiblePhotos = [...photoCards];
let currentIndex = 0;

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    photoCards.forEach(card => {
      card.hidden = filter !== 'todas' && card.dataset.category !== filter;
    });
    visiblePhotos = photoCards.filter(card => !card.hidden);
  });
});

function showPhoto(index) {
  if (!visiblePhotos.length) return;
  currentIndex = (index + visiblePhotos.length) % visiblePhotos.length;
  const card = visiblePhotos[currentIndex];
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector('img').alt;
  lightboxCaption.textContent = card.dataset.title;
  if (!lightbox.open) lightbox.showModal();
}
photoCards.forEach(card => {
  card.addEventListener('click', () => showPhoto(visiblePhotos.indexOf(card)));
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
document.getElementById('prevPhoto').addEventListener('click', () => showPhoto(currentIndex - 1));
document.getElementById('nextPhoto').addEventListener('click', () => showPhoto(currentIndex + 1));
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
document.addEventListener('keydown', event => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
  if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
});
