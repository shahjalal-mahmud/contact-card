import { useState } from "react";

export default function CvButton({ hasCv, editable, onUpload }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      setIsUploading(true);
      await onUpload(e.target.files[0]);
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4">
      {editable ? (
        <div className="flex items-center gap-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered"
            accept=".pdf,.doc,.docx"
          />
          {isUploading && <span className="loading loading-spinner"></span>}
        </div>
      ) : hasCv ? (
        <button className="btn btn-primary">Download CV</button>
      ) : (
        <p>No CV uploaded</p>
      )}
    </div>
  );
}