// TABS
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
    btn.classList.add('active');
  });
});

// ACORDEÓN
document.querySelector('.accordion-btn').addEventListener('click', function () {
  const panel = document.querySelector('.accordion-panel');
  panel.classList.toggle('show');
});

// CARRUSEL + THUMBS
const slides = document.querySelectorAll('.slide');
const thumbs = document.querySelectorAll('.thumb');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  thumbs.forEach(t => t.classList.remove('active'));
  slides[index].classList.add('active');
  thumbs[index].classList.add('active');
  currentSlide = index;
}

document.getElementById('nextBtn').addEventListener('click', () => {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
});
document.getElementById('prevBtn').addEventListener('click', () => {
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
});
thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => showSlide(i));
});

// ESTADÍSTICAS ANIMADAS
const counters = document.querySelectorAll('.number');
const animate = (el) => {
  const target = +el.getAttribute('data-target');
  const inc = target / 100;
  let count = 0;
  const upd = () => {
    if (count < target) {
      count += inc;
      el.textContent = Math.ceil(count);
      setTimeout(upd, 20);
    } else {
      el.textContent = target;
    }
  };
  upd();
};
const obs = new IntersectionObserver((ents) => ents.forEach(e => e.isIntersecting && animate(e.target)));
counters.forEach(c => obs.observe(c));

// QUIZ NIVELES
const easy = [
  { q: "¿Quién ganó el Mundial de 2014?", opts: ["Brasil", "Argentina", "Alemania", "Francia"], a: 2 },
  { q: "¿Cuántos Mundiales tiene Brasil?", opts: ["4", "5", "6", "7"], a: 1 },
  { q: "¿En qué país se jugará el Mundial de Clubes 2025?", opts: ["Qatar", "EE.UU.", "Brasil", "España"], a: 1 },
  { q: "¿Quién es el máximo goleador histórico de Mundiales?", opts: ["Ronaldo", "Klose", "Messi", "Pelé"], a: 1 },
  { q: "¿Qué selección venció a Brasil 7-1 en 2014?", opts: ["Francia", "Alemania", "Países Bajos", "Argentina"], a: 1 }
];
const hard = [
  ...easy,
  { q: "¿Qué equipo ganó la Champions 2003?", opts: ["Milan", "Juventus", "Real Madrid", "Porto"], a: 0 },
  { q: "¿Quién anotó el gol de oro en Euro 1996?", opts: ["Bierhoff", "Shearer", "Klinsmann", "Zidane"], a: 0 },
  { q: "¿En qué año se usó por 1ª vez el VAR en un Mundial?", opts: ["2014", "2018", "2022", "2026"], a: 1 },
  { q: "¿Qué país ganó la Copa Africana 2019?", opts: ["Argelia", "Senegal", "Nigeria", "Túnez"], a: 0 },
  { q: "¿Quién fue el capitán de Francia en 2018?", opts: ["Griezmann", "Pogba", "Lloris", "Mbappé"], a: 2 }
];

let currentQ = 0, score = 0, timeLeft = 15, timer, questions;

document.getElementById('startBtn').addEventListener('click', () => {
  const level = document.getElementById('level').value;
  questions = level === 'easy' ? easy : hard;
  currentQ = 0; score = 0;
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('level').style.display = 'none';
  document.getElementById('quizBox').style.display = 'block';
  loadQ();
});

function loadQ() {
  if (currentQ >= questions.length) return showResult();
  timeLeft = 15;
  const q = questions[currentQ];
  document.getElementById('question').textContent = `Pregunta ${currentQ + 1}: ${q.q}`;
  const optsBox = document.getElementById('options');
  optsBox.innerHTML = "";
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => check(i);
    optsBox.appendChild(btn);
  });
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQ++;
      loadQ();
    }
  }, 1000);
}

function check(i) {
  if (i === questions[currentQ].a) score++;
  currentQ++;
  clearInterval(timer);
  loadQ();
}

function showResult() {
  document.getElementById('question').textContent = "";
  document.getElementById('options').innerHTML = "";
  document.getElementById('timer').style.display = 'none';
  document.getElementById('score').textContent = `Obtuviste ${score} de ${questions.length} ✅`;
}

document.getElementById('year').textContent = new Date().getFullYear();