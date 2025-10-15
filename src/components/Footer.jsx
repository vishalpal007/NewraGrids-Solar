import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Calculator", path: "/calculator" },
        { name: "Solar Map", path: "/map" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const services = [
        "Residential Solar",
        "Commercial Solar",
        "Solar Maintenance",
        "Energy Storage",
        "System Monitoring"
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">NG</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">NewRa Grids</h2>
                                <p className="text-blue-300 text-sm">Powering Your Future</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Leading solar energy solutions provider in Maharashtra.
                            Making solar power accessible and affordable for homes and businesses.
                        </p>

                        {/* Social Links - More Professional */}
                        <div className="flex space-x-4">
                            {[
                                { icon: <FaFacebookF />, label: "Facebook", color: "hover:text-blue-600" },
                                { icon: <FaTwitter />, label: "Twitter", color: "hover:text-blue-400" },
                                { icon: <FaInstagram />, label: "Instagram", color: "hover:text-pink-500" },
                                { icon: <FaLinkedinIn />, label: "LinkedIn", color: "hover:text-blue-500" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className={`text-gray-400 ${social.color} transition-colors duration-200 text-lg`}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 block py-1"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
                            Our Services
                        </h3>
                        <ul className="space-y-3">
                            {services.map((service, i) => (
                                <li key={i}>
                                    <span className="text-gray-400 hover:text-white text-sm transition-colors duration-200 block py-1 cursor-pointer">
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
                            Contact Info
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-gray-400 mt-0.5">📞</span>
                                <div>
                                    <p className="text-white text-sm font-medium">+91 95525 95525</p>
                                    <p className="text-gray-400 text-xs">Mon-Sun: 8AM-8PM</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <span className="text-gray-400 mt-0.5">✉️</span>
                                <div>
                                    <p className="text-white text-sm font-medium">info@newragrids.com</p>
                                    <p className="text-gray-400 text-xs">Quick response</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <span className="text-gray-400 mt-0.5">📍</span>
                                <div>
                                    <p className="text-white text-sm font-medium">Chhatrapati Sambhajinagar</p>
                                    <p className="text-gray-400 text-xs">Maharashtra, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} NewRa Grids Solar Solutions. All rights reserved.
                            </p>
                        </div>

                        <div className="flex space-x-6">
                            <Link
                                to="/privacy"
                                className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/sitemap"
                                className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
                            >
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;