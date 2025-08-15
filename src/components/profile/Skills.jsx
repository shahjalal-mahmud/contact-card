import { useState } from "react";

export default function Skills({ skills = [], editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState(skills.join(", "));

  const handleSave = () => {
    onSave(editSkills.split(",").map(skill => skill.trim()).filter(skill => skill));
    setIsEditing(false);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-base-content">Skills & Expertise</h2>
        {editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-ghost hover:bg-base-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Skills
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="bg-base-100 p-6 rounded-box shadow-sm border border-base-200">
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Your Skills (comma separated)</span>
              </label>
              <textarea
                value={editSkills}
                onChange={(e) => setEditSkills(e.target.value)}
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary"
                placeholder="e.g. React, UI Design, Project Management"
                rows="3"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                Save Skills
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="badge badge-lg badge-primary hover:badge-secondary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-base-100 p-6 rounded-box text-center">
              <p className="text-base-content/70">No skills added yet</p>
              {editable && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary btn-sm mt-3"
                >
                  Add Skills
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}