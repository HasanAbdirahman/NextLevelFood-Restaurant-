import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";

import { getMeal } from "@/lib/meals";

// generate metadata in the slug page u have to have genrateMetadata function and
// as a arguement it takes params same as the component function

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}
// every nextjs component comes with props like eg {params} => like useParams()
export default function MealDetailPage({ params }) {
  // get the meal and the arguement it needs is the params and the name u gave
  // [mealSlug] that will be the key of slug and the actual value encoded at
  // the url will be used as the value.
  const meal = getMeal(params.mealSlug);

  // if meal is not found that means its wrong params then go to the nearest
  //  not found page.
  if (!meal) {
    notFound();
  }
  // introducing line breaks for instructons
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://nextlevelfoodapp.s3.us-east-2.amazonaws.com/${meal.image} `}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* if u dont validate u will open urself  to XSS attacks */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
