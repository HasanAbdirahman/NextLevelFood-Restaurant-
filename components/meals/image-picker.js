"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const inputRef = useRef();
  const [imagePicked, setImagePicked] = useState();

  function handleClick() {
    inputRef.current.click();
  }

  function handleChange(event) {
    // we first pick the image
    let file = event.target.files[0];
    if (!file) {
      setImagePicked(null);
      return;
    }
    // we will have to convert the file into data URL
    // And we can generate such a data URL with help of a class
    // built into JavaScript, the file reader class.
    // it reads our file and
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImagePicked(fileReader.result);
    };
    // since this method readAsDataURL does not return and its
    // void we have to change the setImageSelected in the above method.
    // File is converted to data URL
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!imagePicked && <p>No image picked yet.</p>}
          {imagePicked && (
            <Image src={imagePicked} alt="Image selected by the user." fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          ref={inputRef}
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleChange}
          required
        />
        <div className={classes.controls}>
          <button
            type="button"
            className={classes.button}
            onClick={handleClick}
          >
            Pick Up an Image
          </button>
        </div>
      </div>
    </div>
  );
}
