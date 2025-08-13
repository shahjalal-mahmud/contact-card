export default function Services(){
    return(
        <section className="py-16 px-6 lg:px-20" id="services">
        <h2 className="text-3xl font-bold text-center mb-12">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Student Personal Portfolio",
            "Professional Portfolio",
            "Full Dynamic Website with Template",
            "Full Dynamic Portfolio with Customization",
            "Organization Portfolio",
            "Faculty/Teacher Portfolio for Universities",
          ].map((service, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{service}</h3>
                <p>
                  {service} designed to look modern, responsive, and unique to your needs.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}