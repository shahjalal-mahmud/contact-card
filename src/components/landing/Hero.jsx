export default function Hero(){
    return(
        <section className="hero min-h-screen bg-gradient-to-r from-primary to-secondary text-white" id="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="/NFC.png"
            alt="Portfolio Preview"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Your Personal Digital Portfolio</h1>
            <p className="py-6">
              Create and manage your own beautiful, dynamic portfolio for free. Showcase your
              skills, achievements, and personality in just a few clicks.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary">Sign Up</button>
              <button className="btn btn-outline text-white border-white">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    )
}