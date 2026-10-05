import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreatePost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    const formData = new FormData(event.target);

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/create-post",
        formData,
      );

      console.log("Form data submitted successfully:", response.data);
      navigate("/feed");
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to create the post. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gray-950 px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create Post
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Share an image and caption with your community.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-2xl sm:p-7"
        >
          {/* Image Upload */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-200 "
            >
              Upload Image
            </label>

            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              required
              className="block w-full cursor-pointer rounded-xl border border-gray-700 bg-gray-800 text-sm text-gray-300
              file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-3
              file:text-sm file:font-semibold file:text-white
              hover:file:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Caption */}
          <div className="mb-6">
            <label
              htmlFor="caption"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Caption
            </label>

            <textarea
              id="caption"
              name="caption"
              rows="5"
              placeholder="Write something about your post..."
              required
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white
              placeholder:text-gray-500
              focus:border-blue-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500"
            />
          </div>

          {errorMessage && (
            <p className="mb-4 text-sm text-red-400" role="alert">
              {errorMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white
              transition duration-200
              hover:bg-blue-700
            focus:outline-none
            focus:ring-2 cursor-pointer
            focus:ring-blue-500
            focus:ring-offset-2
            focus:ring-offset-gray-900
              active:scale-[0.98]
              disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center gap-2" role="status">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Creating post...
              </span>
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
