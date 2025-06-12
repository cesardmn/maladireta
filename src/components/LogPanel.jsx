import { useLogger } from '../providers/Logger/Hook'

const LogPanel = () => {
  const { logs } = useLogger()

  const getColorClass = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      case 'info':
      default:
        return 'text-grey-200'
    }
  }

  return (
    <div
      className="flex flex-col justify-start gap-8 w-full items-center h-auto px-4"
      role="region"
      aria-label="Instruções do aplicativo"
    >
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        logs
      </h2>

      <div
        className=" 
          flex flex-col overflow-y-auto lg:h-full w-full
          bg-bk-3 rounded-lg p-4 text-gr-2
          "
        tabIndex={0}
        aria-live="polite"
      >
        {logs.length === 0 ? (
          <p>Nenhuma ação realizada ainda.</p>
        ) : (
          logs
            .slice()
            .reverse()
            .map((log, index) => (
              <p
                key={index}
                className={`mb-2 ${getColorClass(log.status)}`}
                dangerouslySetInnerHTML={{
                  __html: `[${log.timestamp}] ${log.message.replace(/\n/g, '<br />')}`,
                }}
              ></p>
            ))
        )}
      </div>
    </div>
  )
}

export default LogPanel
