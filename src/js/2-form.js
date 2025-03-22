const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

let formData = { email: '', message: '' };

const loadFormData = () => {
  try {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      formData = JSON.parse(storedData);
      emailInput.value = formData.email || '';
      messageInput.value = formData.message || '';
    }
  } catch (error) {
    console.error('Error loading form data from localStorage:', error);
  }
};

const saveFormData = () => {
  localStorage.setItem(storageKey, JSON.stringify(formData));
};

loadFormData();

feedbackForm.addEventListener('input', (event) => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveFormData();
});

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form Data:', formData);
  localStorage.removeItem(storageKey);
  formData = { email: '', message: '' };
  feedbackForm.reset();
});