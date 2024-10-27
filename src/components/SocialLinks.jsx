import { Link } from "react-router-dom"
import { IconButton } from "./IconButton"

import { GitHub, Linkedin } from "react-feather"


export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <Link to="https://github.com/StomperHK" target="_blank"><IconButton tabindex="-1" className="active:bg-zinc-500"><GitHub size={20}/></IconButton></Link>
      <Link to="https://www.linkedin.com/in/rafael-ribeiro-7148942a1" target="_blank"><IconButton tabindex="-1" className="active:bg-zinc-500"><Linkedin size={20}/></IconButton></Link>
    </div>
  )
}