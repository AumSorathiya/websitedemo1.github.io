import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Thank you for subscribing! We'll send you updates soon.");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-owl-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
        <p className="text-lg text-gray-600 mb-8">Get the latest courses, tips, and industry insights delivered to your inbox</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-owl-brown focus:border-transparent"
            required
            disabled={isSubscribing}
          />
          <button 
            type="submit" 
            className="bg-owl-brown text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
            disabled={isSubscribing}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
