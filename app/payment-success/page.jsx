"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [updateStatus, setUpdateStatus] = useState({
    loading: true,
    success: false,
    error: null
  });

  // Verify and update payment record in database
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    
    if (sessionId) {
      const verifyPayment = async () => {
        try {
          // Call our API to verify and update the payment record
          const response = await axios.post("/api/payment/verify", { sessionId });
          console.log("Payment verification response:", response.data);
          setUpdateStatus({
            loading: false,
            success: true,
            error: null
          });
        } catch (error) {
          console.error("Payment verification failed:", error);
          setUpdateStatus({
            loading: false,
            success: false,
            error: error.message || "Failed to verify payment"
          });
        }
      };

      verifyPayment();
    } else {
      setUpdateStatus({
        loading: false,
        success: false,
        error: "No session ID found"
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          {updateStatus.loading ? (
            <div className="h-16 w-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin" />
          ) : updateStatus.success ? (
            <CheckCircle className="h-16 w-16 text-green-500" />
          ) : (
            <div className="h-16 w-16 text-yellow-500 flex items-center justify-center border-2 border-yellow-500 rounded-full">!</div>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {updateStatus.loading ? "Processing Payment..." : 
           updateStatus.success ? "Payment Successful!" : 
           "Payment Verification Issue"}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300">
          {updateStatus.loading ? "Please wait while we verify your payment..." :
           updateStatus.success ? "Thank you for your payment. Your account has been upgraded and 20 credits have been added to your account." :
           `There was an issue verifying your payment: ${updateStatus.error}. Don't worry, if your payment was successful, our system will update your account shortly.`}
        </p>
        
        <div className="pt-4">
          <Link href="/dashboard">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={updateStatus.loading}>
              Go back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
