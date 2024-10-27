'use client'
import { signUp } from "@/app/login/action";
import { Button } from "@/components/ui/button";
import { SignUpInput } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address'}),
  password: z.string().min(4, {
    message: 'Password must be at least 4 character'
  }),
  firstname: z.string().min(1, {
    message: 'Input a valid name'
  }),
  lastname: z.string().min(1, {
    message: 'Input a valid name'
  })

})


export default function SignupForm() {
  const [error, setError] = useState<string | null >(null)
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  })

  const onSubmit = async (data: SignUpInput) => {
    try {
      const result = await signUp(data)

      if( result && !result.success) {
        setError(result.error ?? null);
        return;
      }

      setError(null)
    } catch (error) {
      console.error('Error during signup:', error)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href='/'>

            <Image
              alt="Your Company"
              src="/image.svg"
              className="mx-auto h-10 w-auto"
              width={70}
              height={70}
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Create your account
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
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe@gmail.com' type="email"{...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder='john' type="text"{...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder='doe' type="text"{...field} />
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
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Password</FormLabel>
                    <section className="relative">
                      <FormControl>
                        <Input placeholder='Enter your password' type={showPassword ? 'text' : 'password'}  {...field} />
                      </FormControl>
                      <button type='button' onClick={togglePassword} className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5">{showPassword ? 'Hide' : 'Show'}</button>
                    </section>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button type='submit' className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Sign Up</Button>
              
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </Form>
          
        </div>
      </div>
    </>
  )
  
}