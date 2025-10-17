import { Link } from 'react-router-dom'

const Home = () => {
    const features = [
        {
            icon: '💰',
            title: 'Save Money',
            description: 'Reduce electricity bills by up to 90% with our efficient solar solutions'
        },
        {
            icon: '🌍',
            title: 'Eco Friendly',
            description: 'Clean, renewable energy that reduces your carbon footprint'
        },
        {
            icon: '⚡',
            title: 'Reliable Power',
            description: '24/7 uninterrupted power with advanced battery storage'
        },
        {
            icon: '🛡️',
            title: '25-Year Warranty',
            description: 'Comprehensive protection for your solar investment'
        }
    ]

    const services = [
        {
            icon: '📊',
            title: 'Solar Calculator',
            description: 'Calculate your potential savings and ROI with our smart calculator',
            link: '/calculator',
            bgColor: 'from-blue-500 to-blue-600'
        },
        {
            icon: '🗺️',
            title: 'Solar Map',
            description: 'Check solar irradiance and potential in your area',
            link: '/map',
            bgColor: 'from-green-500 to-green-600'
        },
        {
            icon: '🏠',
            title: 'Residential Solar',
            description: 'Complete home solar systems with smart monitoring',
            link: '/contact',
            bgColor: 'from-orange-500 to-orange-600'
        },
        {
            icon: '🏢',
            title: 'Commercial Solar',
            description: 'Scalable solar systems for businesses and industries',
            link: '/contact',
            bgColor: 'from-purple-500 to-purple-600'
        }
    ]

    const benefits = [
        {
            stat: '70-90%',
            description: 'Average reduction in electricity bills'
        },
        {
            stat: '6-8 Years',
            description: 'Typical payback period'
        },
        {
            stat: '25 Years',
            description: 'System lifespan with warranty'
        },
        {
            stat: '$0 Down',
            description: 'Financing options available'
        }
    ]

    const processSteps = [
        {
            step: '1',
            title: 'Consultation',
            description: 'Free assessment of your energy needs'
        },
        {
            step: '2',
            title: 'Design',
            description: 'Custom solar system design for your property'
        },
        {
            step: '3',
            title: 'Installation',
            description: 'Professional installation by certified technicians'
        },
        {
            step: '4',
            title: 'Monitoring',
            description: '24/7 system monitoring and support'
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-900/95 overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80")'
                    }}
                />

                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-blue-900/30"></div>

                {/* Animated Solar Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Floating Solar Panels */}
                    <div className="absolute top-1/4 left-1/4 w-20 h-10 bg-yellow-400/20 rounded-lg transform rotate-45 animate-float-slow"></div>
                    <div className="absolute top-1/3 right-1/4 w-16 h-8 bg-yellow-400/15 rounded-lg transform -rotate-12 animate-float-medium"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-24 h-12 bg-yellow-400/25 rounded-lg transform rotate-12 animate-float-slow"></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-12 gap-2 w-full h-full transform rotate-6 scale-125">
                            {Array.from({ length: 144 }).map((_, i) => (
                                <div key={i} className="bg-white/10 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="mb-8 sm:mb-12 lg:mb-16 py-8">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm sm:text-base font-semibold mb-6 sm:mb-8 lg:mb-10 shadow-lg">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            Maharashtra's Most Trusted Solar Provider
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-14">
                            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
                                <span className="block">Power Your</span>
                                <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                                    Future With Solar
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-8">
                                Join <span className="font-semibold text-yellow-300">5,000+</span> homeowners across Maharashtra saving
                                <span className="font-semibold text-green-300"> ₹50,000+ annually </span>
                                with premium solar solutions
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-8">
                            <Link
                                to="/calculator"
                                className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-blue-900 font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl w-full sm:w-auto text-center min-h-[60px] flex items-center justify-center space-x-2 border-2 border-yellow-400/50"
                            >
                                <span>Calculate Your Savings</span>
                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </Link>

                            <Link
                                to="/contact"
                                className="group bg-transparent hover:bg-white/10 border-2 border-white text-white hover:text-white font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm w-full sm:w-auto text-center min-h-[60px] flex items-center justify-center space-x-2 border-white/70 hover:border-white"
                            >
                                <span>Get Free Quote</span>
                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </Link>
                        </div>

                        {/* Enhanced Trust Indicators */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
                            {[
                                { number: '2,500+', text: 'Happy Customers', icon: '😊' },
                                { number: '45MW+', text: 'Total Capacity', icon: '⚡' },
                                { number: '₹6.5Cr+', text: 'Customer Savings', icon: '💰' },
                                { number: '15K+', text: 'CO₂ Reduced', icon: '🌱' }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-1 group"
                                >
                                    <div className="text-2xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                                        {item.number}
                                    </div>
                                    <div className="text-xs sm:text-sm text-blue-200/80 font-medium group-hover:text-blue-100 transition-colors duration-300">
                                        {item.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent"></div>
            </section>

            {/* Enhanced Features Section */}
            <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
                            Why Choose Solar Energy?
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                            Discover the benefits of switching to clean, renewable solar power for your home or business
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group text-center bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300 shadow-sm">
                                    <span className="text-2xl sm:text-3xl lg:text-4xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Services Section */}
            <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
                            Our Solar Solutions
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                            Everything you need to start your solar journey with confidence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                to={service.link}
                                className="group block bg-white rounded-2xl p-5 sm:p-6 lg:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
                            >
                                <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <span className="text-2xl sm:text-3xl lg:text-4xl text-white">{service.icon}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5">
                                    {service.description}
                                </p>
                                <div className="text-blue-600 font-semibold text-sm sm:text-base group-hover:underline inline-flex items-center space-x-2 transition-all duration-300">
                                    <span>Explore</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Benefits Section */}
            <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                            The Solar Advantage
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-4">
                            See how solar energy can transform your energy costs and environmental impact
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center bg-white/10 rounded-2xl p-5 sm:p-6 lg:p-8 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-2 sm:mb-3">
                                    {benefit.stat}
                                </div>
                                <div className="text-blue-100 text-sm sm:text-base lg:text-lg font-medium leading-relaxed">
                                    {benefit.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Process Section */}
            <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
                            How It Works
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                            Simple, streamlined process from consultation to power generation
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connection Line for Desktop */}
                        <div className="hidden lg:block absolute top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 z-0"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative z-10">
                            {processSteps.map((step, index) => (
                                <div key={index} className="text-center group">
                                    <div className="relative mb-4 sm:mb-5 lg:mb-6">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto text-lg sm:text-xl lg:text-2xl font-bold shadow-lg group-hover:scale-110 transition-all duration-300 relative z-10 border-2 border-white">
                                            {step.step}
                                        </div>
                                        {/* Mobile Connection Dots */}
                                        {index < processSteps.length - 1 && (
                                            <div className="lg:hidden absolute top-1/2 left-3/4 w-1/4 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                                        )}
                                    </div>
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA below process */}
                    <div className="text-center mt-10 sm:mt-12 lg:mt-16">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px]"
                        >
                            Start Your Solar Journey Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-400/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                        Ready to Start Your Solar Journey?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                        Take the first step towards energy independence and significant savings with our expert team
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
                        <Link
                            to="/calculator"
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto text-center min-h-[48px] flex items-center justify-center"
                        >
                            Calculate Your Savings
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center min-h-[48px] flex items-center justify-center"
                        >
                            Get Free Consultation
                        </Link>
                    </div>

                    <div className="mt-6 sm:mt-8 text-blue-200 text-xs sm:text-sm lg:text-base">
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>No obligation</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Free assessment</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>30-minute consultation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home