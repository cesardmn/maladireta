import Navbar from './Navbar'
import ColumnContainer from './ColumnContainer'
import InfoPanel from './InfoPanel'
import LogPanel from './LogPanel'

function App() {
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

        <ColumnContainer />
        <ColumnContainer>
          <LogPanel />
        </ColumnContainer>
      </section>
    </main>
  )
}

export default App
