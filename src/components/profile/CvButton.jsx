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
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-base-content">Curriculum Vitae</h2>
      </div>
      
      <div className="bg-base-100 p-6 rounded-box shadow-sm border border-base-200">
        {editable ? (
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Upload your CV</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  accept=".pdf,.doc,.docx"
                />
                {isUploading && <span className="loading loading-spinner loading-md"></span>}
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">PDF, DOC, or DOCX files accepted</span>
              </label>
            </div>
          </div>
        ) : hasCv ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-base-content">Professional CV</h3>
                <p className="text-sm text-base-content/70">Ready to download</p>
              </div>
            </div>
            <button className="btn btn-primary gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-base-content/70">No CV uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}