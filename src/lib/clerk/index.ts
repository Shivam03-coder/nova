"use server";

import { currentUser } from "@clerk/nextjs/server";

export async function GetUserInfo() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const { emailAddresses, firstName, lastName } = user;

  const username = `${firstName} ${lastName}`.trim();

  const plainEmailAddresses = emailAddresses.map((items) => {
    return items.emailAddress;
  });

  return {
    username,
    useremail: plainEmailAddresses,
  };
}
