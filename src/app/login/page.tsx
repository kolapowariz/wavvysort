import LoginForm from "@/components/loginform";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <LoginForm />
      <section>
        <p className="text-center">Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign up</Link></p>
      </section>
    </>
  )
}




