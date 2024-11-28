import { BackgroundBeams } from "@/components/ui/background-beams"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Link } from "react-router-dom"
 
const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
})

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  })

  function handleLogin(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="h-[41.5rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
       <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-16 bg-white dark:bg-zinc-900 flex flex-col gap-3">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold">Login</h1>
        <p className="text-neutral-400 text-xs text-center ">
        Welcome Back Coders!
        </p>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="z-20 w-7/14">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username or email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
      </form>
    </Form>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4 z-20">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">signup</Button>
      </form>
    </Form>
   <div className="text-xs text-center text-neutral-200">Don't Have an Account? <span><Link to='/signup' className="text-blue-600">Signup</Link></span></div>
    </BackgroundGradient>
    <BackgroundBeams />

    </div>
  )
}

export default Login