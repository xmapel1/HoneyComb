import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpLoader = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const user_id = Number(localStorage.getItem("user_id"));

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const newCell = {
      image_url: imageUrl,
      user_id: user_id,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await fetch("http://localhost:3000/api/cells", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCell),
      });
      console.log("cell added");

      console.log("navigating to /");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Could not upload cell");
    }
  }

  return (
    <div className="uploader">
      <form className="uploader-content" onSubmit={handleUpload}>
        <h2>Upload cell</h2>

        <input
          type="text"
          className="file-input"
          placeholder="image url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          type="text"
          className="tag-input"
          placeholder="tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit" className="upload-button">
          upload
        </button>

        {error && <p className="upload-error">{error}</p>}
      </form>
    </div>
  );
};

export default UpLoader;
