import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLogoutAdminMutation } from '../redux/apis/authApi'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/map', label: 'Solar Map' },
        { path: '/calculator', label: 'Calculator' },
        { path: '/contact', label: 'Contact' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                            <span className="text-white font-bold text-sm">NG</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl text-gray-800 leading-5">
                                NewRa Grids
                            </span>
                            <span className="text-xs text-blue-600 font-medium tracking-wide">
                                SOLAR ENERGY
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 ${isActive(item.path)
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {item.label}
                                {isActive(item.path) && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
                                )}
                            </Link>
                        ))}


                        {/* CTA Button */}
                        <Link
                            to="/contact"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                        >
                            Get Quote
                        </Link>

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <Link
                            to="/contact"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                        >
                            Quote
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
                        <div className="py-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 text-base font-medium transition-colors duration-200 ${isActive(item.path)
                                        ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}

                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar