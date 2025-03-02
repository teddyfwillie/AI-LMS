"use client";

import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import axios from "axios";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      user && CheckIsNewUser();
    }
  }, [user]);

  const CheckIsNewUser = async () => {
    // check is user already exist in database
    // const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

    // console.log(result);

    // if (result.length == 0) {
    //     // if not exist then create new user
    //     const userResp = await db.insert(USER_TABLE).values({
    //         name: user?.fullName,
    //         email: user.primaryEmailAddress?.emailAddress,
    //     }).returning({id: USER_TABLE.id})
    //     console.log(userResp)
    // }

    const resp = await axios.post("/api/create-user", { user: user });
    console.log(resp.data);
  };

  return <div>{children}</div>;
}

export default Provider;
