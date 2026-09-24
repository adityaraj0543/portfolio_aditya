// ===== Theme toggle =====
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeText = document.querySelector('.theme-text');
const themeIcon = document.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light-theme');
}

const applyThemeLabel = () => {
  if (!themeText || !themeIcon) return;
  const isLight = body.classList.contains('light-theme');
  themeText.textContent = isLight ? 'NIGHT MODE' : 'DAY MODE';
  themeIcon.textContent = isLight ? '🌙' : '☀️';
};

applyThemeLabel();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    applyThemeLabel();
  });
}

// ===== Live clock =====
const liveClock = document.getElementById('liveClock');
function updateClock() {
  if (!liveClock) return;
  const now = new Date();
  const dateText = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeText = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  liveClock.textContent = `${dateText} • ${timeText}`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== Scrollspy =====
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(sec => observer.observe(sec));

// ===== Orbit skill chips =====
const orbitData = [
  { name: 'React', r: 1, angle: 200 },
  { name: 'TypeScript', r: 1, angle: 235 },
  { name: 'JavaScript', r: 1, angle: 165 },
  { name: 'HTML', r: 0.62, angle: 195 },
  { name: 'CSS', r: 0.62, angle: 140 },
  { name: 'Git', r: 1, angle: 300 },
  { name: 'SQL', r: 0.62, angle: 265 },
  { name: 'PostgreSQL', r: 0.62, angle: 315 },
  { name: 'MongoDB', r: 1, angle: 40 },
  { name: 'Node.js', r: 0.62, angle: 355 },
  { name: 'Java', r: 1, angle: 60 },
  { name: 'Spring Boot', r: 0.85, angle: 20 },
  { name: 'GitHub', r: 1, angle: 340 },
  { name: 'Vercel', r: 1, angle: 155 },
  { name: 'Render', r: 1, angle: 75 },
];

const orbitWrap = document.getElementById('orbitItems');
if (orbitWrap) {
  const outerR = 320;
  orbitData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'orbit-chip';
    el.textContent = item.name;
    const rad = (item.angle * Math.PI) / 180;
    const radius = outerR * item.r;
    const x = 50 + (Math.cos(rad) * radius) / 6.4;
    const y = 50 + (Math.sin(rad) * radius) / 6.4;
    el.style.left = x + '%';
    el.style.top = y + '%';
    el.style.animation = `chipFloat ${5 + (i % 4)}s ease-in-out infinite`;
    el.style.animationDelay = (i * 0.2) + 's';
    orbitWrap.appendChild(el);
  });
}

const hero = document.querySelector('.hero');
const heroRight = document.querySelector('.hero-right');
const codePanel = document.querySelector('.code-panel');
if (hero && heroRight && codePanel) {
  const updateHeroMotion = (event) => {
    const rect = hero.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    document.documentElement.style.setProperty('--pointer-x', px.toFixed(3));
    document.documentElement.style.setProperty('--pointer-y', py.toFixed(3));

    const rotateY = (px * 2) * 26;
    const rotateX = (0.5 - py * 2) * 22;

    codePanel.style.setProperty('--panel-rotate-x', `${12 + rotateX}deg`);
    codePanel.style.setProperty('--panel-rotate-y', `${-18 + rotateY}deg`);
  };

  hero.addEventListener('pointermove', updateHeroMotion);
  hero.addEventListener('pointerleave', () => {
    document.documentElement.style.setProperty('--pointer-x', '0');
    document.documentElement.style.setProperty('--pointer-y', '0');
    codePanel.style.setProperty('--panel-rotate-x', '12deg');
    codePanel.style.setProperty('--panel-rotate-y', '-18deg');
  });
}

// keyframes for chip float, injected once
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes chipFloat{0%,100%{transform:translate(-50%,-50%) translateY(0) rotateX(0deg) rotateY(0deg);}50%{transform:translate(-50%,-50%) translateY(-8px) rotateX(7deg) rotateY(-10deg);}}`;
document.head.appendChild(styleTag);
