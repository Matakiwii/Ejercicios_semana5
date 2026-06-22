// Lista de tareas en memoria: array de objetos { id, text, completed }
const tasks = [];

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');
const themeToggle = document.getElementById('theme-toggle');

// Cargar tema guardado
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
}

// Toggle tema oscuro/claro
themeToggle.addEventListener('click', () => {
  const isDarkMode = document.documentElement.classList.toggle('dark-mode');
  const theme = isDarkMode ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// Renderiza todas las tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    // checkbox visual
    const checkbox = document.createElement('span');
    checkbox.className = 'toggle-checkbox' + (task.completed ? ' checked' : '');
    checkbox.setAttribute('aria-hidden', 'true');

    const spanText = document.createElement('span');
    spanText.className = 'text';
    spanText.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(spanText);

    // click en el li: marcar/desmarcar (usa classList.toggle)
    li.addEventListener('click', () => {
      task.completed = !task.completed;
      // toggle class en el elemento
      li.classList.toggle('completed', task.completed);
      checkbox.classList.toggle('checked', task.completed);
    });

    list.appendChild(li);
  });
}

// Validación simple y agregar tarea al array
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();

  if (!value) {
    showError('La tarea no puede estar vacía.');
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    text: value,
    completed: false
  };

  tasks.push(newTask);
  input.value = '';
  renderTasks();
});

// Muestra mensaje de error (JS)
function showError(msg) {
  errorMsg.textContent = msg;
  // opcional: quitar el mensaje después de 3s
  clearTimeout(showError._timeout);
  showError._timeout = setTimeout(() => {
    errorMsg.textContent = '';
  }, 3000);
}

// Cargar tema al iniciar
loadTheme();

// Render inicial (por si hay tareas pre-cargadas)
renderTasks();
