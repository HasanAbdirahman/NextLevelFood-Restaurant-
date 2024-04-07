"use server"; // now the every function here will run on the server
// there are several ways u can post the form
//  u can use the react way where we use onSubmit and post data but nextjs
//  uses different and easier tactic

// use server is opposite of use client. in nextJs components run on the server
// use client eg having event handler changes components from server component to client
// component while use use server  always used on functions and must have async/await
// these functions will run only in the server side.
// REMEMBER if the component is use client u cannot use that with functions that
// are use server so it is best to store the function in another folder ie lib
export async function shareMeal(formData) {
  // the "title", "summary" => These are the names that are issued in the form
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  console.log(meal);
}
