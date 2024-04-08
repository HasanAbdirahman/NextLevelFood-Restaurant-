// this is the page where fetching the data from db directly
//  without the use of fetch() or axios()
import sql from "better-sqlite3";
import slugify from "slugify";
import { S3 } from "@aws-sdk/client-s3";
import xss from "xss";
// import fs from "node:fs";
const s3 = new S3({
  region: "us-east-2",
});

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

//everything is saved here except images cause images is not meant to be stored
//in a database but rather it should be uploaded in the public folder or

//   THIS IS THE WAY OF STORING IMAGES IN THE PUBLIC
// export async function saveMeal(meal) {
//   // converts url to lower case and spaces to hyphens
//   meal.slug = slugify(meal.title, { lower: true });
//   // to remove any harmful characters in text area instruction that can cause xss
//   meal.instructions = xss(meal.instructions);

//   const extension = meal.image.name.split(".").pop();
//   const fileName = `${meal.slug}.${extension}`;

//   // createWriteStream allows us to write data to certain file
//   const stream = fs.createWriteStream(`public/images/${fileName}`);

//   const bufferedImage = await meal.image.arrayBuffer();

//   // require a buffer Image
//   stream.write(Buffer.from(bufferedImage), (error) => {
//     if (error) throw new Error("Saving image failed");
//   });
//   // overiding the image in the database and store the path instead of the image
//   // and remove public cause the images will be sent to the public automatically
//   meal.image = `/images/${fileName}`;

//   // saving the shared meal in the database
//   db.prepare(
//     `
//     INSERT INTO meals
//     (title, summary, instructions, creator, creator_email, image, slug)
//     VALUES
//      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
//     `
//   ).run(meal);
// }

// WE ARE STORING IMAGES IN THE AWS
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "nextlevelfoodapp",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
