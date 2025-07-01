const form = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');
const ratingStars = document.querySelectorAll('.rating img');
const ratingInput = document.getElementById('rating');
const emojiSelect = document.getElementById('emoji');

let selectedRating = 0;

ratingStars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    ratingInput.value = selectedRating;

    ratingStars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < selectedRating; i++) {
      ratingStars[i].classList.add('selected');
    }
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value || 'Anonim';
  const comment = document.getElementById('comment').value;
  const rating = ratingInput.value;
  const emoji = emojiSelect.value;

  const feedback = {
    name,
    comment,
    rating,
    emoji,
    date: new Date().toLocaleString()
  };

  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbacks.push(feedback);
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

  form.reset();
  selectedRating = 0;
  ratingStars.forEach(s => s.classList.remove('selected'));
  showFeedback();
});

function showFeedback() {
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbackList.innerHTML = '';

  feedbacks.reverse().forEach(f => {
    feedbackList.innerHTML += `
      <div class="feedback-card">
        <div class="card-row">
          <div class="card-content">
            <strong>${f.name}</strong>
            <small>${f.date}</small>
            <div>Rating: ${'⭐'.repeat(f.rating)}</div>
            <p>${f.comment}</p>
          </div>
          <div class="emoji-display">${f.emoji}</div>
        </div>
      </div>
    `;
  });
}


showFeedback();

// Reset semua komentar
document.getElementById('resetButton').addEventListener('click', () => {
  if (confirm('Yakin ingin menghapus semua masukan?')) {
    localStorage.removeItem('feedbacks');
    showFeedback();
  }
});

// Project suggestion
const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');

projectForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const idea = document.getElementById('projectIdea').value;
  const ideas = JSON.parse(localStorage.getItem('projectIdeas')) || [];
  ideas.push(idea);
  localStorage.setItem('projectIdeas', JSON.stringify(ideas));
  projectForm.reset();
  renderProjects();
});

function renderProjects() {
  const ideas = JSON.parse(localStorage.getItem('projectIdeas')) || [];
  projectList.innerHTML = '';
  ideas.reverse().forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    projectList.appendChild(li);
  });
}

renderProjects();

// Hitung kunjungan pakai localStorage
let views = localStorage.getItem('viewCount');
if (!views) {
  views = 1;
} else {
  views = parseInt(views) + 1;
}
localStorage.setItem('viewCount', views);

// Tampilkan
const viewCounter = document.getElementById('viewCounter');
if (viewCounter) viewCounter.textContent = views;
