import Navbar from './Navbar'
import ColumnContainer from './ColumnContainer'
import InfoPanel from './InfoPanel'
import LogPanel from './LogPanel'
import DocxImport from './DocxImport'
import XlsxImport from './XlsxImport'
import Choice from './Choice'
import { useState } from 'react'
// import { useFiles } from '../providers/Files/Hook'

const App = () => {
  const [step, setStep] = useState('docx')

  return (
    <main className="h-[100svh] bg-bk-1 text-wt-1 font-sans flex flex-col">
      <Navbar />

      <section
        className="h-[100%] overflow-y-auto overflow-x-hidden
          grid gap-4 p-4
          justify-center items-center
          lg:grid-cols-3
        "
      >
        <ColumnContainer>
          <InfoPanel />
        </ColumnContainer>

        <ColumnContainer>
          {step === 'docx' && <DocxImport setStep={setStep} />}
          {step === 'xlsx' && <XlsxImport setStep={setStep} />}
          {step === 'files' && <Choice setStep={setStep} />}
        </ColumnContainer>

        <ColumnContainer>
          <LogPanel />
        </ColumnContainer>
      </section>
    </main>
  )
}

export default App
