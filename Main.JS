
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

 
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
   
    faqItems.forEach(i => i.classList.remove('open'));
  
    if (!isOpen) item.classList.add('open');
  });
});


const filterBtns = document.querySelectorAll('[data-filter]');
const campusCards = document.querySelectorAll('[data-campus]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;


    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

   
      if (filter === 'all' || card.dataset.campus === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });



const modalData = {
  potchefstroom: {
    tag: 'pchef',
    label: 'Potchefstroom',
    title: 'Potchefstroom Campus',
    description: 'The main and largest campus of North-West University, located in the vibrant university town of Potchefstroom in the North West Province. It hosts the majority of NWU\'s faculties and postgraduate programmes.',
    info: [
      { label: 'Students', value: '35 000+' },
      { label: 'Faculties', value: '9 Faculties' },
      { label: 'Location', value: 'Potchefstroom, NW' },
      { label: 'Switchboard', value: '018 299 1111' },
    ],
    extras: [
      '📚 Ferdinand Postma Library — one of the largest in SA',
      '🏋️ Oom Willie du Plessis Stadium — sport & recreation hub',
      '🏥 Campus health clinic and 24-hour security',
      '📶 Full campus Wi-Fi with library backup power',
      '🎓 Home to the Business School and Law Faculty',
    ],
  },
  mahikeng: {
    tag: 'mahik',
    label: 'Mahikeng',
    title: 'Mahikeng Campus',
    description: 'Located in Mahikeng, the capital city of the North West Province. This campus has a strong community focus and plays a key role in social development, healthcare training, and education for the region.',
    info: [
      { label: 'Students', value: '10 000+' },
      { label: 'Faculties', value: '4 Faculties' },
      { label: 'Location', value: 'Mahikeng, NW' },
      { label: 'Switchboard', value: '018 389 2000' },
    ],
    extras: [
      '🏥 Health Sciences and Education are flagship faculties',
      '📚 Main Campus Library with digital resources',
      '🌍 Strong ties to local schools and clinics',
      '📶 Campus Wi-Fi upgrade underway (2026)',
      '🎓 Degrees offered in Law, Commerce, Education & Health',
    ],
  },
  vanderbijlpark: {
    tag: 'vander',
    label: 'Vanderbijlpark',
    title: 'Vanderbijlpark Campus (Vaal)',
    description: 'Situated in Vanderbijlpark in the Vaal Triangle, this campus is known for its Engineering, Commerce, and Humanities programmes. It serves a large student population from Gauteng and surrounding areas.',
    info: [
      { label: 'Students', value: '14 000+' },
      { label: 'Faculties', value: '5 Faculties' },
      { label: 'Location', value: 'Vanderbijlpark, GP' },
      { label: 'Switchboard', value: '016 910 3000' },
    ],
    extras: [
      '⚙️ Engineering Faculty — strong industry partnerships',
      '📚 Vaal Campus Library with generator backup',
      '🏪 Close to Vaal Mall for student amenities',
      '🚌 Good public transport links to Johannesburg',
      '🎓 Programmes in Engineering, Commerce, Education & Arts',
    ],
  },
};

const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openModal(campus) {
  const data = modalData[campus];
  if (!data) return;

  const infoHTML = data.info.map(i => `
    <div class="modal-info-item">
      <strong>${i.label}</strong>
      <span>${i.value}</span>
    </div>
  `).join('');

  const extrasHTML = data.extras.map(e => `<li style="margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-muted);">${e}</li>`).join('');

  modalContent.innerHTML = `
    <span class="modal-campus-tag ${data.tag}">${data.label}</span>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <div class="modal-info-grid">${infoHTML}</div>
    <h4 style="margin-bottom:0.75rem;">Campus Highlights</h4>
    <ul style="list-style:none; padding:0;">${extrasHTML}</ul>
    <div style="margin-top:1.5rem;">
      <a href="pages/resources.html" class="btn btn-primary" style="text-decoration:none;">View Resources →</a>
    </div>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}


const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

const searchableContent = [
  { title: 'Potchefstroom Campus', desc: 'Main NWU campus, 35 000+ students, 9 faculties', action: () => openModal('potchefstroom') },
  { title: 'Mahikeng Campus', desc: 'Capital of NW Province, 10 000+ students, 4 faculties', action: () => openModal('mahikeng') },
  { title: 'Vanderbijlpark Campus', desc: 'Vaal Triangle campus, 14 000+ students, 5 faculties', action: () => openModal('vanderbijlpark') },
  { title: 'eFundi Learning Platform', desc: 'Access course materials and assignments', action: () => window.open('https://efundi.nwu.ac.za', '_blank') },
  { title: 'NWU Library', desc: 'Online journals, e-books, past papers', action: () => window.open('https://library.nwu.ac.za', '_blank') },
  { title: 'NSFAS Financial Aid', desc: 'National Student Financial Aid Scheme applications', action: () => window.open('https://www.nsfas.org.za', '_blank') },
  { title: 'Mental Health Support', desc: 'Student counselling on all campuses', action: () => window.location.href = 'pages/wellbeing.html' },
  { title: 'Load-Shedding Guide', desc: 'Study spots and Wi-Fi zones during outages', action: () => window.location.href = 'pages/wellbeing.html#loadshedding' },
  { title: 'Emergency Contacts', desc: 'Campus security, medical, crisis lines', action: () => window.location.href = 'pages/contact.html' },
  { title: 'Accommodation / Housing', desc: 'Residence applications and off-campus housing', action: () => window.location.href = 'pages/resources.html#housing' },
  { title: 'Financial Aid Office', desc: 'Bursaries, NSFAS, fees queries', action: () => window.location.href = 'pages/resources.html#finance' },
  { title: 'Academic Resources', desc: 'Library, eFundi, tutoring, writing centre', action: () => window.location.href = 'pages/resources.html#academic' },
  { title: 'Campus Wi-Fi', desc: 'Connect to NWU-WiFi using student credentials', action: () => window.location.href = 'pages/resources.html' },
  { title: 'SADAG Crisis Line', desc: '0800 456 789 — free 24/7 mental health support', action: () => window.location.href = 'pages/wellbeing.html' },
  { title: 'Send Feedback', desc: 'Contact form for suggestions and errors', action: () => window.location.href = 'pages/contact.html' },
];

function doSearch(query) {
  if (!query.trim()) {
    searchResults.classList.add('hidden');
    return;
  }

  const q = query.toLowerCase();
  const matches = searchableContent.filter(item =>
    item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = '<p style="color:var(--text-muted); font-size:0.9rem;">No results found. Try a different keyword.</p>';
  } else {
    searchResults.innerHTML = matches.map((m, i) => `
      <div class="search-result-item" data-index="${i}">
        <strong>${m.title}</strong>
        <span>${m.desc}</span>
      </div>
    `).join('');

    searchResults.querySelectorAll('.search-result-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        matches[i].action();
        searchResults.classList.add('hidden');
        searchInput.value = '';
      });
    });
  }

  searchResults.classList.remove('hidden');
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => doSearch(searchInput.value));
}
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch(searchInput.value);
  });
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') searchResults.classList.add('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap') && !e.target.closest('.search-results')) {
      if (searchResults) searchResults.classList.add('hidden');
    }
  });
}


const ticker = document.getElementById('tickerContent');
if (ticker) {
  ticker.innerHTML += ticker.innerHTML; // duplicate for seamless loop
}