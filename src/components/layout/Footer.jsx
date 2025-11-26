import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 font-signature">TechGear</h2>
          <p className="mb-6 text-sm leading-relaxed">
            Your one-stop shop for the latest tech gadgets and accessories. Upgrade your digital life with premium quality gear.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><FaFacebookF /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><FaTwitter /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-400 transition">Shop</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className="hover:text-blue-400 transition">FAQ</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Shipping & Returns</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Stay Updated</h3>
          <p className="text-sm mb-4">Subscribe to get the latest news and exclusive offers.</p>
          <form className="flex flex-col gap-2">
            <input type="email" placeholder="Your email address" className="bg-slate-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} TechGear Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;