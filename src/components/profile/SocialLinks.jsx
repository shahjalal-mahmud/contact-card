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

  const getPlatformIcon = (platform) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('github')) return 'github';
    if (lowerPlatform.includes('linkedin')) return 'linkedin';
    if (lowerPlatform.includes('twitter')) return 'twitter';
    if (lowerPlatform.includes('instagram')) return 'instagram';
    if (lowerPlatform.includes('facebook')) return 'facebook';
    return 'link';
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-base-content">Social Profiles</h2>
        {editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-ghost hover:bg-base-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Links
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="bg-base-100 p-6 rounded-box shadow-sm border border-base-200">
          <div className="space-y-4">
            {editLinks.map((link, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-grow space-y-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Platform</span>
                    </label>
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => handleLinkChange(index, "platform", e.target.value)}
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      placeholder="e.g. GitHub, LinkedIn"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">URL</span>
                    </label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      placeholder="https://"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveLink(index)}
                  className="btn btn-circle btn-sm btn-error mt-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            
            <button 
              onClick={handleAddLink} 
              className="btn btn-sm btn-ghost hover:bg-base-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Link
            </button>
            
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                Save Links
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm gap-2 hover:btn-primary transition-all"
                >
                  <span className={`inline-flex items-center justify-center`}>
                    <i className={`bi bi-${getPlatformIcon(link.platform)}`}></i>
                  </span>
                  {link.platform}
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-base-100 p-6 rounded-box text-center">
              <p className="text-base-content/70">No social links added yet</p>
              {editable && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary btn-sm mt-3"
                >
                  Add Social Links
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}