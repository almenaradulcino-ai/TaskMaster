# TaskMaster - Instruções do Projeto

## Estrutura

- **index.html** - Markup semântico com estrutura da aplicação
- **css/styles.css** - Design moderno, responsivo, com variáveis CSS
- **js/app.js** - Lógica completa com funções bem documentadas
- **README.md** - Documentação completa passo a passo

## Funcionalidades Principais

1. **Adicionar Tarefas** - Input com validação (3-100 caracteres)
2. **Editar Tarefas** - Modifique texto com prompt
3. **Deletar Tarefas** - Com confirmação
4. **Marcar Completo** - Toggle com checkbox customizado
5. **Filtros** - Todas, Pendentes, Completas
6. **Persistência** - LocalStorage para dados permanentes
7. **Estatísticas** - Contador de total e completas
8. **Responsividade** - Desktop, tablet e mobile

## Boas Práticas Implementadas

- ✅ Código comentado com JSDoc
- ✅ Variáveis CSS para tema
- ✅ Flexbox para layout
- ✅ XSS prevention com escapeHTML()
- ✅ Validação de entrada
- ✅ Array methods modernos (filter, find, forEach)
- ✅ Event delegation apropriada
- ✅ Separação clara de responsabilidades

## Como Usar

1. Abra `index.html` em um navegador
2. Digite uma tarefa e clique "+ Adicionar" ou Enter
3. Use os filtros para organizar
4. Clique nos ícones para editar/deletar
5. Marque tarefas como completas com o checkbox

## Para Abrir em Servidor Local

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Depois acesse: http://localhost:8000

## Pontos de Destaque para Recrutadores

- Código limpo e bem documentado
- Design moderno com gradientes
- Todas as funcionalidades funcionam perfeitamente
- Sem dependências externas
- Código seguro (XSS prevention)
- Estrutura escalável e bem organizada
