

(function () {
  const slideshow   = document.getElementById('slideshow');
  if (!slideshow) return;

  const allSlides   = Array.from(slideshow.querySelectorAll('.slide'));
  const dotsWrap    = document.getElementById('slideDots');
  const prevBtn     = document.getElementById('slidePrev');
  const nextBtn     = document.getElementById('slideNext');
  const campusTabs  = document.querySelectorAll('.slide-tab');

  let visibleSlides = [...allSlides];
  let current       = 0;
  let timer         = null;
  const INTERVAL    = 4500;

 
  function buildDots() {
    dotsWrap.innerHTML = '';
    visibleSlides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'slide-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Go to slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.slide-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    visibleSlides[current].classList.remove('active');
    current = (index + visibleSlides.length) % visibleSlides.length;
    visibleSlides[current].classList.add('active');
    updateDots();
    resetTimer();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    timer = setInterval(next, INTERVAL);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  
  campusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.slideCampus;

      campusTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      
      allSlides.forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });

     
      if (filter === 'all') {
        visibleSlides = [...allSlides];
      } else {
        visibleSlides = allSlides.filter(s => s.dataset.campus === filter);
      }

      visibleSlides.forEach(s => { s.style.display = ''; });
      current = 0;
      visibleSlides[0].classList.add('active');
      buildDots();
      resetTimer();
    });
  });

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  
  let touchStartX = 0;
  slideshow.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slideshow.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  });


  buildDots();
  startTimer();
})();