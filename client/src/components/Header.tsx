import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Code, Computer, Container, LogIn, LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useLogoutUserMutation } from "@/redux/slices/api"
import handleError from "@/utils/handleError"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"


const Header = () => {
  const [logoutUser] = useLogoutUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((store: RootState) => store.appSlice.isLoggedIn)
  const currentUser = useSelector((store: RootState) => store.appSlice.currentUser)

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      dispatch(updateIsLoggedIn(false))
      dispatch(updateCurrentUser({}))
      navigate("/")
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 dark:bg-black backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border flex justify-between items-center py-4 px-4 md:px-10 h-[60px]">
      <Link to="/">
      <h2 className="font-bold select-none flex gap-2">
        <Container />
        CodeOrbit
      </h2>
      </Link>
      <ul className="flex gap-3">
        <li>
          <Link to='/compiler'><Button className= "hidden sm:flex" variant='outline'>Compiler</Button></Link>
        </li>
        {isLoggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="capitalize bg-yellow-500 text-slate-900">{currentUser.username?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                <Link to="/compiler">
                  <DropdownMenuItem className="sm:hidden">
                  <Computer />
                    <span>Compiler</span>
                  </DropdownMenuItem>
                  </Link>
                  <Link to="/my-codes">
                  <DropdownMenuItem>
                    <Code />
                    <span>My Codes</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <li>
            <Link to='/signup'><Button size="icon" variant='blue'><LogIn /></Button></Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Header
