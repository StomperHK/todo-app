export function Input({ textarea=false, className="", ...props }) {
  className = "py-1.5 px-3 border-2 rounded border-zinc-500 bg-transparent outline-none resize-none transition-colors duration-150 focus:border-zinc-300" + " " + className

  if (textarea) return (
    <textarea className={className} rows="5" {...props} />
  )
  else return (
    <input className={className} {...props} />
  )
}