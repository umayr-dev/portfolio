const API_URL = "https://7b46c7ce9215a6d8.mokky.dev/blog";

export const fetchBlogs = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

export const createBlog = async (blog: { title: string; content: string }) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    throw new Error("Failed to create blog");
  }
  return response.json();
};

export const updateBlog = async (id: string, blog: { title: string; content: string }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    throw new Error("Failed to update blog");
  }
  return response.json();
};

export const deleteBlog = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }
  return response.json();
};