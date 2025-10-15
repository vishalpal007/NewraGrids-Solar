import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FaEnvelope, FaLock, FaRocket, FaShieldAlt } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'
import { useLoginAdminMutation } from '../redux/apis/authApi'

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.admin)
    const [login, { isLoading }] = useLoginAdminMutation()

    useEffect(() => {
        if (isAuthenticated) navigate('/admin/dashboard')
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(formData).unwrap()
            toast.success('Login successful!')
            navigate('/admin/dashboard')
        } catch (error) {
            toast.error('Login failed. Check credentials.')
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
            {/* Left Branding / Welcome Section */}
            <div className="lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-700 p-12 text-white">
                <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-2xl">NG</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg text-blue-100 max-w-md mx-auto">
                        Access your admin dashboard to manage users, view analytics, and configure the system.
                    </p>
                </div>
                <div className="mt-12 text-center">
                    <FaShieldAlt size={48} className="mx-auto mb-4 text-white/70 animate-pulse" />
                    <p className="text-sm text-blue-100/80">
                        Your secure admin portal is protected and encrypted.
                    </p>
                </div>
            </div>

            {/* Right Login Form Section */}
            <div className="lg:w-1/2 flex justify-center items-center p-12">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Admin Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@newragrids.com"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <FaEnvelope className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <FaLock className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner size="small" />
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <FaRocket />
                                    <span>Access Dashboard</span>
                                </>
                            )}
                        </button>

                        {/* Demo Info */}
                        <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-xl p-4 flex items-start space-x-3">
                            <FaShieldAlt className="text-blue-600 mt-1" />
                            <div>
                                <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                                    Use any email and password (min 6 chars) for demo purposes. Admin account auto-created if not exists.
                                </p>
                            </div>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                            <Link
                                to="/"
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200"
                            >
                                ← Return to Homepage
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
