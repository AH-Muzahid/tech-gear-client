import Link from "next/link";

const PromoBanner = () => {
  return (
    <section className="py-20 px-4 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex-1 text-center md:text-left">
          <span className="text-blue-400 font-bold tracking-wider uppercase mb-2 block">Limited Time Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Enhance Your Music <br /> Experience
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg text-lg">
            Get 20% off on all premium audio devices. Don't miss out on the crystal clear sound quality.
          </p>
          <Link href="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-blue-500/50">
            Grab the Deal
          </Link>
        </div>

        {/* Decorative Circle Background */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default PromoBanner;