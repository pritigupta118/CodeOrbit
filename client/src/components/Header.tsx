import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border flex justify-between items-center p-4 h-[60px]">
      <h2 className="font-bold select-none">
      Dev Compiler
      </h2>
      <ul className="flex gap-2">
        <li>
          <Link to='/compiler'><Button variant='outline'>Compiler</Button></Link>
        </li>
      </ul>
       </nav>
  )
}

export default Header
