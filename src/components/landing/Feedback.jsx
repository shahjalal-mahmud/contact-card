export default function Feedback(){
    return(
        <section className="py-16 px-6 lg:px-20" id="feedback">
        <h2 className="text-3xl font-bold text-center mb-12">Feedback</h2>
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl p-6">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your feedback here..."
          />
          <button className="btn btn-primary mt-4">Submit Feedback</button>
        </div>
      </section>
    )
}