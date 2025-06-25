export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content: "Old Owl completely transformed my career. The instructors are amazing and the content is always up-to-date with industry standards.",
      name: "Sarah Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      alt: "Professional headshot of Sarah Chen, a successful student"
    },
    {
      id: 2,
      content: "The flexibility of learning at my own pace while having access to expert mentors made all the difference in my learning journey.",
      name: "Michael Rodriguez",
      role: "Data Analyst",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      alt: "Professional headshot of Michael Rodriguez, a successful student"
    },
    {
      id: 3,
      content: "Outstanding platform with practical, hands-on projects. I landed my dream job within 3 months of completing my course!",
      name: "Emily Johnson",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      alt: "Professional headshot of Emily Johnson, a successful student"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-owl-brown to-owl-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">What Our Students Say</h2>
          <p className="text-xl text-white opacity-90">Real stories from real students who achieved their goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-owl-gold">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.alt} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
