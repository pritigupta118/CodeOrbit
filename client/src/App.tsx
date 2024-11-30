import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Compiler from "./pages/Compiler"
import NotFound from "./pages/NotFound"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useGetUserDetailsQuery } from "./redux/slices/api"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice"
function App() {
  const {data, error} = useGetUserDetailsQuery()
  const dispatch = useDispatch()

  useEffect(()=>{
    if (data) {
      dispatch(updateCurrentUser(data))
      dispatch(updateIsLoggedIn(true))
    }
    else {
      dispatch(updateCurrentUser({}))
      dispatch(updateIsLoggedIn(false))
    }
  },[data, error])

  return (
    <div>
      <Toaster position="bottom-right" theme="dark"/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/compiler/:urlId?" element={<Compiler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
