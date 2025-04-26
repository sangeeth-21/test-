'use client';

import { Suspense } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import ImageCarousel from "@/components/carosel";
import ForgotPassword from "@/components/forget-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Image Carousel for Large Screens */}
      <div className="relative hidden lg:block">
        <ImageCarousel />
      </div>

      {/* Forgot Password Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Events Inc.
          </a>
        </div>

        {/* Forgot Password Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<p>Loading...</p>}>
              <ForgotPassword />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
