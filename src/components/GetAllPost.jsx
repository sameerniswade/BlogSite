import React, { useEffect } from "react";
import services from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { putAllPost, removePost } from "../store/authSlice";
import { Button } from "./index";
import { useNavigate } from "react-router-dom";
function GetAllPost() {
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.allPost);
  const navigate = useNavigate();

  useEffect(() => {
    services.getAllPost().then((res) => {
      if (res.documents) {
        // console.log("h", res.documents);
        res.documents.map((item) => {
          const { $id, title, content, featuredImage, status, userId } = item;
          services.getImage(featuredImage).then((res) => {
            if (res) {
              const data = {
                $id: $id,
                title: title,
                content: content,
                featuredImage: featuredImage,
                status: status,
                userId: userId,
                imageUrl: res.href,
              };

              dispatch(putAllPost(data));
            }
          });
        });
      }
    });
  }, []);

  const handleDelete = (id) => {
    services.getPost(id).then((res) => {
      if (res) {
        services.deleteImage(res.featuredImage).then((res) => {
          if (res) {
            services.deletePost(id).then((res) => {
              if (res) {
                const posts = allPost.filter((post) => {
                  return post.$id != id;
                });
                dispatch(removePost(posts));
              }
            });
          }
        });
      }
    });
  };
  return (
    <div className="flex gap-3 flex-wrap">
      {allPost.map((post) => (
        <div
          key={post.imageUrl}
          className="gap-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src={post.imageUrl} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {post.content}
            </p>
          </div>
          <div>
            <Button onClick={() => navigate(`/updatepost/${post.$id}`)}>
              Update
            </Button>
            <Button onClick={() => handleDelete(post.$id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetAllPost;

{
  /* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#">
  <img class="rounded-t-lg" src={post.imageUrl} alt="" />
</a>
<div class="p-5">
  <a href="#">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {post.title}
    </h5>
  </a>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
    {post.content}
  </p>
</div>
</div>; */
}
