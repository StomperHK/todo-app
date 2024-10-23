import { useState } from "react"
import { Link } from "react-router-dom"

import { IconButton } from "./IconButton"
import { Sun, Moon, Edit2 } from "react-feather"

function ColorThemeSwitch() {
  const [colorTheme, setColorTheme] = useState("dark")

  function toggleColorTheme() {
    const newColorTheme = colorTheme === "light" ? "dark" : "light"

    setColorTheme(newColorTheme)
  }

  function updateColorThemeOnClass() {
    document.querySelector("body").className = colorTheme
  }

  updateColorThemeOnClass()

  return (
    <IconButton className="rounded-full" onClick={toggleColorTheme}>
      {colorTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  )
}

export function Header() {
  return (
    <header className=" px-5 py-3">
      <div className="flex justify-between items-center max-w-5xl m-auto">  {/* flex-wrapper */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-white"><Edit2 size={20} /> TODO APP</Link>
        <div className="h-fit">
          <ColorThemeSwitch />
        </div>
      </div>
    </header>
  )
}
