# 📋 TaskMaster - Gerenciador de Tarefas

Um aplicativo web moderno e responsivo para gerenciar suas tarefas do dia a dia. Construído com HTML, CSS e JavaScript vanilla, sem dependências externas.

## 🌟 Características

✅ **Adicionar tarefas** - Crie novas tarefas com validação de entrada  
✅ **Editar tarefas** - Modifique o texto de tarefas existentes  
✅ **Deletar tarefas** - Remova tarefas individualmente  
✅ **Marcar como completo** - Marque tarefas como concluídas com um click  
✅ **Filtros** - Veja todas, apenas pendentes ou apenas completas  
✅ **Persistência** - Suas tarefas são salvas automaticamente no navegador  
✅ **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile  
✅ **Sem dependências** - Código puro, sem frameworks pesados  

## 📁 Estrutura do Projeto

```
Projeto/
├── index.html          # Arquivo HTML principal
├── css/
│   └── styles.css      # Estilos e design
├── js/
│   └── app.js          # Lógica da aplicação
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir o Projeto
- Abra o arquivo `index.html` em seu navegador
- Ou configure um servidor local (recomendado)

### 2. Usar a Aplicação

#### Adicionar Tarefa
```
1. Digite o texto da tarefa no campo de entrada
2. Clique em "+ Adicionar" ou pressione Enter
3. A tarefa aparecerá na lista
```

#### Completar Tarefa
```
1. Clique no checkbox ao lado da tarefa
2. A tarefa ficará com linha de corte
3. Será contabilizada nas "Completas"
```

#### Editar Tarefa
```
1. Clique no ícone ✏️ (lápis) da tarefa
2. Digite o novo texto
3. Clique OK para salvar ou Cancelar para desistir
```

#### Deletar Tarefa
```
1. Clique no ícone 🗑️ (lixo) da tarefa
2. Confirme a deleção
3. A tarefa será removida
```

#### Usar Filtros
```
- Clique em "Todas" para ver todas as tarefas
- Clique em "Pendentes" para ver apenas não completas
- Clique em "Completas" para ver apenas completas
```

#### Limpar Completas
```
1. Clique em "🗑️ Limpar Completas"
2. Confirme a ação
3. Todas as tarefas completas serão removidas
```

## 💡 Conceitos Técnicos Explicados

### 1. **HTML Structure** (`index.html`)
O HTML está organizado semanticamente com:
- `<header>` - Cabeçalho da aplicação
- `<section class="input-section">` - Área de entrada
- `<section class="tasks-section">` - Lista de tarefas
- IDs únicos para cada elemento interativo

**Por que?** Estrutura bem organizada facilita manutenção e SEO.

### 2. **CSS Moderno** (`styles.css`)
Utilizamos:
- **Variáveis CSS** (`:root`) - Facilita manutenção de cores e valores
- **Flexbox** - Layout responsivo e flexível
- **Gradientes** - Design moderno e atraente
- **Animations** - Transições suaves
- **Media Queries** - Responsividade para diferentes telas

**Exemplo de Variável CSS:**
```css
:root {
    --primary-color: #6366f1;
}

