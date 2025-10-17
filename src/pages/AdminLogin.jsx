import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FaEnvelope, FaLock, FaRocket, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'
import { useLoginAdminMutation } from '../redux/apis/authApi'

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.admin)
    const [login, { isLoading }] = useLoginAdminMutation()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/dashboard')
        }
    }, [isAuthenticated, navigate])

    const validateForm = () => {
        const newErrors = {}

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error('Please fix the form errors')
            return
        }

        try {
            const result = await login(formData).unwrap()
            if (result.success) {
                toast.success('Login successful! Redirecting to dashboard...')
                setTimeout(() => {
                    navigate('/admin/dashboard')
                }, 1000)
            }
        } catch (error) {
            console.error('Login error:', error)
            const errorMessage = error?.data?.message || 'Login failed. Please check your credentials and try again.'
            toast.error(errorMessage)

            // Set specific field errors if available
            if (error?.data?.errors) {
                setErrors(error.data.errors)
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
            {/* Left Branding / Welcome Section */}
            <div className="lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10 text-center w-full max-w-md">
                    {/* Logo */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm border border-white/30">
                        <span className="text-white font-bold text-xl sm:text-2xl">NG</span>
                    </div>

                    {/* Welcome Text */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                        Welcome Back!
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6 sm:mb-8">
                        Access your admin dashboard to manage users, view analytics, and configure system settings securely.
                    </p>

                    {/* Features List */}
                    <div className="hidden sm:block space-y-3 text-left bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-blue-100 text-sm">Real-time analytics and reporting</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-blue-100 text-sm">User management and permissions</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-blue-100 text-sm">System configuration controls</span>
                        </div>
                    </div>
                </div>

                {/* Security Badge - Hidden on mobile */}
                <div className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <FaShieldAlt className="text-white/80" size={16} />
                    <span className="text-white/80 text-sm">Secure Admin Portal</span>
                </div>
            </div>

            {/* Right Login Form Section */}
            <div className="lg:w-1/2 flex justify-center items-center p-4 sm:p-6 lg:p-8 xl:p-12">
                <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Admin Login
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                            Sign in to access your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Email Address
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
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                />
                                <FaEnvelope className={`absolute right-3 top-3 ${errors.email ? 'text-red-500' : 'text-gray-400 dark:text-gray-300'
                                    }`} />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                                    <span>⚠</span>
                                    <span>{errors.email}</span>
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    minLength={6}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-10 top-3 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                <FaLock className={`absolute right-3 top-3 ${errors.password ? 'text-red-500' : 'text-gray-400 dark:text-gray-300'
                                    }`} />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                                    <span>⚠</span>
                                    <span>{errors.password}</span>
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[48px]"
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner size="small" />
                                    <span className="text-sm sm:text-base">Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <FaRocket className="text-sm sm:text-base" />
                                    <span className="text-sm sm:text-base">Access Dashboard</span>
                                </>
                            )}
                        </button>

                        {/* Demo Info */}
                        <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-xl p-3 sm:p-4 flex items-start space-x-3">
                            <FaShieldAlt className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                                    <strong>Demo Access:</strong> Use any valid email and password (minimum 6 characters).
                                    Admin account is automatically created if it doesn't exist.
                                </p>
                            </div>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                            <Link
                                to="/"
                                className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            >
                                <span>←</span>
                                <span>Return to Homepage</span>
                            </Link>
                        </div>
                    </form>

                    {/* Security Footer */}
                    <div className="mt-6 text-center">
                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <FaShieldAlt size={12} />
                            <span>Protected by advanced security protocols</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin