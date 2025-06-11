import Navbar from './Navbar'
import ColumnContainer from './ColumnContainer'
function App() {
  return (
    <main className="dark h-[100svh] bg-bk-1 text-wt-1 font-sans flex flex-col overflow-hidden">
      <Navbar />

      <section
        className="
          grid w-full h-full 
          p-4 gap-4 overflow-y-auto
          place-items-center
          sm:grid-cols-1
          lg:grid-cols-3 lg:px-8
          "
      >
        <ColumnContainer />
        <ColumnContainer />
        <ColumnContainer />
      </section>
    </main>
  )
}

export default App
