import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import services from "../appwrite/config";
import { useForm } from "react-hook-form";
import Button from "./Button";
function UpdatePost() {
  const { id } = useParams();
  const [postData, setPostData] = useState({});

  const { handleSubmit, register, formState } = useForm();

  useEffect(() => {
    //get Post
    services.getPost(id).then((res) => {
      const data = res;
      if (res) {
        services.getImage(res.featuredImage).then((res) => {
          data.imgUrl = res.href;
          setPostData(data);
        });
      }
    });
  }, []);

  const onSubmit = (data) => {
    if (data.image) {
      services.uploadImage(data.image[0]).then((res) => {
        if (res) {
          services.updatePost(id, data, res.$id).then((res) => {
            if (res) {
              console.log("onsubmit", res);
              services.deleteImage(postData.featuredImage);
            }
          });
        }
      });
    }
    services.updatePost(id, data).then((res) => console.log(res));
  };
  // console.log("post", postData);
  return (
    <div className="flex justify-center items-center h-screen ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <div>
          <label>Title : </label>
          <input
            {...register("title")}
            defaultValue={postData?.title}
            className="text-black"
          />
        </div>
        <div>
          <label>Content : </label>
          <input
            defaultValue={postData?.content}
            className="text-black"
            {...register("content")}
          />
        </div>
        <div>
          <input
            {...register("image")}
            height="100px"
            type="file"
            style={{
              color: "red",
              backgroundImage: `url(${postData.imgUrl})`,
              height: "300px",
              backgroundRepeat: "no-repeat",
              width: "500px",
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdatePost;
