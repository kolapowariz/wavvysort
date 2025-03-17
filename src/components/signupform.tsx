'use client'
import { signUp } from "@/app/login/action";
import { Button } from "@/components/ui/button";
import { SignUpInput } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
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
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { handleProfileImageUpload } from "./profileimageupload";



const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 character'
  }),
  firstname: z.string().min(1, {
    message: 'Input a valid name'
  }),
  lastname: z.string().min(1, {
    message: 'Input a valid name'
  }),
  avatarUrl: z.string().url({ message: 'Invalid URL' })

})


export default function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      avatarUrl: ''
    }
  })

  const onSubmit = async (data: SignUpInput) => {
    setLoading(true)
    try {
      const result = await signUp(data)

      if (!result.success) {
        setError(result.error ?? 'Signup failed. Please try again.');
        return;
      }

      setError(null)
    } catch (error) {
      console.error('Error during signup:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally{
      setLoading(false)
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
                      <button type='button' onClick={togglePassword} className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeNoneIcon width={20} /> : <EyeOpenIcon width={20} />}</button>
                    </section>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='avatarUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Avatar</FormLabel>
                    <section className="flex items-center space-x-2">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          onError={() => setAvatarUrl(null)}
                          width={50}
                          height={50}
                          alt="Avatar"
                          className="rounded-full"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 text-xs text-center">No Image</span>
                        </div>
                      )}
                      <FormControl>
                        <Input type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              try {
                                const url = await handleProfileImageUpload(e.target.files[0]);
                                if (url) {
                                  setAvatarUrl(url);
                                  field.onChange(url);
                                } else {
                                  setError('Failed to upload avatar. Please try again')
                                }

                              } catch (uploadError) {
                                setError('An error occurred during the upload')
                              }
                            }
                          }} />
                      </FormControl>
                    </section>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button type='submit' className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</Button>

              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </Form>

        </div>
      </div>
    </>
  )

}