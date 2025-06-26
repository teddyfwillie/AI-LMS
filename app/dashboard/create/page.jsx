"use client";

import React, { useState, useEffect } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

function Page() {
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [courseCount, setCourseCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const router = useRouter();
  
  // Fetch user data and course count
  useEffect(() => {
    async function fetchUserData() {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const response = await axios.get(
            `/api/user-details?email=${user.primaryEmailAddress.emailAddress}`
          );
          
          setUserData(response.data.user);
          setCourseCount(response.data.courseCount);
          
          // Check if user has reached their course limit
          const maxCourses = response.data.user.isMember ? 20 : 5;
          setIsLimitReached(response.data.courseCount >= maxCourses);
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data");
        }
      }
    }
    
    fetchUserData();
  }, [user]);

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };

  // Generate Course Outline API Call and save user input in database
  const GenerateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result.data);
      router.replace("/dashboard");
      toast("Course Outline Generated Successfully Please refresh the page");
    } catch (error) {
      console.error("Error generating course outline:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 md:px-24 lg:px-32 mt-20 animate-fade-in">
      {/* Heading Section */}
      <h2 className="text-4xl font-bold text-primary text-center mb-4 dark:text-white">
        Start Building Your Personal Study Material
      </h2>
      
      {isLimitReached ? (
        // Course Limit Reached Message
        <div className="w-full max-w-2xl text-center">
          <div className="p-8 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-400 mb-3">
              Course Creation Limit Reached
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {userData?.isMember 
                ? "You have reached the maximum limit of 20 courses. Please delete some existing courses to create new ones."
                : "You have reached the free limit of 5 courses. Upgrade your account to create up to 20 courses."}
            </p>
            
            {!userData?.isMember && (
              <Link href="/dashboard/upgrade">
                <Button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                  Upgrade Now
                </Button>
              </Link>
            )}
            
            <Link href="/dashboard/course" className="block mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View My Courses
            </Link>
          </div>
        </div>
      ) : (
        // Normal Course Creation Flow
        <>
          <p className="text-gray-500 dark:text-gray-300 text-lg text-center mb-10">
            Fill the details in order to generate study material for you
          </p>

          {/* Course Count Info */}
          <div className="w-full max-w-2xl mb-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You have created {courseCount} out of {userData?.isMember ? 20 : 5} allowed courses
            </p>
          </div>

          {/* Step Content */}
          <div className="w-full max-w-2xl">
            {step === 0 ? (
              <SelectOption
                selectedStudyType={(value) => handleUserInput("courseType", value)}
              />
            ) : (
              <TopicInput
                setTopic={(value) => handleUserInput("topic", value)}
                setDifficultyLevel={(value) =>
                  handleUserInput("difficultyLevel", value)
                }
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-20 w-full max-w-2xl">
            {step !== 0 && (
              <Button
                variant="secondary"
                onClick={() => setStep(step - 1)}
                className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Previous
              </Button>
            )}
            {step === 0 ? (
              <Button
                onClick={() => setStep(1)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={GenerateCourseOutline}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 transition-colors duration-300"
              >
                {loading ? <Loader className="animate-spin mr-2" /> : "Generate"}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
