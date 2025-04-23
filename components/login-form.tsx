"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PhoneInput } from "./ui/phone-input";
import { API_CONFIG, apiService, setAuthToken } from "@/lib/api-client";

interface LoginFormInputs {
  phonenumber: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();

  // Function to handle login
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      console.log("Login attempt with:", { phone: phoneNumber, password: data.password });
      
      const result = await apiService.post(API_CONFIG.ENDPOINTS.LOGIN, {
        identifier: phoneNumber,
        password: data.password,
      });
      
      console.log("Login result:", result);
  
      // Store the token using our centralized helper
      setAuthToken(result.access);
  
      toast.success("Login muvaffaqiyatli amalga oshirildi", {
        position: "top-right",
        closeButton: true,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
  
      await router.push("/"); 
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        closeButton: true,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
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
          <PhoneInput
            onChange={setPhoneNumber}
            value={phoneNumber}
            defaultCountry="UZ"
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
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {loading ? (
            <span className="loader">
              <Loader2 className="animate-spin h-4 w-4" />
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </form>
  );
}
