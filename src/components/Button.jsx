export function Button({ children, className="", ...props }) {
  className = "flex items-center gap-2 px-3 py-1.5 border-2 border-zinc-500 bg-zinc-700 rounded transition-colors duration-150 hover:bg-opacity-60 focus-visible:bg-opacity-60 focus-visible:border-zinc-200 focus-visible:outline-none" + " " + className

  return (
    <button {...props}
      className={className}
    >
      {children}
    </button>
  )
}