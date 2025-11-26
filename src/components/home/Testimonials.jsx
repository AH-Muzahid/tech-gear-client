import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 relative">
              <FaQuoteLeft className="text-blue-100 text-4xl absolute top-6 left-6" />
              <p className="text-gray-600 mb-6 relative z-10 pt-4">
                "Fantastic service and premium quality products. I bought a mechanical keyboard and it feels amazing. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div> {/* Avatar Placeholder */}
                <div>
                  <h4 className="font-bold text-slate-900">Alex Johnson</h4>
                  <div className="flex text-yellow-400 text-sm">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;