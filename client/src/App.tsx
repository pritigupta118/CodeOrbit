import Header from "./components/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { useGetUserDetailsQuery } from "./redux/slices/api"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn, updateWindowWidth } from "./redux/slices/appSlice"
import AllRoutes from "./AllRoutes"
function App() {
  const { data, error } = useGetUserDetailsQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data))
      dispatch(updateIsLoggedIn(true))
    }
    else {
      dispatch(updateCurrentUser({}))
      dispatch(updateIsLoggedIn(false))
    }
  }, [data, error])
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
    })

    return () => {
      window.removeEventListener("resize", () => {
        dispatch(updateWindowWidth(window.innerWidth));
      })
    }
  }, [window.innerWidth])

  return (
    <div>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <AllRoutes />
      </ThemeProvider>
    </div>
  )
}

export default App
