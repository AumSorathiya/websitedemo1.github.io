export default function Features() {
  const features = [
    {
      icon: "fas fa-graduation-cap",
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience",
      color: "text-owl-brown",
      bgColor: "bg-owl-brown"
    },
    {
      icon: "fas fa-clock",
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to all course materials",
      color: "text-owl-gold",
      bgColor: "bg-owl-gold"
    },
    {
      icon: "fas fa-certificate",
      title: "Certification",
      description: "Earn recognized certificates to advance your career",
      color: "text-owl-forest",
      bgColor: "bg-owl-forest"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Why Choose Old Owl?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience learning like never before with our innovative approach to education
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className={`w-16 h-16 ${feature.bgColor} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <i className={`${feature.icon} text-2xl ${feature.color}`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
