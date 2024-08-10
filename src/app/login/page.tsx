import LoginForm from "@/components/loginform";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <>
      <LoginForm />
      <div className="w-48 mx-auto mb-4">
        <Button type="submit" className="flex w-full justify-center border border-teal-400 rounded-full  px-3 py-1.5 text-md font-semibold leading-6 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Sign in with GitHub</Button>
      </div>
      <div className="w-48 mx-auto mb-4">
        <Button
          type="submit"
          className="flex w-full justify-center border border-teal-400 rounded-full  px-3 py-1.5 text-md font-semibold leading-6 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Sign in with Google
        </Button>
      </div>
    </>
  )
}




