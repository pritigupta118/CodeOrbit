import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Container } from "lucide-react"

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 dark:bg-black backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border flex justify-between items-center p-4 h-[60px]">
      <h2 className="font-bold select-none flex gap-2">
        <Container />
        CodeOrbit
      </h2>
      <ul className="flex gap-2">
        <li>
          <Link to='/compiler'><Button variant='outline'>Compiler</Button></Link>
        </li>
        <li>
          <Link to='/signup'><Button variant='blue'>Sign up</Button></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
