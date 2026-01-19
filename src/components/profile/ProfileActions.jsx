import { Share2, UserPlus } from "lucide-react";

export default function ProfileActions({ userProfile }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userProfile?.name} - Digital Profile`,
        text: 'Check out my LinkUp profile!',
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSaveContact = () => {
    if (!userProfile) return;

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${userProfile.name}
TEL:${userProfile.phone || ''}
EMAIL:${userProfile.email}
ADR:;;${userProfile.location || ''};;;;
URL:${window.location.href}
NOTE:${userProfile.profession || ''}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${userProfile.name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button
        onClick={handleSaveContact}
        className="group px-6 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-lg shadow-primary/40"
      >
        <span className="flex items-center gap-2 justify-center">
          <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Save Contact</span>
        </span>
      </button>

      <button
        onClick={handleShare}
        className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 border-2 border-base-300 text-base-content hover:bg-base-200 hover:border-base-400"
      >
        <span className="flex items-center gap-2 justify-center">
          <Share2 className="w-5 h-5" />
          <span>Share Profile</span>
        </span>
      </button>
    </div>
  );
}