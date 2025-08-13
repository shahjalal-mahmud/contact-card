import { useState } from "react";

export default function Bio({ text, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    onSave(editText);
    setIsEditing(false);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">About</h2>
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows="4"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-sm btn-primary">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-sm btn-ghost"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="whitespace-pre-line">{text || "No bio added yet"}</p>
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-sm btn-ghost mt-2"
            >
              ✏️ Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}