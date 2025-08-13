import { useState } from "react";

export default function Skills({ skills = [], editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState(skills.join(", "));

  const handleSave = () => {
    onSave(editSkills.split(",").map(skill => skill.trim()).filter(skill => skill));
    setIsEditing(false);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Skills</h2>
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editSkills}
            onChange={(e) => setEditSkills(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Enter skills separated by commas"
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
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="badge badge-primary">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p>No skills added</p>
          )}
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