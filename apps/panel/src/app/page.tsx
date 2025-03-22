'use client'
import { Button, Input, Logo, Text } from "@repo/ui/units";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    login(email, password)
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.message)
      })
  }
  return (
    <div className="flex items-center justify-around  h-screen bg-brand-darkblue-5">
      <div>
        <div className=" h-12">

          <Logo variant="light" />
        </div>
        <Text variant="title_2">Welcome to the Panel</Text>
        <Text variant="paragraph">hcakigali website adminstration portal</Text>
      </div>
      <div className="flex flex-col gap-3 px-10 py-16 min-w-[400px] bg-white border rounded-md border-brand-darkblue-10 shadowed">
        <div className="flex flex-col gap-2 my-3">
          <Text variant={'heading3'}>Login to panel</Text>
          <Text variant={'paragraph'}>Enter your credentials to continue</Text>

        </div>

        <Input<string> inputType="text" label="Email address" placeholder="Your email" _controller={{
          initialValue: email,
          value: email,
          setValue: setEmail
        }} />
        <Input<string> inputType="password" label="Password" placeholder="Your password" _controller={{
          initialValue: password,
          value: password,
          setValue: setPassword
        }} />
        <div className="flex items-end">
          <Link href={'/forgot-password'}><Text variant={'label'} className="text-brand-darkblue">Forgot password?</Text></Link>
        </div>
        <Button variant="primary" className="w-full" onClick={handleLogin} loading={loading}>Login</Button>
      </div>

    </div >
  )
}