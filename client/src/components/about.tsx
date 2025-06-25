export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">About Old Owl</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded with the vision of making quality education accessible to everyone, Old Owl has been at the forefront of online learning innovation for over a decade.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our platform combines cutting-edge technology with time-tested pedagogical approaches to create an engaging and effective learning experience that adapts to your needs.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-owl-cream rounded-lg">
                <div className="text-3xl font-bold text-owl-brown">10+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center p-4 bg-owl-cream rounded-lg">
                <div className="text-3xl font-bold text-owl-brown">95%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Students collaborating in a modern learning environment" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-owl-gold text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">Award Winning</div>
              <div className="text-sm opacity-90">Education Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
