import { useState } from "react";
import { 
  Github, Linkedin, Instagram, Facebook, 
  Youtube, Globe, Mail, Plus, Trash2, X, Edit3, 
  Send, MessageSquare, Phone, Hash 
} from "lucide-react";

// Platform definitions with specific icons for BD/Student context
const PLATFORMS = [
  { id: "github", name: "GitHub", icon: <Github size={20} /> },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin size={20} /> },
  { id: "twitter", name: "Twitter / X", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )},
  { id: "facebook", name: "Facebook", icon: <Facebook size={20} /> },
  { id: "whatsapp", name: "WhatsApp", icon: (
    <div className="relative">
      <MessageSquare size={20} />
      <Phone size={8} className="absolute top-1.5 left-1.5" strokeWidth={3} />
    </div>
  )},
  { id: "instagram", name: "Instagram", icon: <Instagram size={20} /> },
  { id: "telegram", name: "Telegram", icon: <Send size={20} /> },
  { id: "imo", name: "Imo", icon: <Hash size={20} /> },
  { id: "youtube", name: "YouTube", icon: <Youtube size={20} /> },
  { id: "discord", name: "Discord", icon: <MessageSquare size={20} /> },
  { id: "website", name: "Portfolio", icon: <Globe size={20} /> },
  { id: "email", name: "Email", icon: <Mail size={20} /> },
];

export default function SocialLinks({ links = [], editable, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLinks, setEditLinks] = useState(links);

  const handleAddLink = () => {
    setEditLinks([...editLinks, { platform: "github", url: "" }]);
  };

  const handleRemoveLink = (index) => {
    setEditLinks(editLinks.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...editLinks];
    newLinks[index][field] = value;
    setEditLinks(newLinks);
  };

  const handleSave = () => {
    onSave(editLinks.filter(link => link.url.trim() !== ""));
    setIsEditing(false);
  };

  const getPlatformData = (platformId) => {
    return PLATFORMS.find(p => p.id === platformId) || { name: "Link", icon: <Globe size={20} /> };
  };

  return (
    <div className="w-full">
      {/* Action Button - Only visible if editable */}
      {editable && !isEditing && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-ghost btn-xs gap-1 hover:bg-base-200"
          >
            <Edit3 size={14} />
            Manage Socials
          </button>
        </div>
      )}

      {/* Main Display: Minimalist Icon Grid */}
      {!isEditing && (
        <div className="flex flex-wrap gap-3">
          {links.length > 0 ? (
            links.map((link, index) => {
              const data = getPlatformData(link.platform);
              return (
                <div key={index} className="tooltip tooltip-bottom font-medium" data-tip={data.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-ghost border border-base-content/10 hover:btn-primary hover:border-primary transition-all duration-300"
                  >
                    {data.icon}
                  </a>
                </div>
              );
            })
          ) : (
            <div className="text-sm opacity-40">No connections linked.</div>
          )}
        </div>
      )}

      {/* Modern Edit Modal */}
      {isEditing && (
        <div className="bg-base-200 p-5 rounded-2xl border border-base-300 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-base-content">Social Settings</h3>
            <button onClick={() => setIsEditing(false)} className="btn btn-ghost btn-sm btn-circle">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {editLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-center bg-base-100 p-2 rounded-xl border border-base-300 shadow-sm">
                <select 
                  className="select select-bordered select-sm focus:outline-none focus:border-primary bg-base-100"
                  value={link.platform}
                  onChange={(e) => handleLinkChange(index, "platform", e.target.value)}
                >
                  {PLATFORMS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                  className="input input-bordered input-sm flex-grow focus:outline-none focus:border-primary"
                  placeholder="https://..."
                />

                <button
                  onClick={() => handleRemoveLink(index)}
                  className="btn btn-ghost btn-sm btn-circle text-error"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-base-300 pt-4">
            <button 
              onClick={handleAddLink} 
              className="btn btn-sm btn-outline gap-2 border-dashed"
            >
              <Plus size={16} />
              Add Link
            </button>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-ghost flex-1">
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-sm btn-primary px-8 flex-1">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}