import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center">


        <div className="flex flex-col justify-center">
          <p className="text-blue-600 font-bold uppercase tracking-wider mb-2">
            Best Tech Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 py-4 leading-tight">
            Upgrade Your <br />
            <span className="text-blue-600">Digital Life</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-md">
            Discover the latest gadgets and accessories to boost your productivity.
            Premium quality, best prices, and fast delivery.
          </p>
          <div>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Shop Now
            </Link>
            <button className="ml-4 text-slate-900 font-semibold hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>


        <div className="relative flex justify-center items-center">

          <div className="absolute w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="relative w-full h-[300px] md:h-[450px]">

            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Tech Setup"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-2xl shadow-2xl z-10"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;