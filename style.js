/* ─────────────────────────────────────────────
   Script block 1
   ───────────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('.form-input');
  const name    = inputs[0].value.trim();
  const email   = inputs[1].value.trim();
  const message = e.target.querySelector('.form-textarea').value.trim();

  const subject = encodeURIComponent('Portfolio Contact from ' + name);
  const body    = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    message
  );

  window.open(
    'https://mail.google.com/mail/?view=cm&to=vanshrana22042004@gmail.com&su=' + subject + '&body=' + body,
    '_blank'
  );

  // Show success message and reset form
  document.getElementById('formMsg').style.display = 'block';
  e.target.reset();
  setTimeout(() => { document.getElementById('formMsg').style.display = 'none'; }, 5000);
}

/* ─────────────────────────────────────────────
   Script block 2
   ───────────────────────────────────────────── */
/* ── STAR / NETWORK BACKGROUND ─────────────────────────── */
(() => {
  const canvas = document.getElementById('spaceBackground');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0, height = 0;

  const settings = {
    density: 0.00010,
    maxStars: 150,
    connectionDistance: 125,
    lineOpacity: 0.13
  };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
      settings.maxStars,
      Math.max(70, Math.floor(width * height * settings.density))
    );

    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() < 0.84 ? Math.random() * 1.15 + 0.35 : Math.random() * 1.7 + 0.8,
      a: Math.random() * 0.65 + 0.25,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.018 + 0.006,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Slowly move every particle continuously.
    for (const star of stars) {
      star.x += star.vx;
      star.y += star.vy;

      // Wrap particles around the screen so the motion never stops.
      if (star.x < -20) star.x = width + 20;
      if (star.x > width + 20) star.x = -20;
      if (star.y < -20) star.y = height + 20;
      if (star.y > height + 20) star.y = -20;
    }

    // Very faint constellation/network lines.
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < settings.connectionDistance) {
          const alpha = (1 - distance / settings.connectionDistance) * settings.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(210, 220, 225, ${alpha})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }
    }

    // Small scattered white particles.
    const time = performance.now();
    for (const star of stars) {
      const pulse = 0.82 + Math.sin(time * star.speed + star.twinkle) * 0.18;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 248, 250, ${star.a * pulse})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
})();

/* ── CURSOR ─────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.boxShadow = '0 0 8px #fff, 0 0 18px #fff, 0 0 38px rgba(255,255,255,0.9), 0 0 65px rgba(255,255,255,0.45)';
    ring.style.width = '50px';
    ring.style.height = '50px';
    ring.style.boxShadow = '0 0 14px rgba(255,255,255,0.55), 0 0 32px rgba(255,255,255,0.3)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.boxShadow = '0 0 6px #ffffff, 0 0 14px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.55), 0 0 50px rgba(255,255,255,0.25)';
    ring.style.width = '32px';
    ring.style.height = '32px';
    ring.style.boxShadow = '0 0 12px rgba(255,255,255,0.35), 0 0 28px rgba(255,255,255,0.18)';
  });
});

/* ── NAV MOBILE ─────────────────────────────────────────── */
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .timeline-item, .edu-item').forEach(el => io.observe(el));


/* ── INTERNSHIP TIMELINE REVEAL ─────────────────────── */
const internshipItems = document.querySelectorAll('.internship-timeline-item');

if (internshipItems.length) {
  const internshipIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        internshipItems.forEach((item, index) => {
          setTimeout(() => item.classList.add('visible'), index * 180);
        });
        internshipIO.disconnect();
      }
    });
  }, { threshold: 0.18 });

  const internshipTimeline = document.querySelector('.internship-timeline');
  if (internshipTimeline) internshipIO.observe(internshipTimeline);
}


/* ── PROJECT CAROUSEL ───────────────────────────────── */
const projectTrack = document.querySelector('.projects-track');
const projectCards = document.querySelectorAll('.carousel-project-card');
const projectDots = document.querySelectorAll('.project-dot');
const projectPrev = document.querySelector('.project-carousel-prev');
const projectNext = document.querySelector('.project-carousel-next');

