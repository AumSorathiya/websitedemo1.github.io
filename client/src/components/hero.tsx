import { useState, useEffect } from "react";

export default function Hero() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    const heroElement = document.getElementById('home');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateStats = () => {
    const targets = { students: 10000, courses: 500, instructors: 50 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        students: Math.floor(targets.students * progress),
        courses: Math.floor(targets.courses * progress),
        instructors: Math.floor(targets.instructors * progress),
      });

      if (currentStep >= steps) {
        setStats(targets);
        clearInterval(timer);
      }
    }, stepDuration);
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-owl-brown to-owl-gold py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Learn with 
              <span className="text-owl-gold"> Wisdom</span>
            </h1>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Unlock your potential with our comprehensive learning platform. Join thousands of students who have transformed their careers with Old Owl's expert-led courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-owl-gold text-owl-brown px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg transform hover:scale-105">
                Start Learning Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-owl-brown transition-all duration-200">
                <i className="fas fa-play mr-2"></i>
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Stack of books in a library representing knowledge and learning" 
                className="rounded-xl w-full h-auto shadow-lg"
              />
              <div className="mt-4 text-center">
                <div className="flex justify-center space-x-4 text-owl-brown">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.students.toLocaleString()}+</div>
                    <div className="text-sm">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.courses}+</div>
                    <div className="text-sm">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.instructors}+</div>
                    <div className="text-sm">Instructors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
