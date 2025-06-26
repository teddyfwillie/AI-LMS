"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";

// Client component that uses useSearchParams
import PaymentVerification from "./payment-verification";

export default function PaymentSuccessPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Loading Payment Details...
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Please wait while we verify your payment...
          </p>
        </div>
      }>
        <PaymentVerification />
      </Suspense>
    </div>
  );


}
