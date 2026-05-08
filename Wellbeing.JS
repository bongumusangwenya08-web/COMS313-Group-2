/* ===========================
   WELLBEING PAGE JS
   JS Feature 1: Mood check-in with dynamic response
   JS Feature 2: Load-shedding tabbed content
   JS Feature 3: Contact tabs (contact directory)
   =========================== */

// ===== MOOD CHECK-IN =====
const moodMessages = {
  great: {
    cls: 'great',
    text: '😊 That\'s wonderful to hear! Keep up the great energy. Remember to take care of your physical health too — stay hydrated, sleep well, and enjoy time with friends. You\'ve got this!'
  },
  okay: {
    cls: 'okay',
    text: '😐 It\'s okay not to feel amazing every day. Make sure you\'re getting enough sleep, eating properly, and taking short breaks during study. If you need a boost, try a walk around campus or a chat with a friend.'
  },
  stressed: {
    cls: 'stressed',
    text: '😰 Stress is common during the semester — you\'re not alone. Try breaking your workload into smaller tasks. Remember: the campus counselling service is free and confidential. Also check our <strong>Load-Shedding Guide</strong> below for powered study spots. You can do this.'
  },
  struggling: {
    cls: 'struggling',
    text: '😔 Thank you for being honest with yourself. Please reach out — Student Counselling is free, confidential, and available on all campuses. You don\'t have to face this alone. Scroll down for campus counselling contacts, or call <strong>SADAG: 0800 456 789</strong> (free, 24/7).'
  },
  crisis: {
    cls: 'crisis',
    text: '🆘 <strong>Please reach out right now.</strong> You matter and help is available:<br><br>📞 <strong>SADAG:</strong> 0800 456 789 (free, 24/7)<br>📞 <strong>Suicide Crisis Line:</strong> 0800 567 567<br>📞 <strong>Lifeline SA:</strong> 086 132 2322<br>📞 <strong>Emergency Services:</strong> 112<br><br>If you are in immediate danger, please call <strong>112</strong> or go to your nearest emergency room.'
  }
};

const moodBtns = document.querySelectorAll('.mood-btn');
const moodResponse = document.getElementById('moodResponse');

moodBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.dataset.mood;
    const data = moodMessages[mood];

    // Update button states
    moodBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // Show response
    moodResponse.className = `mood-response ${data.cls}`;
    moodResponse.innerHTML = data.text;
    moodResponse.classList.remove('hidden');

    // Scroll response into view
    setTimeout(() => {
      moodResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  });
});

// ===== LOAD SHEDDING TABS =====
const lsTabs = document.querySelectorAll('.ls-tab');
const lsPanels = document.querySelectorAll('.ls-panel');

lsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    lsTabs.forEach(t => t.classList.remove('active'));
    lsPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById(`ls-${target}`);
    if (panel) panel.classList.add('active');
  });
});

// Handle anchor link to loadshedding section
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#loadshedding') {
    setTimeout(() => {
      const el = document.getElementById('loadshedding');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
});

