// this is the page where fetching the data from db directly
//  without the use of fetch() or axios()
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

// u can use get() to get one and run() will be used when u r changing data
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // u dont need
  // throw new Error("error");
  return db.prepare("SELECT * FROM meals").all();
}

// now we need to fetch the specific meal that we clicked => same as detailPage
//  and we have to make sure we verify and dont open ourself to xss attacks
export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
