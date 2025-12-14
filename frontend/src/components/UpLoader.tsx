import { useState } from "react";

const UpLoader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = () => {
    if (file) {
      setStatus("upload successful");
    }
  };

  return (
    <div className="uploader">
      <input
        type="file"
        className="file-input"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button className="upload-button" onClick={handleUpload}>
        upload
      </button>

      {status && <p className="upload-status">{status}</p>}
    </div>
  );
};

export default UpLoader;
