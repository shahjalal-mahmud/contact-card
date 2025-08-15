import { useState } from "react";

export default function Bio({ text, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    onSave(editText);
    setIsEditing(false);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
        {editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-ghost"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Bio
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary"
            rows="6"
            placeholder="Tell us about yourself, your background, and your goals..."
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save Bio
            </button>
          </div>
        </div>
      ) : (
        <div className="prose max-w-none dark:prose-invert">
          {text ? (
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {text}
            </p>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <p className="text-gray-400">
                {editable ? "You haven't added a bio yet." : "No bio available."}
              </p>
              {editable && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Add Bio
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}