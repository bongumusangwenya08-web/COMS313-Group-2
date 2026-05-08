/* ===========================
   RESOURCES PAGE JS
   JS Feature: Dual filter (category + campus)
   =========================== */

let activeCat = 'all';
let activeCampus = 'all';

const catBtns = document.querySelectorAll('[data-cat]');
const campusBtns = document.querySelectorAll('[data-campus-filter]');
const resourceCards = document.querySelectorAll('.resource-card');

function applyFilters() {
  resourceCards.forEach(card => {
    const cardCat = card.dataset.cat;
    const cardCampus = card.dataset.campus;

    const catMatch = activeCat === 'all' || cardCat === activeCat;
    const campusMatch = activeCampus === 'all' || cardCampus === 'all' || cardCampus === activeCampus;

    if (catMatch && campusMatch) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeUp 0.35s ease both';
    } else {
      card.classList.add('hidden');
    }
  });

  // Show empty state if nothing visible
  const visible = document.querySelectorAll('.resource-card:not(.hidden)');
  const grid = document.getElementById('resourceGrid');
  let emptyMsg = document.getElementById('emptyMsg');

  if (visible.length === 0) {
    if (!emptyMsg) {
      emptyMsg = document.createElement('p');
      emptyMsg.id = 'emptyMsg';
      emptyMsg.style.cssText = 'color:var(--text-muted); text-align:center; grid-column:1/-1; padding:2rem; font-size:0.95rem;';
      emptyMsg.textContent = 'No resources found for this combination. Try adjusting your filters.';
      grid.appendChild(emptyMsg);
    }
  } else {
    if (emptyMsg) emptyMsg.remove();
  }
}

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    applyFilters();
  });
});

campusBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    campusBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCampus = btn.dataset.campusFilter;
    applyFilters();
  });
});

// Handle anchor links (e.g. resources.html#finance)
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const catMap = { finance: 'finance', housing: 'housing', academic: 'academic' };
    if (catMap[hash]) {
      const btn = document.querySelector(`[data-cat="${catMap[hash]}"]`);
      if (btn) {
        btn.click();
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    }
  }
});