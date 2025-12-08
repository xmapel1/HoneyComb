import { useState, useEffect } from "react";
import TagSelector from "../components/TagSelector";
import ImageCard from "../components/ImageCard";
import "../style/Gallery.css";

export type ImageType = {
  id: number;
  url: string;
  tags: string[];
};

function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/images.json")
      .then((res) => res.json())
      .then((data: ImageType[]) => {
        const shuffled = data.sort(() => Math.random() - 0.5);
        setImages(shuffled);

        const tags = new Set<string>();
        data.forEach((img) => img.tags.forEach((tag) => tags.add(tag)));
        setTags(["All", ...tags]);
      });
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
