import { useState } from "react";

export default function BasicInfo({ name, profession, location, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name, profession, location });

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            value={editData.profession || ""}
            onChange={(e) => setEditData({ ...editData, profession: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Profession"
          />
          <input
            type="text"
            value={editData.location || ""}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Location"
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
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{name}</h1>
          {profession && <p className="text-xl">{profession}</p>}
          {location && <p className="text-gray-600">{location}</p>}
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-sm btn-ghost"
            >
              ✏️ Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}