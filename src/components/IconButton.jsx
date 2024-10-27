export function IconButton({ children, className="",  sm=false, ...props }) {
  className = `${sm ? "p-1" : "p-2"} border-2 rounded border-zinc-500 bg-zinc-800 transition-colors duration-150  active:bg-opacity-40` + " " + className

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}