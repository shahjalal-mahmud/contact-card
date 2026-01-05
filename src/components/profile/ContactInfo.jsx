import { useState } from "react";

export default function ContactInfo({ email, phone, editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(phone);

  const handleSave = () => {
    onSave({ phone: editPhone });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-105 bg-base-100 hover:bg-base-200 border border-base-300 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="font-medium text-base-content">
          {email}
        </span>
      </div>
      
      {isEditing ? (
        <div className="p-4 rounded-2xl backdrop-blur-sm bg-base-100/80 border border-base-300 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-base-content">
                Phone Number
              </label>
              <div className="flex gap-3">
                <input
                  type="tel"
                  value={editPhone || ""}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="input input-bordered flex-grow focus:ring-2 focus:ring-primary"
                  placeholder="+1 (123) 456-7890"
                />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-outline px-4 py-2 rounded-lg hover:scale-105 transition-all"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary px-6 py-2 rounded-lg hover:scale-105 transition-all">
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-105 bg-base-100 hover:bg-base-200 border border-base-300 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone ? (
            <span className="font-medium text-base-content">
              {phone}
            </span>
          ) : (
            <span className="text-base-content/70">
              Not provided
            </span>
          )}
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-auto btn btn-outline btn-sm px-3 py-1.5 rounded-lg hover:scale-105 transition-all"
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