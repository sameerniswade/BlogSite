import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Image, Button, Input, RTE, GetImage } from "./index";
import RTEInput from "./RTEInput";
import services from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function PostCreater() {
  const [imageSource, setImageSource] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [getTitle, setTitle] = useState("");
  const userData = useSelector((state) => state.userData);
  const ref = useRef(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState,
    control,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      image: [],
      title: "",
      RTEInput: "",
      slug: "",
    },
  });

  //handle image part

  useEffect(() => {
    if (imageSource) {
      setImagePreview(URL.createObjectURL(imageSource[0]));
    }
  }, [imageSource, setImagePreview, imageSource]);

  // for slug creation
  const slugCreater = useCallback(
    (title) => {
      return title.trim().replace(/\s+/g, "-").toLowerCase();
    },
    [getTitle]
  );
  //
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "title") {
        setValue("slug", slugCreater(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugCreater, setValue]);

  //handle forms
  const onSubmit = async (data) => {
    const imageStatus = await services.uploadImage(data.image[0]);
    if (imageStatus) {
      const d = {
        title: data.title,
        content: data.RTEInput,
        featuredImage: imageStatus.$id,
        status: "enable",
        userId: userData.$id,
        slug: data.slug,
      };
      const postStatus = await services.createPost(d);
      if (postStatus) {
        console.log(postStatus);
        navigate("/home");
      }
    }
  };

  return (
    <div className="centerElement">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {imageSource ? (
          <img className="h-96 m-2" src={imagePreview} />
        ) : (
          <GetImage
            control={control}
            setValue={setValue}
            setImageSource={setImageSource}
          />
        )}
        <div className=" w-3/4">
          <label>Enter title</label>
          <input
            className={`border-black border-2 text-black `}
            {...register("title", {
              required: true,
            })}
          />
        </div>

        <RTEInput control={control} />

        <Button type="submit" className="m-2">
          Post
        </Button>
      </form>
    </div>
  );
}

export default PostCreater;
