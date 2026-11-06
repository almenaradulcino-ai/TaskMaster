// ========================================
// GERENCIADOR DE TAREFAS - TASKMASTER
// ========================================

// Elementos do DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const emptyMessage = document.getElementById('emptyMessage');

// Estado da aplicação (Carrega do localStorage se houver dados)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// ========================================
// INICIALIZAÇÃO
// ========================================
function init() {
  renderTasks();
  updateStats();

  // Event listeners
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
  clearBtn.addEventListener('click', clearCompletedTasks);

  // Filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTasks();
    });
  });
}

// ========================================
// FUNÇÕES PRINCIPAIS
// ========================================

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    alert('Por favor, digite uma tarefa!');
    taskInput.focus();
    return;
  }
  if (text.length < 3) {
    alert('A tarefa deve ter pelo menos 3 caracteres!');
    return;
  }
  if (text.length > 100) {
    alert('A tarefa não pode ter mais de 100 caracteres!');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toLocaleDateString('pt-BR')
  };

  tasks.unshift(newTask);
  saveTasks(); // Salva no LocalStorage
  renderTasks();
  updateStats();

  taskInput.value = '';
  taskInput.focus();
}

function deleteTask(id) {
  if (confirm('Tem certeza que quer deletar essa tarefa?')) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(); // Atualiza o LocalStorage
    renderTasks();
    updateStats();
  }
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(); // Atualiza o LocalStorage
    renderTasks();
    updateStats();
  }
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt('Edite a tarefa:', task.text);
  if (newText === null || newText.trim() === '') return;

  const trimmedText = newText.trim();
  if (trimmedText.length < 3) {
    alert('A tarefa deve ter pelo menos 3 caracteres!');
    return;
  }
  if (trimmedText.length > 100) {
    alert('A tarefa não pode ter mais de 100 caracteres!');
    return;
  }

  task.text = trimmedText;
  saveTasks(); // Atualiza o LocalStorage
  renderTasks();
}

function clearCompletedTasks() {
  if (tasks.filter(t => t.completed).length === 0) {
    alert('Nenhuma tarefa completa!');
    return;
  }

  if (confirm('Deseja remover todas as tarefas completas?')) {
    tasks = tasks.filter(t => !t.completed);
    saveTasks(); // Atualiza o LocalStorage
    renderTasks();
    updateStats();
  }
}

// ========================================
// RENDERIZAÇÃO
// ========================================

function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  if (filteredTasks.length === 0) {
    emptyMessage.classList.remove('hidden');
    clearBtn.disabled = tasks.filter(t => t.completed).length === 0;
    return;
  }

  emptyMessage.classList.add('hidden');
  clearBtn.disabled = false;

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
      <span class="task-text">${escapeHTML(task.text)}</span>
      <div class="task-actions">
        <button class="btn-icon btn-edit" onclick="editTask(${task.id})" title="Editar tarefa">✏️</button>
        <button class="btn-icon btn-delete" onclick="deleteTask(${task.id})" title="Deletar tarefa">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
}

// ========================================
// ARMAZENAMENTO (LocalStorage)
// ========================================

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ========================================
// INTEGRAÇÃO COM API DE COTAÇÕES (AwesomeAPI)
// ========================================

async function carregarCotacoesMoedas() {
  const containerCotacao = document.querySelector('.cotacao-container span');
  
  // Se o elemento HTML ainda não foi criado na página, encerra a função sem erro
  if (!containerCotacao) return;

  try {
    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
    
    if (!resposta.ok) {
      throw new Error(`Erro na rede: ${resposta.status}`);
    }

    const dados = await resposta.json();
    const dolar = Number(dados.USDBRL.bid).toFixed(2);
    const euro = Number(dados.EURBRL.bid).toFixed(2);

    containerCotacao.innerHTML = `💱 <strong>USD:</strong> R$ ${dolar} &nbsp;|&nbsp; <strong>EUR:</strong> R$ ${euro}`;
  } catch (erro) {
    console.error('Não foi possível carregar as cotações:', erro);
    containerCotacao.innerText = '⚠️ Indisponível no momento para carregar cotações.';
  }
}

// ========================================
// UTILITÁRIOS
// ========================================

function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  init();
  carregarCotacoesMoedas();
  
  // Atualiza as cotações a cada 5 minutos automaticamente
  setInterval(carregarCotacoesMoedas, 300000);
});
