"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// import { addBook } from "../../api/book";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published_year: 0,
    isbn: "",
    pages: 0,
    cover: "",
    language: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "published_year" || name === "pages" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Uncomment and use the addBook API when available
      // await addBook(formData);
      console.log("Book added:", formData);
      router.push("/books");
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div>
        <label>Published Year:</label>
        <input type="number" name="published_year" value={formData.published_year} onChange={handleChange} required />
      </div>
      <div>
        <label>ISBN:</label>
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
      </div>
      <div>
        <label>Pages:</label>
        <input type="number" name="pages" value={formData.pages} onChange={handleChange} required />
      </div>
      <div>
        <label>Cover:</label>
        <input type="text" name="cover" value={formData.cover} onChange={handleChange} required />
      </div>
      <div>
        <label>Language:</label>
        <input type="text" name="language" value={formData.language} onChange={handleChange} required />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
