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

// Estado da aplicação
let tasks = [];
let currentFilter = 'all';

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicia a aplicação carregando tarefas do localStorage
 */
function init() {
    loadTasks();
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

/**
 * Adiciona uma nova tarefa
 */
function addTask() {
    const text = taskInput.value.trim();

    // Validação
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

    // Cria nova tarefa
    const newTask = {
        id: Date.now(), // ID único baseado no timestamp
        text: text,
        completed: false,
        createdAt: new Date().toLocaleDateString('pt-BR')
    };

    tasks.unshift(newTask); // Adiciona no início
    saveTasks();
    renderTasks();
    updateStats();

    // Limpa o input
    taskInput.value = '';
    taskInput.focus();
}

/**
 * Deleta uma tarefa pelo ID
 * @param {number} id - ID da tarefa
 */
function deleteTask(id) {
    if (confirm('Tem certeza que quer deletar essa tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

/**
 * Alterna o status de conclusão de uma tarefa
 * @param {number} id - ID da tarefa
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

/**
 * Edita o texto de uma tarefa
 * @param {number} id - ID da tarefa
 */
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt('Edite a tarefa:', task.text);

    // Se o usuário cancelar ou deixar em branco
    if (newText === null || newText.trim() === '') return;

    const trimmedText = newText.trim();

    // Validações
    if (trimmedText.length < 3) {
        alert('A tarefa deve ter pelo menos 3 caracteres!');
        return;
    }

    if (trimmedText.length > 100) {
        alert('A tarefa não pode ter mais de 100 caracteres!');
        return;
    }

    task.text = trimmedText;
    saveTasks();
    renderTasks();
}

/**
 * Limpa todas as tarefas completas
 */
function clearCompletedTasks() {
    if (tasks.filter(t => t.completed).length === 0) {
        alert('Nenhuma tarefa completa!');
        return;
    }

    if (confirm('Deseja remover todas as tarefas completas?')) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// ========================================
// RENDERIZAÇÃO
// ========================================

/**
 * Renderiza a lista de tarefas baseado no filtro atual
 */
function renderTasks() {
    taskList.innerHTML = '';

    // Filtra as tarefas baseado no filtro ativo
    let filteredTasks = tasks;

    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    // Mostra mensagem vazia se necessário
    if (filteredTasks.length === 0) {
        emptyMessage.classList.remove('hidden');
        clearBtn.disabled = tasks.filter(t => t.completed).length === 0;
        return;
    }

    emptyMessage.classList.add('hidden');
    clearBtn.disabled = false;

    // Cria elementos para cada tarefa
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">${escapeHTML(task.text)}</span>
            <div class="task-actions">
                <button 
                    class="btn-icon btn-edit" 
                    onclick="editTask(${task.id})"
                    title="Editar tarefa"
                >
                    ✏️
                </button>
                <button 
                    class="btn-icon btn-delete" 
                    onclick="deleteTask(${task.id})"
                    title="Deletar tarefa"
                >
                    🗑️
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

/**
 * Atualiza as estatísticas (contador de tarefas)
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
}

// ========================================
// ARMAZENAMENTO (LocalStorage)
// ========================================

/**
 * Salva as tarefas no localStorage
 */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Carrega as tarefas do localStorage
 */
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Escapa caracteres especiais HTML para evitar XSS
 * @param {string} text - Texto a ser escapado
 * @returns {string} Texto escapado
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
// Função para buscar dados da API de cotação
async function buscarCotacoes() {
  const elementoTexto = document.getElementById('cotacao-texto');

  try {
    // Faz a requisição à API
    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
    
    if (!resposta.ok) {
      throw new Error('Falha na resposta da API');
    }

    const dados = await resposta.json();

    // Extrai os valores formatados
    const dolar = parseFloat(dados.USDBRL.bid).toFixed(2);
    const euro = parseFloat(dados.EURBRL.bid).toFixed(2);

    // Atualiza a interface (DOM)
    elementoTexto.innerHTML = `<strong>USD:</strong> R$ ${dolar} | <strong>EUR:</strong> R$ ${euro}`;
  } catch (erro) {
    console.error('Erro ao buscar cotação:', erro);
    elementoTexto.innerText = 'Não foi possível carregar as cotações no momento.';
  }
}

// Executa a função assim que a página é carregada
document.addEventListener('DOMContentLoaded', buscarCotacoes);
// ========================================
// INICIALIZA A APLICAÇÃO
// ========================================
init();
// Função assíncrona para buscar as cotações na AwesomeAPI
async function carregarCotacoesMoedas() {
  const containerCotacao = document.querySelector('.cotacao-container span');

  try {
    // Faz a requisição HTTP GET para a API pública (sem necessidade de token ou chave)
    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
    
    // Verifica se a requisição foi bem-sucedida (status 200-299)
    if (!resposta.ok) {
      throw new Error(`Erro na rede: ${resposta.status}`);
    }

    const dados = await resposta.json();

    // Extrai e formata os valores numéricos com 2 casas decimais
    const dolar = Number(dados.USDBRL.bid).toFixed(2);
    const euro = Number(dados.EURBRL.bid).toFixed(2);

    // Atualiza o HTML dinamicamente com os dados reais
    containerCotacao.innerHTML = `
      💱 <strong>USD:</strong> R$ ${dolar} &nbsp;|&nbsp; <strong>EUR:</strong> R$ ${euro}
    `;

  } catch (erro) {
    console.error('Não foi possível carregar as cotações:', erro);
    containerCotacao.innerText = '⚠️ Indisponível no momento para carregar cotações.';
  }
}

// Executa a função automaticamente assim que o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
  carregarCotacoesMoedas();
  
  // Opcional: Atualiza as cotações a cada 5 minutos automaticamente
  setInterval(carregarCotacoesMoedas, 300000);
});
