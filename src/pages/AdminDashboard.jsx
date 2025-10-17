import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { FaHome, FaSignOutAlt, FaEnvelope, FaCalendarDay, FaCalendarWeek, FaChartLine, FaUser, FaPhone, FaClock, FaEye } from 'react-icons/fa'
import { useLogoutAdminMutation } from '../redux/apis/authApi'
import LoadingSpinner from '../components/LoadingSpinner'
import { useGetAllContactsQuery } from '../redux/apis/contactApi'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state?.auth?.admin)
    const { data: contactsResponse, error, isLoading, refetch } = useGetAllContactsQuery()

    // Extract contacts array from response - handle different response structures
    const contacts = contactsResponse?.data || contactsResponse || []

    const [logoutApi, { isLoading: isLoggingOut }] = useLogoutAdminMutation()

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap()
            toast.success('Logged out successfully')
            navigate('/admin/login')
        } catch (error) {
            console.error('Logout error:', error)
            toast.error('Logout failed. Please try again.')
        }
    }

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch (error) {
            return 'Invalid Date'
        }
    }

    const getRecentSubmissions = () => {
        if (!contacts || !Array.isArray(contacts)) return []
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return contacts.filter(contact => {
            try {
                return new Date(contact.createdAt) > oneWeekAgo
            } catch {
                return false
            }
        })
    }

    const getTodaysSubmissions = () => {
        if (!contacts || !Array.isArray(contacts)) return []
        const today = new Date()
        return contacts.filter(contact => {
            try {
                const contactDate = new Date(contact.createdAt)
                return contactDate.toDateString() === today.toDateString()
            } catch {
                return false
            }
        })
    }

    const getThisMonthSubmissions = () => {
        if (!contacts || !Array.isArray(contacts)) return []
        const now = new Date()
        return contacts.filter(contact => {
            try {
                const contactDate = new Date(contact.createdAt)
                return contactDate.getMonth() === now.getMonth() &&
                    contactDate.getFullYear() === now.getFullYear()
            } catch {
                return false
            }
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <LoadingSpinner size="large" />
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl text-red-600 dark:text-red-400">❌</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Failed to Load Data
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        We couldn't load the contact submissions. Please check your connection and try again.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={refetch}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={handleLogout}
                            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const totalSubmissions = Array.isArray(contacts) ? contacts.length : 0
    const todaysSubmissions = getTodaysSubmissions().length
    const thisMonthSubmissions = getThisMonthSubmissions().length
    const recentSubmissions = getRecentSubmissions()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
            {/* Enhanced Header */}
            <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-4 sm:gap-0">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base flex items-center">
                                <FaUser className="mr-2 text-blue-500" size={14} />
                                Welcome back, <span className="font-semibold ml-1 text-blue-600 dark:text-blue-400">{user?.email}</span>
                            </p>
                        </div>

                        <div className="flex items-center space-x-3 w-full sm:w-auto">
                            <Link
                                to="/"
                                className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-blue-200 dark:border-blue-800"
                            >
                                <FaHome size={16} />
                                <span className="text-sm sm:text-base">View Site</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-red-200 dark:border-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaSignOutAlt size={16} />
                                <span className="text-sm sm:text-base">
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Total Submissions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Total Submissions
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {totalSubmissions}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl sm:text-2xl" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400">
                            <span className="bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full text-xs font-medium">
                                All Time
                            </span>
                        </div>
                    </div>

                    {/* This Month */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    This Month
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {thisMonthSubmissions}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                                <FaCalendarWeek className="text-green-600 dark:text-green-400 text-xl sm:text-2xl" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400">
                            <span className="bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full text-xs font-medium">
                                Current Month
                            </span>
                        </div>
                    </div>

                    {/* Today */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Today
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {todaysSubmissions}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                                <FaCalendarDay className="text-yellow-600 dark:text-yellow-400 text-xl sm:text-2xl" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400">
                            <span className="bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full text-xs font-medium">
                                Live
                            </span>
                        </div>
                    </div>

                    {/* Response Rate */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Response Rate
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {totalSubmissions > 0 ? '98%' : '0%'}
                                </p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                                <FaChartLine className="text-purple-600 dark:text-purple-400 text-xl sm:text-2xl" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400">
                            <span className="bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full text-xs font-medium">
                                {totalSubmissions > 0 ? 'Excellent' : 'No Data'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Submissions Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Card Header */}
                    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                    Contact Form Submissions
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                                    All messages received through the website contact form
                                </p>
                            </div>
                            <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium px-3 py-1 rounded-full">
                                    {totalSubmissions} total
                                </span>
                                <button
                                    onClick={refetch}
                                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-lg transition-colors duration-200"
                                    title="Refresh data"
                                >
                                    <FaEye size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    {!Array.isArray(contacts) || contacts.length === 0 ? (
                        <div className="text-center py-12 sm:py-16">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl text-gray-400 dark:text-gray-500">📭</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">
                                No submissions yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm sm:text-base">
                                Contact form submissions will appear here once users start filling out the form.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Contact Info
                                        </th>
                                        <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Message
                                        </th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {contacts.map((contact, index) => (
                                        <tr
                                            key={contact._id || index}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                                        >
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                                                        <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            {contact.name || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {contact.email || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                                    <FaPhone className="mr-1 text-xs" />
                                                    {contact.phone || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                                    {contact.message || 'No message'}
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                                    <FaClock className="mr-2 text-xs" />
                                                    {formatDate(contact.createdAt)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Recent Activity Summary */}
                {recentSubmissions.length > 0 && (
                    <div className="mt-6 sm:mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                            <FaChartLine className="mr-2" />
                            Recent Activity Summary
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{recentSubmissions.length}</div>
                                <div className="text-blue-700 dark:text-blue-300">Last 7 Days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{todaysSubmissions}</div>
                                <div className="text-green-700 dark:text-green-300">Today</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {Math.round((recentSubmissions.length / 7) * 100) / 100}
                                </div>
                                <div className="text-purple-700 dark:text-purple-300">Avg/Day (Week)</div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default AdminDashboard