import SignupForm from "@/components/signupform";
import Link from "next/link";
import React from 'react';


export default function Page() {
  return (
    <>
      <SignupForm />
      <section>
        <p className="text-center">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
      </section>
    </>
  )
}
