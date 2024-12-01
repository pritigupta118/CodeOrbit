import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Loading from "./components/loader/Loading"



 const Home = lazy(() => import("./pages/Home"))
 const Signup = lazy(() => import("./pages/Signup"))
 const Login = lazy(() => import("./pages/Login"))
 const NotFound = lazy(() => import("./pages/NotFound"))
 const Compiler = lazy(() => import("./pages/Compiler"))
 const MyCodes = lazy(()=> import ("./pages/MyCodes"))


const AllRoutes = () => {
  return (
    <Suspense fallback= {<div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
      <Loading/>
      </div>}>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="//my-codes" element={<MyCodes/>} />
        <Route path="/compiler/:urlId?" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AllRoutes
