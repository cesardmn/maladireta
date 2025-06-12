import { useState } from 'react'
import { BsFiletypeDocx } from 'react-icons/bs'

// Etapas do processo
const steps = [
  {
    id: 1,
    text: 'Importe um modelo .docx com tags como: {nome} {sobrenome} {data}.',
  },
  {
    id: 2,
    text: 'Envie uma planilha .xlsx com colunas correspondentes às tags.',
  },
  {
    id: 3,
    text: 'Escolha qual coluna será usada para nomear os arquivos.',
  },
  {
    id: 4,
    text: 'Confira a prévia e gere os documentos personalizados.',
  },
]

const InfoPanel = () => {
  const [stepIndex, setStepIndex] = useState(0)

  const handleStep = (index) => {
    setStepIndex(index)
  }

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return <DocxModel />
      case 1:
        return <XlsxModel />
      case 2:
        return <ColumnSelector />
      case 3:
        return <PreviewModel />
      default:
        return null
    }
  }

  return (
    <div
      className="flex flex-col justify-start gap-8 w-full items-center h-auto px-4"
      role="region"
      aria-label="Instruções do aplicativo"
    >
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        como funciona
      </h2>

      <div className="flex gap-4 w-full justify-center" role="tablist">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => handleStep(index)}
            aria-label={`Ir para o passo ${step.id}: ${step.text}`}
            aria-current={stepIndex === index ? 'step' : undefined}
            className={`h-10 w-10 flex items-center justify-center rounded-full transition font-bold text-base border cursor-pointer
              ${
                stepIndex === index
                  ? 'bg-gradient-to-r from-or-1 to-or-3 text-wt-1 border-transparent'
                  : 'bg-gr-3 text-gr-1 border-gr-2 hover:bg-gr-2 hover:text-wt-2'
              }`}
          >
            {step.id}
          </button>
        ))}
      </div>

      <p className="text-gr-2 leading-relaxed text-center max-w-md">
        {steps[stepIndex].text}
      </p>

      {renderStepContent()}
    </div>
  )
}

// Step 1
const DocxModel = () => (
  <article className="h-[80mm] w-[50mm] bg-wt-2 rounded-xl text-gr-3 text-sm p-4 leading-relaxed flex flex-col justify-between shadow-lg">
    <p>Prezado sr(a).</p>
    <p>
      <strong>{'{nome} {sobrenome}'}</strong>
    </p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <p>Hic quas assumenda provident totam!</p>
    <p>
      <strong>{'{data}'}</strong>
    </p>
  </article>
)

// Step 2
const XlsxModel = () => {
  const headers = ['nome', 'sobrenome', 'data']
  const data = [
    { nome: 'Ana', sobrenome: 'Silva', data: '2025-01-10' },
    { nome: 'Bruno', sobrenome: 'Souza', data: '2025-02-14' },
    { nome: 'Carlos', sobrenome: 'Pereira', data: '2025-03-21' },
    { nome: 'Daniela', sobrenome: 'Oliveira', data: '2025-04-08' },
    { nome: 'Eduardo', sobrenome: 'Lima', data: '2025-05-17' },
  ]

  return (
    <table className="w-full bg-wt-2 rounded-xl border-gray-300 text-left text-xs table-fixed overflow-hidden text-gr-3 shadow-2xl">
      <thead>
        <tr className="bg-wt-3">
          {headers.map((header) => (
            <th key={header} className="border border-gray-300 px-2 py-1">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {headers.map((header) => (
              <td key={header} className="border border-gray-300 px-2 py-1">
                {item[header.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Step 3 — seleção de coluna
const ColumnSelector = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4">
        <button className="bg-or-3 text-wt-1 font-bold px-4 py-2 rounded">
          nome
        </button>
        <button className="bg-or-2 opacity-50 text-wt-1 font-bold px-4 py-2 rounded">
          sobrenome
        </button>
        <button className="bg-or-2 opacity-50 text-wt-1 font-bold px-4 py-2 rounded">
          data
        </button>
      </div>

      <p className="text-sm text-gr-2 mt-4 text-center ">
        Os Arquivos serão nomeados correspondente à coluna escolhida:
      </p>
      <ul>
        <li className="flex gap-2 items-center underline">
          <BsFiletypeDocx />
          <em>Ana.docx</em>
        </li>
        <li className="flex gap-2 items-center underline">
          <BsFiletypeDocx />
          <em>Bruno.docx</em>
        </li>
        <li className="flex gap-2 items-center underline">
          <BsFiletypeDocx />
          <em>Carlos.docx</em>
        </li>
        <li className="flex gap-2 items-center underline">
          <BsFiletypeDocx />
          <em>Daniela.docx</em>
        </li>
        <li className="flex gap-2 items-center underline">
          <BsFiletypeDocx />
          <em>Eduardo.docx</em>
        </li>
      </ul>
    </div>
  )
}

// Step 4 — prévia final
const PreviewModel = () => (
  <article className="h-[80mm] w-[50mm] bg-wt-2 rounded-xl text-gr-3 text-sm p-4 leading-relaxed flex flex-col justify-between shadow-lg">
    <p>Prezado sr(a).</p>
    <p>
      <strong>{'Bruno Souza'}</strong>
    </p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <p>Hic quas assumenda provident totam!</p>
    <p>
      <strong>{'2525-02-14'}</strong>
    </p>
  </article>
)

export default InfoPanel
