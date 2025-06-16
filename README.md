# Mala Direta

Gere documentos personalizados em massa a partir de modelos `.docx` e planilhas `.xlsx` de forma simples e rápida.

## ✨ Funcionalidades

- **Importação de modelo DOCX:** Use um arquivo Word com tags como `{nome}`, `{sobrenome}`, `{data}` para personalização.
- **Importação de planilha XLSX:** Envie uma planilha com colunas correspondentes às tags do modelo.
- **Validação automática:** O sistema verifica se todas as tags possuem dados correspondentes e sugere correções de formatação.
- **Escolha de coluna-chave:** Defina qual coluna será usada para nomear os arquivos gerados.
- **Pré-visualização e geração:** Veja uma prévia e gere todos os documentos personalizados em poucos cliques.
- **Logs detalhados:** Acompanhe todas as ações e mensagens do sistema em tempo real.

## 🚀 Como usar

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/maladireta.git
   cd maladireta
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Inicie o ambiente de desenvolvimento:**

   ```sh
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## 🛠️ Scripts disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento.
- `npm run build` — Gera a versão de produção.
- `npm run preview` — Visualiza a build de produção localmente.
- `npm run lint` — Executa o linter.
- `npm run format` — Formata o código com Prettier.
- `npm test` — Executa os testes.

## 📁 Estrutura do Projeto

```
src/
  components/      # Componentes React da interface
  providers/       # Contextos e hooks de estado global
  utils/           # Funções utilitárias para manipulação de arquivos
  assets/          # Imagens e ícones
public/            # Arquivos estáticos
```

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito por [Cesar Dimi](https://github.com/cesardimi)
