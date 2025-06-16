const ColumnContainer = ({ children }) => {
  return (
    <div
      className="
        flex bg-bk-2 rounded-xl border border-bk-3 shadow-lg py-4 px-4 max-w-2xl w-full lg:h-[75svh]
        "
    >
      {children}
    </div>
  )
}

export default ColumnContainer
