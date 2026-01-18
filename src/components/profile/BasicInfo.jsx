import React, { useState } from "react";
import { FiEdit3, FiUser, FiAward } from "react-icons/fi";

export default function BasicInfo({ name, tagline, editable, onSave }) {
  const [editData, setEditData] = useState({ name, tagline });

  const handleSave = () => {
    onSave(editData);
    document.getElementById("basic_info_modal").close();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      {/* ELITE IDENTITY SECTION */}
      <div className="relative flex flex-col items-center text-center md:text-left md:items-start gap-2">
        
        {/* Name Section */}
        <div className="group flex items-center justify-center md:justify-start gap-3 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-base-content uppercase leading-[0.9]">
            {name || "User Name"}
          </h1>
          
          {editable && (
            <button
              onClick={() => document.getElementById("basic_info_modal").showModal()}
              className="btn btn-ghost btn-circle btn-sm text-primary md:opacity-0 group-hover:opacity-100 transition-all"
            >
              <FiEdit3 size={22} />
            </button>
          )}
        </div>

        {/* LinkedIn-Style Headline */}
        <div className="relative">
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary/90 max-w-2xl leading-snug">
            {tagline || "Your professional headline goes here..."}
          </p>
          {/* Subtle accent line for Elite feel */}
          <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary/20 rounded-full"></div>
        </div>
      </div>

      {/* ELITE MODAL: EDITING */}
      <dialog id="basic_info_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
        <div className="modal-box bg-base-100 border border-base-300 shadow-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-content shadow-lg shadow-primary/30">
              <FiUser size={24} />
            </div>
            <div>
              <h3 className="font-black text-2xl uppercase tracking-tight">Edit Identity</h3>
              <p className="text-sm text-base-content/50">Keep your professional persona up to date</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold uppercase tracking-widest text-xs opacity-60">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered input-lg focus:input-primary w-full bg-base-200 font-bold"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold uppercase tracking-widest text-xs opacity-60">Headline (Tagline)</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary h-32 bg-base-200 text-lg leading-tight"
                placeholder="e.g. Senior Software Architect | Open Source Contributor | Tech Speaker"
                value={editData.tagline}
                onChange={(e) => setEditData({ ...editData, tagline: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-action mt-10">
            <form method="dialog" className="flex w-full gap-3">
              <button className="btn btn-ghost flex-1 text-base-content/50">Discard</button>
              <button 
                type="button" 
                onClick={handleSave} 
                className="btn btn-primary flex-[2] shadow-xl shadow-primary/20 text-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button className="cursor-default">close</button></form>
      </dialog>
    </div>
  );
}