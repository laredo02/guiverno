function updateDarkModeButton(button) {
  if (document.body.classList.contains('dark-mode')) {
    button.textContent = '☀️';
  } else {
    button.textContent = '🌙';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.dark-mode-toggle');
  const storedMode = localStorage.getItem('darkMode');

  if (storedMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  updateDarkModeButton(button);
  button.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const enabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
    updateDarkModeButton(button);
  });
});
