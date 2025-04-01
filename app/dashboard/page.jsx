import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import CourseList from "./_components/CourseList";
import Upgrade from "./upgrade/page";

function page() {
  return (
    <div>
      <WelcomeBanner />
      <CourseList />
    </div>
  );
}

export default page;
