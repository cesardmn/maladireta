const ColumnContainer = ({ children }) => {
  return (
    <div
      className="
        flex bg-bk-2 rounded-xl border border-bk-3 shadow-lg py-8 px-4 max-w-2xl w-full lg:h-[80svh]
        "
    >
      {children}
    </div>
  )
}

export default ColumnContainer