.btn-add {
    background: var(--primary-color);
}
```

### 3. **JavaScript Funcional** (`app.js`)

#### Funções Principais:

**a) `init()` - Inicialização**
```javascript
function init() {
    loadTasks();           // Carrega tarefas salvas
    renderTasks();         // Mostra tarefas na tela
    updateStats();         // Atualiza contadores
    // ... adiciona event listeners
}
```

**b) `addTask()` - Adiciona Tarefa**
```javascript
function addTask() {
    const text = taskInput.value.trim();
    
    // Validação
    if (!text) return alert('Digite uma tarefa!');
    
    // Cria objeto da tarefa
    const newTask = {
        id: Date.now(),      // ID único
        text: text,
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };
    
    tasks.unshift(newTask);  // Adiciona no início do array
    saveTasks();             // Salva no localStorage
    renderTasks();           // Atualiza a tela
}
```

**c) `toggleTask()` - Marca/Desmarca Completo**
```javascript
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);  // Encontra a tarefa
    if (task) {
        task.completed = !task.completed;        // Inverte o status
        saveTasks();
        renderTasks();
    }
}
```

**d) `renderTasks()` - Mostra Tarefas na Tela**
```javascript
function renderTasks() {
    taskList.innerHTML = '';  // Limpa a lista
    
    // Filtra baseado no filtro ativo
    let filtered = tasks;
    if (currentFilter === 'completed') {
        filtered = tasks.filter(t => t.completed);
    }
    
    // Cria HTML para cada tarefa
    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `...`;
        taskList.appendChild(li);
    });
}
```

### 4. **LocalStorage - Persistência**

Como as tarefas são salvas automaticamente:

```javascript
// Salva
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carrega
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}
```

**Como funciona:**
1. `JSON.stringify(tasks)` - Converte array em texto
2. `localStorage.setItem()` - Salva no navegador
3. `JSON.parse()` - Converte texto de volta em array

### 5. **Segurança - XSS Prevention**

```javascript
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;  // Evita execução de código malicioso
    return div.innerHTML;
}
```

**Por que?** Se alguém digitasse `<script>alert('hacked')</script>`, sem escapar, o script executaria.

## 🎓 O Que Você Aprendeu

### Habilidades JavaScript:
- ✅ DOM Manipulation (`getElementById`, `createElement`, etc.)
- ✅ Event Listeners (`addEventListener`, `onclick`)
- ✅ Array Methods (`filter`, `find`, `unshift`, `forEach`)
- ✅ Objects e Estruturas de Dados
- ✅ LocalStorage API
- ✅ String Methods (`trim`, `length`, etc.)
- ✅ Funções e Escopo

### Habilidades CSS:
- ✅ Flexbox Layout
- ✅ Gradientes
- ✅ Animações e Transições
- ✅ Media Queries (Responsividade)
- ✅ Variáveis CSS
- ✅ Pseudo-classes (`:hover`, `:checked`, `:focus`)

### Boas Práticas:
- ✅ Código comentado e bem organizado
- ✅ Nomes de variáveis significativos
- ✅ Validação de entrada
- ✅ Prevenção de XSS
- ✅ Separação de responsabilidades (HTML, CSS, JS)

## 🎨 Personalizações

### Mudar Cores
Edite as variáveis em `css/styles.css`:
```css
:root {
    --primary-color: #sua-cor-aqui;
    --secondary-color: #outra-cor;
}
```

### Mudar Limite de Caracteres
Em `js/app.js`, encontre:
```javascript
if (text.length > 100) {  // Mude 100 para outro valor
    alert('Máximo 100 caracteres!');
}
```

### Adicionar Data de Criação
Já existe! Cada tarefa tem:
```javascript
createdAt: new Date().toLocaleDateString('pt-BR')
```

## 🔧 Configurar Servidor Local (Recomendado)

### Com Python 3:
```bash
python -m http.server 8000
```
Acesse: `http://localhost:8000`

### Com Node.js (http-server):
```bash
npx http-server
```

## 📱 Responsividade

A aplicação é **100% responsiva**:
- **Desktop** - Layout completo
- **Tablet** - Ajusta para tela menor
- **Mobile** - Coluna única, toque otimizado

## 🐛 Troubleshooting

**P: Minhas tarefas desapareceram!**  
R: Cookies/LocalStorage foi limpo. Limpe o cache do navegador com cuidado.

**P: Posso usar em múltiplos abas?**  
R: Sim! Cada aba tem seu próprio localStorage, mas você pode copiar dados entre abas.

**P: Funciona offline?**  
R: Sim! Tudo funciona localmente no navegador.

## 🚀 Próximos Passos para Melhorar

Ideias para expandir este projeto:

1. **Categorias** - Organize tarefas por categoria
2. **Datas de vencimento** - Adicione prazos
3. **Prioridades** - Marque como alta/média/baixa
4. **Busca** - Procure tarefas por texto
5. **Backend** - Use um servidor para sincronizar entre dispositivos
6. **Notificações** - Notifique sobre tarefas vencidas
7. **Dark Mode** - Tema escuro
8. **Temas** - Múltiplos temas de cores

## 👨‍💻 Para Recrutadores

Este projeto demonstra:
- ✅ **Domínio de JavaScript vanilla** - Sem frameworks pesados
- ✅ **Boas práticas de código** - Comentado, bem estruturado
- ✅ **Design responsivo** - Mobile-first
- ✅ **Gerenciamento de estado** - Com localStorage
- ✅ **UX/UI** - Interface intuitiva e moderna
- ✅ **Segurança** - XSS prevention
- ✅ **Documentação** - README completo

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Desenvolvido com ❤️ como portfólio**
