"use client";

import classes from "./page.module.css";
import ImagePicker from "@/components/meals/image-picker";
import { useFormState } from "react-dom";
import { shareMeal } from "@/lib/action";
import MealsFormSubmit from "@/components/meals/meals-forms-submit";

export default function ShareMealPage() {
  // useFormState is used to manage the state of this page or this component
  // which uses a form that will be submittrd with the help od server actions
  //  it needs 2 arguement=> actual server action, that should trigger the form
  // submitted and second arguement is the initial state of the page b4 this
  // action is being triggered or yielded a response
  const [state, formAction] = useFormState(shareMeal, { message: null });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker lable="Your Image" name="image" />
          {state.message && <p style={{ color: "red" }}>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
