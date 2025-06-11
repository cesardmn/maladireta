const ColumnContainer = ({ children }) => {
  return (
    <div
      className="
        flex bg-bk-2 rounded-xl border border-bk-3 shadow-lg 
        w-full p-6 min-h-[75vh] justify-center
        max-w-2xl h-[100%] lg:overflow-hidden "
    >
      {children}
    </div>
  )
}

export default ColumnContainer
