export default function Report(){
    return(
        <section className="py-16 px-6 lg:px-20" id="report">
        <h2 className="text-3xl font-bold text-center mb-12">Report a Bug</h2>
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-6">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Bug title"
          />
          <textarea
            className="textarea textarea-bordered w-full mt-4"
            placeholder="Describe the bug..."
          />
          <button className="btn btn-error mt-4 text-white">Report Bug</button>
        </div>
      </section>
    )
}