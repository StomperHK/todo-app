import { useEffect } from "react"
import { Link } from "react-router-dom"

import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { UserX, ThumbsUp, WifiOff, ArrowRight} from "react-feather"

import { useLocation } from "react-router-dom";
import styles from "./css/index.module.css"
import progressiveSVG from "../assets/progressive.svg"

export function LandingPage() {
  const {mountainBackground, featuresList} = styles
  const location = useLocation()

  useEffect(showLandingPage, [location])

  function toggleTransitionClasses(element, operation) {
    const classes = element.dataset.jsAnimations.split(" ")

    switch (operation) {
      case "add":
        classes.forEach(className => element.classList.add(className))
        break
      case "remove":
        classes.forEach(className => element.classList.remove(className))
        break
    }
  }

  function showLandingPage() {
    const hiddenSections = Array.from(document.querySelectorAll(".transition-transform-opacity"))
    
    hiddenSections.forEach((section) => toggleTransitionClasses(section, "add"))
    setTimeout(() => hiddenSections.forEach((section) => toggleTransitionClasses(section, "remove")))
  }

  return (
    <>
      <Header />
      <main className={`${mountainBackground} full-height-minus-header overflow-x-hidden`}>
        <div className="max-w-7xl m-auto">
          <figure className="flex justify-evenly gap-10 items-center min-h-[80vh] px-10 pt-16 pb-10 max-1000:flex-col max-1000:min-h-0">
            <figcaption data-js-animations="opacity-5 -translate-x-20" className="w-[40%] opacity-5 -translate-x-20 transition-transform-opacity delay-300 duration-500 max-1000:w-[100%] max-1000:max-w-[600px]">
              <h1 className="mb-4 max-520:text-4xl">Gerencie suas Tarefas de Forma Simples</h1>
              <p className="mb-6 text-lg">
                Sem login, sem recursos complexos, apenas o essencial para você ser mais produtivo. É tudo tão simples quanto essa página.
              </p>
              <div className="max-700:flex max-700:justify-center">
                <Link to="/todo-app"><Button tabindex="-1" className="text-white border-zinc-500 bg-zinc-800">começar a usar <ArrowRight size={20} /></Button></Link>
              </div>
            </figcaption>

            <img src={progressiveSVG} data-js-animations="opacity-5 translate-x-20" className="remove-invert-filter w-[45%] opacity-5 translate-x-20 transition-transform-opacity delay-300 duration-500 max-1000:w-[100%] max-1000:max-w-[600px]" />
          </figure>

          <ul data-js-animations="opacity-5 -translate-y-20" className={`${featuresList} flex justify-center gap-6 items-center px-6 opacity-5 -translate-y-20 transition-transform-opacity delay-500 duration-500 max-700:flex-col max-700:pb-12`}>
            <li>
              <UserX size={20} />
              <h2 className="text-lg">Sem logins chatos</h2>
            </li>
            <li>
              <ThumbsUp size={20} />
              <h2 className="text-lg">Fácil de usar</h2>
            </li>
            <li>
              <WifiOff size={20} />
              <h2 className="text-lg">Funciona off-line</h2>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}