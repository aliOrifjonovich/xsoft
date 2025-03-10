"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
interface LoginFormInputs {
  username: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();

  // Function to handle login
  const onSubmit = (data: LoginFormInputs) => {
    const fakeToken = "123456abcdef";
    console.log(data);

    // Save token in cookies (expires in 1 day)
    Cookies.set("token", fakeToken, { expires: 1, secure: true });

    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        {/* Username Field */}
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Example: xsoft"
            {...register("username", { required: true })}
          />
        </div>

        {/* Password Field */}
        <div className="grid gap-3 relative">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
