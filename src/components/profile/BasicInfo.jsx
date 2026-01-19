import React, { useState } from "react";
import {
  FiEdit3,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";

export default function BasicInfo({
  name,
  tagline,
  email,
  phone,
  editable = false,
  onSave,
}) {
  const [editData, setEditData] = useState({
    name: name || "",
    tagline: tagline || "",
    phone: phone || "",
  });

  const handleSave = () => {
    onSave(editData);
    document.getElementById("basic_info_modal").close();
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* IDENTITY HEADER (NO CARD) */}
      <div className="relative flex flex-col gap-2">
        {/* Edit action */}
        {editable && (
          <div className="absolute right-0 top-0">
            <button
              onClick={() =>
                document.getElementById("basic_info_modal").showModal()
              }
              className="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-primary"
            >
              <FiEdit3 size={16} />
              Edit
            </button>
          </div>
        )}

        {/* Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-base-content">
          {name || "Your Name"}
        </h1>

        {/* Profession / Headline (LinkedIn style) */}
        <div className="flex items-center gap-2 text-base-content/70">
          <FiBriefcase size={16} />
          <span className="text-sm sm:text-base font-medium">
            {tagline || "Your professional headline"}
          </span>
        </div>

        {/* Contact row */}
        <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2 mt-3 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <FiMail size={15} />
            <span className="break-all">{email}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiPhone size={15} />
            <span>{phone || "No phone number added"}</span>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <dialog
        id="basic_info_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box max-w-lg bg-base-100 rounded-t-2xl sm:rounded-2xl">
          {/* Modal header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FiUser size={20} />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-base-content">
                Edit basic information
              </h3>
              <p className="text-sm text-base-content/60 mt-0.5">
                This information appears on your public profile
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-xs font-medium text-base-content/60">
                  Full name
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-base-200"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>

            {/* Profession */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-xs font-medium text-base-content/60">
                  Profession / Headline
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-base-200"
                placeholder="e.g. Software Engineer at Appriyo"
                value={editData.tagline}
                onChange={(e) =>
                  setEditData({ ...editData, tagline: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-xs font-medium text-base-content/60">
                  Phone number
                </span>
              </label>
              <input
                type="tel"
                className="input input-bordered bg-base-200"
                placeholder="+880 XXXXXXXX"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />
            </div>

            {/* Email (locked) */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-xs font-medium text-base-content/60">
                  Email address
                </span>
              </label>
              <input
                type="email"
                disabled
                className="input input-bordered bg-base-300 text-base-content/60 cursor-not-allowed"
                value={email}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="modal-action mt-7">
            <form method="dialog" className="flex w-full gap-3">
              <button className="btn btn-ghost flex-1">Cancel</button>
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary flex-[2]"
              >
                Save changes
              </button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close modal">close</button>
        </form>
      </dialog>
    </section>
  );
}