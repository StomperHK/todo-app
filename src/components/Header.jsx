import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { IconButton } from "./IconButton"
import { SocialLinks } from "./SocialLinks"
import { Sun, Moon } from "react-feather"

import { testLocalStorageAvaliability } from "../lib/testLocalStorageAvaliability"

function ColorThemeSwitch() {
  const [colorTheme, setColorTheme] = useState("dark")
  const themeHasBeenLoaded = useRef(false)


  useEffect(manageColorTheme, [colorTheme])


  function manageColorTheme() {
    if (!themeHasBeenLoaded.current) {
      loadTheme()
    }
    else {
      saveTheme()
    }
  }

  function loadTheme() {
    const localStorageIsAvaliable = testLocalStorageAvaliability().status === "sucess"

    if (localStorageIsAvaliable) {
      const colorTheme = localStorage.getItem("color-theme")
      themeHasBeenLoaded.current = true
      
      if (colorTheme) setColorTheme(colorTheme)
      
    }
  }

  function saveTheme() {
    
    localStorage.setItem("color-theme", colorTheme)
  }


  function toggleColorTheme() {
    const newColorTheme = colorTheme === "light" ? "dark" : "light"

    setColorTheme(newColorTheme)
  }

  function updateColorThemeOnClass() {
    document.querySelector("body").className = colorTheme
  }

  updateColorThemeOnClass()

  return (
    <IconButton onClick={toggleColorTheme} role="switch" aria-checked={colorTheme === "dark" ? "true" : "false"} aria-label="tema da página está escuro" className="rounded-full active:bg-zinc-500">
      {colorTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  )
}

export function Header() {
  return (
    <header className="px-5 py-4">
      <div className="flex justify-between items-center max-w-5xl m-auto">  {/* flex-wrapper */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-white"> TODO APP</Link>
        <nav className="flex gap-4">
          <SocialLinks />

          <ColorThemeSwitch />
        </nav>
      </div>
    </header>
  )
}
