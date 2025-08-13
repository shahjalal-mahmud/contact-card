import { useState } from "react";

export default function ContactInfo({ email, phone, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(phone);

  const handleSave = () => {
    onSave({ phone: editPhone });
    setIsEditing(false);
  };

  return (
    <div className="space-y-1">
      <p className="text-gray-600">{email}</p>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editPhone || ""}
            onChange={(e) => setEditPhone(e.target.value)}
            className="input input-bordered input-sm"
            placeholder="Phone number"
          />
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
      ) : (
        <div className="flex items-center gap-2">
          {phone && <p className="text-gray-600">{phone}</p>}
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-xs btn-ghost"
            >
              ✏️
            </button>
          )}
        </div>
      )}
    </div>
  );
}