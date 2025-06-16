# Mala Direta

Aplicação para geração automatizada de documentos personalizados em lote, utilizando modelos `.docx` e planilhas `.xlsx`.

## Funcionalidades

- **Modelo DOCX parametrizável:** Utilize arquivos Word com tags como `{nome}`, `{sobrenome}`, `{data}` para personalização dinâmica.
- **Importação de dados via XLSX:** Carregue planilhas com colunas correspondentes às variáveis do modelo.
- **Validação de consistência:** O sistema verifica a correspondência entre as tags do modelo e os dados fornecidos, indicando eventuais inconsistências.
- **Definição de identificador:** Permite selecionar a coluna que será utilizada para nomear os arquivos gerados.
- **Pré-visualização:** Visualize o resultado antes de gerar os documentos finais.
- **Registro de operações:** Logs detalhados de todas as etapas do processo.

## Como utilizar

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/maladireta.git
   cd maladireta
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Execute o ambiente de desenvolvimento:**

   ```sh
   npm run dev
   ```

4. **Acesse a aplicação:**
   ```
   http://localhost:3000
   ```

## Scripts

- `npm run dev` — Inicia o ambiente de desenvolvimento.
- `npm run build` — Gera a versão de produção.
- `npm run preview` — Visualiza a build de produção localmente.
- `npm run lint` — Executa análise estática de código.
- `npm run format` — Formata o código com Prettier.
- `npm test` — Executa os testes automatizados.

## Estrutura do projeto

```
src/
  components/      # Componentes de interface
  providers/       # Contextos e hooks globais
  utils/           # Funções utilitárias
  assets/          # Recursos estáticos (imagens, ícones)
public/            # Arquivos públicos
```

## Tecnologias

- **Frontend:** [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **Manipulação de arquivos:** [docxtemplater](https://github.com/open-xml-templating/docxtemplater), [jszip](https://stuk.github.io/jszip/), [pizzip](https://github.com/open-xml-templating/pizzip), [xlsx (SheetJS)](https://sheetjs.com/)
- **Qualidade de código:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Deploy:** [gh-pages](https://github.com/tschaub/gh-pages)

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

Desenvolvido por [Cesar Dimi](https://github.com/cesardimi)
