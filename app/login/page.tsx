<<<<<<< HEAD
"use client";

import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import bgimage from "../../assets/bgimage.png";

export default function LoginPage() {
=======
import { GalleryVerticalEnd } from "lucide-react";
import bgimage from "../../assets/bgimage.png";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";

export default async function LoginPage() {
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            XSoft Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block ">
        <Image
          src={bgimage}
          alt="system login car renting"
          className="absolute inset-0 h-full w-full object-contain p-4"
        />
      </div>
    </div>
  );
}
