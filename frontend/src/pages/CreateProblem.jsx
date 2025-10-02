import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/api/problems", { title, description, location, imageUrl });
    navigate("/");
  };

  return (
    <div className="flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold">Post a Problem</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 w-full"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProblem;