if (projectTrack && projectCards.length) {
  let projectIndex = 1;

  function updateProjectCarousel(index, animate = true) {
    projectIndex = (index + projectCards.length) % projectCards.length;

    projectCards.forEach((card, i) => card.classList.toggle('active', i === projectIndex));
    projectDots.forEach((dot, i) => dot.classList.toggle('active', i === projectIndex));

    if (window.innerWidth <= 600) {
      projectCards[projectIndex].scrollIntoView({
        behavior: animate ? 'smooth' : 'auto',
        block: 'nearest',
        inline: 'center'
      });
      return;
    }

    const wrap = projectTrack.parentElement;
    const card = projectCards[projectIndex];
    const target = wrap.offsetWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    projectTrack.style.transition = animate ? 'transform .65s cubic-bezier(.22,1,.36,1)' : 'none';
    projectTrack.style.transform = `translateX(${target}px)`;
  }

  projectPrev?.addEventListener('click', () => updateProjectCarousel(projectIndex - 1));
  projectNext?.addEventListener('click', () => updateProjectCarousel(projectIndex + 1));
  projectDots.forEach((dot, i) => dot.addEventListener('click', () => updateProjectCarousel(i)));

  let projectAuto = setInterval(() => updateProjectCarousel(projectIndex + 1), 5000);
  const carousel = document.querySelector('.projects-carousel');

  carousel?.addEventListener('mouseenter', () => clearInterval(projectAuto));
  carousel?.addEventListener('mouseleave', () => {
    projectAuto = setInterval(() => updateProjectCarousel(projectIndex + 1), 5000);
  });

  window.addEventListener('resize', () => updateProjectCarousel(projectIndex, false));
  requestAnimationFrame(() => updateProjectCarousel(projectIndex, false));
}

/* ── SKILL BARS ─────────────────────────────────────────── */
const barIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(f => {
        f.style.width = f.dataset.pct + '%';
      });
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(c => barIO.observe(c));

/* ── TABS ───────────────────────────────────────────────── */
function switchTab(id, btn) {
  document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.exp-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  // Re-trigger timeline items
  document.querySelectorAll('#' + id + ' .timeline-item').forEach((el, i) => {
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), i * 80);
  });
}
// Init first tab
setTimeout(() => {
  document.querySelectorAll('#academic .timeline-item').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 100);
  });
}, 300);

/* ── FORM ───────────────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.style.display = 'block';
  e.target.reset();
  setTimeout(() => msg.style.display = 'none', 4000);
}

/* ── PUBLICATION TABS ────────────────────────────────────── */
function switchPubTab(id, btn) {
  document.querySelectorAll('.pub-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pub-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

/* ── NAV ACTIVE HIGHLIGHT ───────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
  });
});

/* ── DEMO MODAL ────────────────────────────────────────── */
const demoVideos = {
  'bookworn':                          'videos/bookworn.mp4',
  'ride-x':                            'videos/ridex.mp4',
  'train-scheduler-route-optimizer':   'videos/train scheduler.mp4',
  'Cloudy':                            'videos/CLOUDY.mp4'
};

const demoTitles = {
  'bookworn':                          'Bookworn — Live Demo',
  'ride-x':                            'RIDE X — Live Demo',
  'train-scheduler-route-optimizer':   'Train Scheduler & Route Optimizer — Live Demo',
  'Cloudy':                           'Cloudy — Live Demo'
};

const demoGithub = {
  'bookworn':                          'https://github.com/RANAV2004/Bookworn',
  'ride-x':                            'https://github.com/RANAV2004/RIDE-X',
  'train-scheduler-route-optimizer':   'https://github.com/RANAV2004/train-scheduler-route-optimizer',
  'Cloudy':                             'https://github.com/RANAV2004/CLOUDY'
};

function openDemoModal(projectKey) {
  const modal = document.getElementById('demoModal');
  const video = document.getElementById('demoVideo');
  const title = document.getElementById('demoModalTitle');
  const sourceLink = document.getElementById('demoSourceLink');

  title.textContent = demoTitles[projectKey] || 'Project Demo';
  video.src = demoVideos[projectKey] || '';
  sourceLink.href = demoGithub[projectKey] || 'https://github.com/RANAV2004';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  video.play().catch(() => {});
}

function closeDemoModal() {
  const modal = document.getElementById('demoModal');
  const video = document.getElementById('demoVideo');
  video.pause();
  video.src = '';
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay click
document.getElementById('demoModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeDemoModal();
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDemoModal();
});