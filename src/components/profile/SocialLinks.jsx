import { useState } from "react";

export default function SocialLinks({ links = [], editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLinks, setEditLinks] = useState(links);

  const handleAddLink = () => {
    setEditLinks([...editLinks, { platform: "", url: "" }]);
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...editLinks];
    newLinks.splice(index, 1);
    setEditLinks(newLinks);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...editLinks];
    newLinks[index][field] = value;
    setEditLinks(newLinks);
  };

  const handleSave = () => {
    onSave(editLinks.filter(link => link.platform && link.url));
    setIsEditing(false);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Social Links</h2>
      {isEditing ? (
        <div className="space-y-2">
          {editLinks.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={link.platform}
                onChange={(e) => handleLinkChange(index, "platform", e.target.value)}
                className="input input-bordered input-sm flex-1"
                placeholder="Platform (e.g., GitHub)"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                className="input input-bordered input-sm flex-1"
                placeholder="URL"
              />
              <button
                onClick={() => handleRemoveLink(index)}
                className="btn btn-circle btn-xs btn-error"
              >
                ×
              </button>
            </div>
          ))}
          <button onClick={handleAddLink} className="btn btn-sm">
            + Add Link
          </button>
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
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-outline hover:badge-primary"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          ) : (
            <p>No social links added</p>
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