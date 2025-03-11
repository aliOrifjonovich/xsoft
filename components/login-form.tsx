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
import { post } from "@/lib/request";

interface LoginFormInputs {
  phonenumber: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();

  // Function to handle login
  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const { result, ok } = await post<{ access: string }>("/token/", {
        identifier: data.phonenumber,
        password: data.password,
      });

      if (ok) {
        Cookies.set("token", result.access, { expires: 1, secure: true });
        router.push("/");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
          Enter your phone number and password to access your account.
        </p>
      </div>
      <div className="grid gap-6">
        {/* Phone Number Field */}
        <div className="grid gap-3">
          <Label htmlFor="phonenumber">Telefon raqam</Label>
          <Input
            id="phonenumber"
            type="text"
            placeholder="+99890 123 45 67"
            {...register("phonenumber", { required: true })}
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
