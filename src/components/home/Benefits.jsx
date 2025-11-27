import { FaShippingFast, FaShieldAlt, FaHeadset, FaUndo } from "react-icons/fa";

const benefits = [
  { id: 1, icon: <FaShippingFast size={40} />, title: "Free Shipping", desc: "On all orders over $50 free shipping included" },
  { id: 2, icon: <FaShieldAlt size={40} />, title: "Secure Payment", desc: "100% secure payment" },
  { id: 3, icon: <FaUndo size={40} />, title: "30 Days Return", desc: "Money back guarantee" },
  { id: 4, icon: <FaHeadset size={40} />, title: "24/7 Support", desc: "Dedicated support 24/7 for any questions" },
];

const Benefits = () => {
  return (

    <section className="py-16 bg-white">
      <div>
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Benefits</h2>
        <p className="text-center text-slate-500 text-lg mb-8 px-4">
          Get the best deals and the best products at the lowest prices.
        </p>
      </div>
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {benefits.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;