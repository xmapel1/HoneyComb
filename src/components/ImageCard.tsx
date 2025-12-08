import type { ImageType } from "../pages/Gallery";

interface ImageCardProps {
  image: ImageType;
}

function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="imagecard">
      <img src={image.url} />
      <div className="tags">
        {image.tags &&
          image.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
}

export default ImageCard;
