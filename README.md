# Mala Direta

Aplicação para geração automatizada de documentos personalizados em lote, utilizando modelos `.docx` e planilhas `.xlsx`.

## Visão Geral

O **Mala Direta** é uma aplicação web que facilita a criação de documentos personalizados em massa, como cartas, certificados ou contratos. A ferramenta combina modelos Word com dados de planilhas Excel para gerar arquivos únicos de forma simples e rápida, com validações e pré-visualização.

## Funcionalidades

- **Modelo DOCX parametrizável:** Utilize arquivos `.docx` com tags como `{nome}`, `{sobrenome}`, `{data}`, entre outras.
- **Importação de dados:** Aceita planilhas `.xlsx` com colunas correspondentes às variáveis utilizadas no modelo.
- **Validação de consistência:** Verifica se todas as tags do modelo estão presentes na planilha de dados.
- **Identificador personalizável:** Permite escolher uma coluna como nome base dos arquivos gerados.
- **Pré-visualização integrada:** Visualize um exemplo do resultado antes de gerar todos os documentos.
- **Registro de operações:** Exibe logs detalhados do processo de geração.

## Como Utilizar

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
   [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` — Inicia o ambiente de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run preview` — Visualiza a build localmente
- `npm run lint` — Executa análise estática do código
- `npm run format` — Formata o código com Prettier

## Estrutura do Projeto

- [`src/components/`](src/components/) — Componentes da interface
- [`src/providers/`](src/providers/) — Contextos e hooks globais
- [`src/utils/`](src/utils/) — Funções auxiliares de manipulação e validação
- [`src/assets/`](src/assets/) — Imagens, ícones e recursos estáticos
- [`public/`](public/) — Arquivos públicos (como o favicon e manifest)

## Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [docxtemplater](https://github.com/open-xml-templating/docxtemplater)
- [jszip](https://stuk.github.io/jszip/)
- [pizzip](https://github.com/open-xml-templating/pizzip)
- [SheetJS/xlsx](https://sheetjs.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [gh-pages](https://github.com/tschaub/gh-pages)

## Licença

MIT © 2025 Cesar Dimi

---

uma ferramenta [autoflux](https://autoflux.app.br/)
