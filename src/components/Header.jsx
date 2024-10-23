import { useState } from "react"

import { IconButton } from "./IconButton"
import { Sun, Moon } from "react-feather"

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
    <header className=" px-5 py-3 bg-zinc-800">
      <div className="flex justify-between items-center max-w-5xl m-auto">  {/* flex-wrapper */}
        <p className="font-rubik">TODO APP</p>
        <div className="h-fit">
          <ColorThemeSwitch />
        </div>
      </div>
    </header>
  )
}