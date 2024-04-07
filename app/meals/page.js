import Link from "next/link";
import classes from "./meals-page.module.css";

import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

// now we want instead of the whole page waiting for the meal to
//be fetched only meal section should show the loader while the header
// is being shown immediately
// first create another component to fetch data
export async function Main() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

// since nextjs is a fullstack we can use async
export default async function Meals() {
  // in nextjs since it a fullstack and front and backend runs smoothly together
  //  we dont need to fetch data and use useEffect() instead we can just get data
  // directly and its best to create a lib folder at the root so u can use the
  // get the data u want

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favourite recipe andcook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching data ...</p>}
        >
          <Main />
        </Suspense>
      </main>
    </>
  );
}
