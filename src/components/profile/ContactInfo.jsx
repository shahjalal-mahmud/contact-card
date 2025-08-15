import { useState } from "react";

export default function ContactInfo({ email, phone, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(phone);

  const handleSave = () => {
    onSave({ phone: editPhone });
    setIsEditing(false);
  };

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-3 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="font-medium">{email}</span>
      </div>
      
      {isEditing ? (
        <div className="p-4 bg-gray-50 rounded-xl dark:bg-gray-800">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Phone Number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={editPhone || ""}
                onChange={(e) => setEditPhone(e.target.value)}
                className="input input-bordered flex-grow focus:ring-2 focus:ring-primary"
                placeholder="+1 (123) 456-7890"
              />
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone ? (
            <span className="font-medium">{phone}</span>
          ) : (
            <span className="text-gray-400">Not provided</span>
          )}
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-xs btn-ghost ml-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}