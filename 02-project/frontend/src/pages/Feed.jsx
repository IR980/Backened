import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const API_BASE_URL = "http://localhost:3000";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Fetching posts from the backend...");

    axios
      .get(`${API_BASE_URL}/posts`)
      .then((response) => {
        console.log("Posts fetched successfully:", response.data);

        setPosts(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <section className="min-h-screen w-full bg-gray-950 text-white px-4 py-8 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-6xl">
        {/* <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Feed</h1> */}

        <p className="mt-2 text-sm text-gray-400">
          Explore the latest posts from the community.
        </p>
      </div>

      {/* Posts */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post._id}
              className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden bg-gray-800">
                <img
                  src={post.image}
                  alt={`Post ${post._id}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm leading-6 text-gray-300">
                  {post.caption}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full flex min-h-75 items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900">
            <div className="text-center">
              <div className="mb-3 text-4xl">📭</div>

              <p className="text-lg font-medium text-gray-300">
                No posts available
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Create your first post to see it here.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
