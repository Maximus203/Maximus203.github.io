const overlay = document.querySelector('.chat-overlay');
const panel = document.querySelector('.chat-panel');
const messages = document.querySelector('.messages');
const form = document.querySelector('.chat-form');
const input = form?.querySelector('input');
const motion = window.gsap;
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

const answers = [
  {
    keys: ['qui', 'profil', 'cherif'],
    text: 'Cherif Diouf est ingénieur Full-Stack et formateur. Depuis Dakar, il conçoit des systèmes utiles, robustes et adaptés aux réalités du terrain, avec une ouverture au remote.',
  },
  {
    keys: ['projet', 'réalisation', 'application'],
    text: 'Ses projets couvrent SAP Commercial, Artist Digital (CRM et gestion commerciale), le Homelab IA, Ndougalma, Murabbi, Nanobrowser Bridge, Momentum et une bibliothèque de 80 skills IA.',
  },
  {
    keys: ['ia', 'intelligence', 'automatisation'],
    text: 'Il orchestre l’IA autour du contexte, du RAG, des bases de connaissances, des agents, de n8n et d’une validation humaine. Le but est de livrer des automatisations compréhensibles et maintenables.',
  },
  {
    keys: ['compétence', 'technologie', 'stack'],
    text: 'Sa stack combine JavaScript, React, PHP, Laravel, Node.js, Express, FastAPI, Python, SQL, MySQL, PostgreSQL, MongoDB, Linux, Git, Docker, n8n et OpenRouter.',
  },
  {
    keys: ['expérience', 'parcours', 'orange', 'fideca', 'terangadev', 'integratop'],
    text: 'Son parcours relie l’intégration de services chez Integratop IT, le support performance et la sécurisation des opérations chez Orange-Sonatel, l’ingénierie Full-Stack et le SI chez FIDECA, puis le pilotage digital chez TérangaDev.',
  },
  {
    keys: ['formation', 'étude', 'doctorat', 'master'],
    text: 'Il prépare un Doctorat en Sciences Techniques et Numériques à l’UN-CHK. Il est titulaire d’un Master en Génie Logiciel et Administration Réseaux, mention Très bien avec félicitations du jury, et d’une Licence Réseaux Télécoms.',
  },
  {
    keys: ['contact', 'recrut', 'collabor'],
    text: 'Pour discuter d’un projet, consultez son profil public ou son adresse professionnelle. Il est ouvert aux collaborations pertinentes et au remote.',
  },
];

function answer(question) {
  const normalized = question.toLowerCase();
  const match = answers.find((item) => item.keys.some((key) => normalized.includes(key)));
  return match?.text ?? 'Je peux vous renseigner sur son parcours, ses projets, ses compétences en IA, sa stack ou une éventuelle collaboration. Essayez une question plus précise.';
}

function addMessage(text, type) {
  const node = document.createElement('div');
  node.className = `message ${type}`;

  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.textContent = type === 'user' ? 'VOUS' : 'C.';

  const body = document.createElement('div');
  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  if (type === 'user') {
    body.append(paragraph);
    node.append(body, avatar);
  } else {
    const label = document.createElement('small');
    label.textContent = 'CHERIF.AI';
    body.append(label, paragraph);
    node.append(avatar, body);
  }

  messages.append(node);
  messages.scrollTop = messages.scrollHeight;
}

function openChat() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  if (motion && !reduceMotion) {
    motion.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    motion.to(panel, { y: 0, duration: 0.5, ease: 'power3.out' });
  }
  window.setTimeout(() => input?.focus(), reduceMotion ? 0 : 300);
}

function closeChat() {
  const finish = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  };

  if (motion && !reduceMotion) {
    motion.to(panel, { y: 30, duration: 0.25, ease: 'power2.in' });
    motion.to(overlay, { opacity: 0, duration: 0.25, onComplete: finish });
  } else {
    finish();
  }
}

document.querySelectorAll('.open-chat').forEach((button) => button.addEventListener('click', openChat));
document.querySelector('.close-chat')?.addEventListener('click', closeChat);
overlay?.addEventListener('click', (event) => { if (event.target === overlay) closeChat(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && overlay?.classList.contains('is-open')) closeChat(); });
document.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => { input.value = button.dataset.question; form.requestSubmit(); }));
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  input.value = '';
  window.setTimeout(() => addMessage(answer(question), 'assistant'), reduceMotion ? 0 : 420);
});

if (motion && !reduceMotion) {
  motion.from('.site-header > *, .hero-copy > *, .hero-visual > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
  motion.to('.orb-a', { x: 35, y: 20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  motion.to('.orb-b', { x: -25, y: -30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  motion.to('.orbit-one', { rotation: 360, duration: 18, repeat: -1, ease: 'none' });
  motion.to('.orbit-two', { rotation: -360, duration: 25, repeat: -1, ease: 'none' });
  motion.to('.lab-orbit', { rotation: 2, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}

document.querySelector('.theme-button')?.addEventListener('click', () => document.body.classList.toggle('soft-mode'));
