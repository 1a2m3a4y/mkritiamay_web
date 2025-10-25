// script.js
// - set current year in footer
// - mobile nav toggle
// - simple lightbox for brochure/gallery images
// - optional placeholders for inserting brochure text

document.addEventListener('DOMContentLoaded', function () {
  // 1) Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Mobile nav toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');
  let open = false;

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      open = !open;
      if (open) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.right = '18px';
        nav.style.top = '68px';
        nav.style.background = '#fff';
        nav.style.padding = '12px';
        nav.style.borderRadius = '8px';
        nav.style.boxShadow = '0 6px 20px rgba(16,24,40,0.08)';
      } else {
        nav.style.display = '';
        nav.style.position = '';
        nav.style.right = '';
        nav.style.top = '';
        nav.style.background = '';
        nav.style.padding = '';
        nav.style.borderRadius = '';
        nav.style.boxShadow = '';
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) {
        nav.style.display = '';
        nav.style.position = '';
        nav.style.right = '';
        nav.style.top = '';
        nav.style.background = '';
        nav.style.padding = '';
        nav.style.borderRadius = '';
        nav.style.boxShadow = '';
        open = false;
      } else if (!open) {
        nav.style.display = '';
      }
    });
  }

  // 3) Lightbox for brochure / gallery images
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.display = 'none';
  lightbox.style.alignItems = 'center';
  lightbox.style.justifyContent = 'center';
  lightbox.innerHTML = '<img src=\"\" alt=\"Preview\" /><button id=\"lb-close\" aria-label=\"Close\" style=\"position:absolute;top:20px;right:24px;background:transparent;border:none;color:#fff;font-size:28px;cursor:pointer;\">×</button>';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = document.getElementById('lb-close');

  // include hero-image so the big preview opens in lightbox too
  const clickableImages = Array.from(document.querySelectorAll('.brochure-img, .gallery img, .hero-media img, .hero-image'));
  clickableImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      const src = img.getAttribute('src');
      if (!src) return;
      lbImg.setAttribute('src', src);
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target === lbClose) {
      lightbox.style.display = 'none';
      lbImg.setAttribute('src', '');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
      lbImg.setAttribute('src', '');
    }
  });

  // 4) Optional: autopopulate placeholders
  // Uncomment and update below to auto-fill brochure captions if you want
  // const img1TextEl = document.getElementById('img1-text');
  // const img2TextEl = document.getElementById('img2-text');
  // if (img1TextEl) img1TextEl.textContent = "Key features from page 1: ...";
  // if (img2TextEl) img2TextEl.textContent = "Key features from page 2: ...";
});
