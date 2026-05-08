const ctTabs = document.querySelectorAll('.ct-tab');
const ctPanels = document.querySelectorAll('.ct-panel');
ctTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.ctab;

    ctTabs.forEach(t => t.classList.remove('active'));
    ctPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById(`ct-${target}`);
    if (panel) panel.classList.add('active');
  });
});
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
if (messageInput && charCount) {
  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
    charCount.style.color = messageInput.value.length > 900 ? '#e85555' : 'var(--text-muted)';
  });
}
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const fields = {
  fullName: {
    el: document.getElementById('fullName'),
    errEl: document.getElementById('nameError'),
    validate(v) {
      if (!v.trim()) return 'Full name is required.';
      if (v.trim().length < 3) return 'Please enter your full name (at least 3 characters).';
      if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return 'Name can only contain letters, spaces, and hyphens.';
      return '';
    }
  },
  studentNum: {
    el: document.getElementById('studentNum'),
    errEl: document.getElementById('numError'),
    validate(v) {
      if (!v.trim()) return 'Student number is required.';
      if (!/^\d{8}$/.test(v.trim())) return 'Student number must be exactly 8 digits.';
      return '';
    }
  },
  email: {
    el: document.getElementById('email'),
    errEl: document.getElementById('emailError'),
    validate(v) {
      if (!v.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address.';
      if (!v.includes('nwu.ac.za')) return 'Please use your NWU student email (@student.nwu.ac.za).';
      return '';
    }
  },
  campus: {
    el: document.getElementById('campus'),
    errEl: document.getElementById('campusError'),
    validate(v) {
      if (!v) return 'Please select your campus.';
      return '';
    }
  },
  category: {
    el: document.getElementById('category'),
    errEl: document.getElementById('catError'),
    validate(v) {
      if (!v) return 'Please select a category.';
      return '';
    }
  },
  message: {
    el: document.getElementById('message'),
    errEl: document.getElementById('msgError'),
    validate(v) {
      if (!v.trim()) return 'Please enter a message.';
      if (v.trim().length < 20) return 'Message must be at least 20 characters.';
      if (v.length > 1000) return 'Message cannot exceed 1000 characters.';
      return '';
    }
  }
};


Object.values(fields).forEach(field => {
  if (!field.el) return;
  field.el.addEventListener('blur', () => {
    const err = field.validate(field.el.value);
    showFieldError(field, err);
  });
  
  field.el.addEventListener('input', () => {
    if (field.el.classList.contains('error')) {
      const err = field.validate(field.el.value);
      showFieldError(field, err);
    }
  });
});

function showFieldError(field, errMsg) {
  if (!field.el || !field.errEl) return;
  field.errEl.textContent = errMsg;
  if (errMsg) {
    field.el.classList.add('error');
  } else {
    field.el.classList.remove('error');
  }
}

function validateAll() {
  let valid = true;
  Object.values(fields).forEach(field => {
    if (!field.el) return;
    const err = field.validate(field.el.value);
    showFieldError(field, err);
    if (err) valid = false;
  });
  return valid;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateAll()) {
     
      const firstError = form.querySelector('.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      successMsg.classList.remove('hidden');
      form.reset();
      if (charCount) charCount.textContent = '0';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Feedback';
      
      Object.values(fields).forEach(f => {
        if (f.el) f.el.classList.remove('error');
        if (f.errEl) f.errEl.textContent = '';
      });
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
  });
}