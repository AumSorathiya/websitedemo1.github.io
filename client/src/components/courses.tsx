export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master modern web development with React, Node.js, and MongoDB",
      price: "$99",
      rating: "4.8",
      category: "Programming",
      categoryColor: "bg-owl-brown",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "Modern web development workspace with code on screen"
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      description: "Learn Python, machine learning, and data visualization techniques",
      price: "$129",
      rating: "4.9",
      category: "Data Science",
      categoryColor: "bg-owl-gold",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "Data analysis charts and graphs on computer screen"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      description: "Complete guide to SEO, social media, and content marketing",
      price: "$79",
      rating: "4.7",
      category: "Marketing",
      categoryColor: "bg-owl-forest",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "Digital marketing dashboard with analytics and social media metrics"
    }
  ];

  const handleEnrollClick = (courseTitle: string) => {
    alert(`Enrollment for "${courseTitle}" would be implemented here!`);
  };

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
          <p className="text-xl text-gray-600">Discover our most loved courses by students worldwide</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              <img 
                src={course.image} 
                alt={course.alt} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`${course.categoryColor} text-white px-3 py-1 rounded-full text-sm`}>
                    {course.category}
                  </span>
                  <div className="flex items-center text-owl-gold">
                    <i className="fas fa-star mr-1"></i>
                    <span>{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-owl-brown">{course.price}</span>
                  <button 
                    onClick={() => handleEnrollClick(course.title)}
                    className="bg-owl-gold text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-owl-brown text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 shadow-lg">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
}
