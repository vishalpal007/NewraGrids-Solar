import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSubmitContactMutation } from '../redux/apis/contactApi'
import LoadingSpinner from '../components/LoadingSpinner'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const [submitContact, { isLoading }] = useSubmitContactMutation()

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await submitContact(formData).unwrap()
            toast.success('Message sent successfully! Our solar expert will contact you within 24 hours.')
            setFormData({ name: '', email: '', phone: '', message: '' })
        } catch (error) {
            toast.error('Failed to send message. Please try again or call us directly.')
        }
    }

    const contactInfo = [
        {
            icon: '📍',
            title: 'Visit Our Office',
            details: ['Solar Energy Park', 'Chhatrapati Sambhajinagar', 'Maharashtra 431001'],
            bgColor: 'from-blue-500 to-blue-600'
        },
        {
            icon: '📞',
            title: 'Call Us Directly',
            details: ['+91 95525 95525', 'Toll Free: 1800-123-4567'],
            bgColor: 'from-green-500 to-green-600'
        },
        {
            icon: '✉️',
            title: 'Email Us',
            details: ['info@newragrids.com', 'support@newragrids.com'],
            bgColor: 'from-orange-500 to-orange-600'
        },
        {
            icon: '🕒',
            title: 'Working Hours',
            details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Weekend: 9:00 AM - 6:00 PM'],
            bgColor: 'from-purple-500 to-purple-600'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Enhanced Header */}
            <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 sm:py-20 lg:py-24">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-4">
                        Get In Touch
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                        Contact Our <span className="text-yellow-400">Solar Experts</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Ready to start your solar journey? Get a free consultation and personalized quote from our certified solar specialists.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                    Get Your Free Solar Consultation
                                </h2>
                                <p className="text-gray-600 text-base sm:text-lg">
                                    Fill out the form below and our solar expert will contact you within 24 hours
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Your Solar Requirements *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none placeholder-gray-400"
                                        placeholder="Tell us about your current electricity bill, roof type, location, and any specific requirements..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center min-h-[56px]"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <LoadingSpinner size="small" />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <span>Get Free Consultation</span>
                                            <span className="text-lg">→</span>
                                        </div>
                                    )}
                                </button>

                                <div className="text-center">
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        By submitting this form, you agree to our Privacy Policy and consent to be contacted by our solar experts.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6 sm:space-y-8">
                            {/* Contact Info Cards */}
                            <div className="space-y-4 sm:space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${item.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                <span className="text-xl sm:text-2xl text-white">{item.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                                    {item.title}
                                                </h3>
                                                <div className="space-y-1">
                                                    {item.details.map((detail, idx) => (
                                                        <p key={idx} className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                                            {detail}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced CTA Section */}
                <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 text-center text-white">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Ready to Start Your Solar Journey?
                    </h3>
                    <p className="text-blue-100 text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                        Get a free personalized quote and start saving with clean solar energy today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                        <a
                            href="tel:+919552595525"
                            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[56px] flex items-center justify-center w-full sm:w-auto"
                        >
                            📞 Call Now: +91 95525 95525
                        </a>
                        <a
                            href="https://wa.me/919552595525"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 min-h-[56px] flex items-center justify-center w-full sm:w-auto"
                        >
                            💬 WhatsApp Us
                        </a>
                    </div>
                    <div className="mt-6 text-blue-200 text-base">
                        Free Consultation • No Obligation • Expert Guidance
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact