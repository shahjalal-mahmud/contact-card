export default function Features(){
    return(
        <section className="py-16 px-6 lg:px-20 bg-base-200" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Customizable Profile Info",
            "Profile Picture & CV Upload",
            "Save Contact Button",
            "Short & Shareable Link",
            "NFC Card & QR Code",
            "Bug Reporting & Feedback",
          ].map((feature, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{feature}</h3>
                <p>
                  {feature} to make your portfolio truly personal and functional.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}