export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-user-graduate text-2xl text-owl-gold mr-2"></i>
              <span className="font-serif text-2xl font-bold">Old Owl</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering learners worldwide with quality education and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-owl-gold transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-owl-gold transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-owl-gold transition-colors duration-200">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-owl-gold transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('courses')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Instructors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>info@oldowl.in</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>123 Learning St, Education City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Old Owl. All rights reserved. | Designed with ❤️ for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
