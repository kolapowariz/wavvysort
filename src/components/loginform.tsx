'use client'
import { emailLogin } from "@/app/login/action";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { LoginFormInput } from "@/types/types";
// import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";


const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 character'
  })
})


export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const result = await emailLogin(data)
  
      if (result && !result.success) {
        setError(result.error ?? null);
        return;
      }

      setError(null)
      
    } catch (error) {
      console.error('Error during login:', error)
      setError('An unexpected error occurred. Please try again.')
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href='/'>

            <Image
              alt="Your Company"
              src="/image.svg"
              width={60}
              height={60}
              className="mx-auto h-10 w-auto"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900">Email</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe@gmail.com' type="email"{...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900">Password</FormLabel>
                    <section className="relative">
                      <FormControl>
                        <Input placeholder='Enter your password' type={showPassword ? 'text' : 'password'}  {...field} />
                      </FormControl>
                      <button type='button' onClick={togglePassword} className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5">{showPassword ? 'Hide' : 'Show'}</button>
                    </section>
                    <FormMessage className="text-red-500" />
                    <div className="text-sm mt-2 text-right">
                      <Link href="#" className="font-semibold text-blue-400 hover:text-blue-500">
                        Forgot password?
                      </Link>
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Sign In</Button>
              
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </Form>

        </div>
      </div>
    </>
  )
}




// <form action='' className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white p-2"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between dark:text-white">
//                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
//                   Password
//                 </label>
//                 <div className="text-sm">
//                   <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   autoComplete="current-password"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white p-2"
//                 />
//               </div>
//             </div>

//             <div>
//               <Button formAction={emailLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type='submit'>Sign In</Button>
//             </div>
//           </form>