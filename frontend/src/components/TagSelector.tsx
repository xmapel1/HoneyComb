interface TagSelectorProps {
  tags: string[];
  selectedTag: string;
  onTagClick: (tag: string) => void;
}

function TagSelector({ tags, selectedTag, onTagClick }: TagSelectorProps) {
  return (
    <div>
      {tags.map((tag, index) => (
        <button
          key={index}
          className="tagbutton"
          style={{
            backgroundColor: selectedTag === tag ? "black" : "white",
            color: selectedTag === tag ? "white" : "black",
          }}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagSelector;
