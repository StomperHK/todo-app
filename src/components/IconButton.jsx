export function IconButton({ children, className="",  sm=false, ...props }) {
  className = `${sm ? "p-1" : "p-2"} border-2 rounded border-zinc-500 bg-zinc-700 transition-colors duration-150 active:bg-zinc-600 active:bg-opacity-80` + " " + className

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}