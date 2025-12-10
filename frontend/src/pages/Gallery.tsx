import { useState, useEffect } from "react";
import TagSelector from "../components/TagSelector";
import ImageCard from "../components/ImageCard";
import "../style/Gallery.css";

export type ImageType = {
  id: number;
  url: string;
  tags: string[];
  user_id?: number;
  created_at: string;
};

function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [tags, setTags] = useState<string[]>(["All"]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cells")
      .then((res) => res.json())
      .then((data: any[]) => {
        const mapped = data.map((cell) => ({
          id: cell.id,
          url: `http://localhost:3000/uploads/${cell.image_url}`,
          tags: cell.tags || [],
          user_id: cell.user_id,
          created_at: cell.created_at,
        }));

        setImages(mapped);

        const tagsSet = new Set<string>();
        mapped.forEach((img) =>
          img.tags.forEach((tag: string) => tagsSet.add(tag))
        );
        setTags(["All", ...Array.from(tagsSet)]);
      })
      .catch((err) => console.error("Failed to fetch images:", err));
  }, []);

  const filteredImages =
    selectedTag === "All"
      ? images
      : images.filter((img) => img.tags.includes(selectedTag));

  return (
    <div className="gallery">
      <div className="tagSelector">
        <TagSelector
          tags={tags}
          selectedTag={selectedTag}
          onTagClick={setSelectedTag}
        />
      </div>

      <div className="images">
        {filteredImages.length === 0 ? (
          <p>loading images...</p>
        ) : (
          filteredImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))
        )}
      </div>
    </div>
  );
}

export default Gallery;
