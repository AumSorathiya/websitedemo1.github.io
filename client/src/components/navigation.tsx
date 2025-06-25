import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'transform -translate-y-0' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-user-graduate text-2xl text-owl-brown mr-2"></i>
              <span className="font-serif text-2xl font-bold text-owl-brown">Old Owl</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-owl-brown px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('courses')}
              className="text-gray-700 hover:text-owl-brown px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-owl-brown px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-owl-brown px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-owl-brown px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Contact
            </button>
            <button className="bg-owl-brown text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-owl-brown"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white border-t ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button 
            onClick={() => scrollToSection('home')}
            className="block px-3 py-2 text-gray-700 hover:text-owl-brown w-full text-left"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('courses')}
            className="block px-3 py-2 text-gray-700 hover:text-owl-brown w-full text-left"
          >
            Courses
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="block px-3 py-2 text-gray-700 hover:text-owl-brown w-full text-left"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="block px-3 py-2 text-gray-700 hover:text-owl-brown w-full text-left"
          >
            Reviews
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="block px-3 py-2 text-gray-700 hover:text-owl-brown w-full text-left"
          >
            Contact
          </button>
          <button className="w-full text-left bg-owl-brown text-white px-3 py-2 rounded-lg mt-2">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
