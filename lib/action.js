"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

// now the every function here will run on the server
// there are several ways u can post the form
//  u can use the react way where we use onSubmit and post data but nextjs
//  uses different and easier tactic

// function helper
function isInvalidText(text) {
  return !text || text.trim() === "";
}

// use server is opposite of use client. in nextJs components run on the server
// use client eg having event handler changes components from server component to client
// component while use use server  always used on functions and must have async/await
// these functions will run only in the server side.
// REMEMBER if the component is use client u cannot use that with functions that
// are use server so it is best to store the function in another folder ie lib
export async function shareMeal(prevState, formData) {
  // the "title", "summary" => These are the names that are issued in the form
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  // checking the form data submitted is invalid in the backedn

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error("Invalid Input");
    // instead of throwing error we can use a better validation by returning an objext
    return {
      message: "Invalid Input",
    };
  }
  await saveMeal(meal);
  // when we are running the production like npm run build then npm start
  //  if we create sthg eg meal what happens is the meal created is not shown
  //  this is bcoz when running build it creates static pages that doesnot recache
  // hence we have to revalidate the path
  // revalidatePath('/meals', layout) => if they are many nested path that depends on the meal do this
  revalidatePath("/meals");
  redirect("/meals");
}
