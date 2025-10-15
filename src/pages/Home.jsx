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
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold backdrop-blur-sm mb-6">
                            Maharashtra's Trusted Solar Provider
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                            Power Your Future With
                            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mt-2">
                                Clean Solar Energy
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of homeowners in Maharashtra saving money while protecting
                            the environment with NewRa Grids premium solar solutions.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link
                            to="/calculator"
                            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
                        >
                            Calculate Your Savings
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                        >
                            Get Free Quote
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        {[
                            { number: '2,500+', text: 'Installations' },
                            { number: '45MW+', text: 'Capacity' },
                            { number: '₹6.5Cr+', text: 'Savings' },
                            { number: '15K+', text: 'CO₂ Reduced' }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-lg sm:text-xl font-bold text-white mb-1">{item.number}</div>
                                <div className="text-xs sm:text-sm text-blue-200">{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Why Choose Solar Energy?
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover the benefits of switching to clean, renewable solar power
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
                                    <span className="text-2xl sm:text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Our Solar Solutions
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                            Everything you need to start your solar journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                to={service.link}
                                className="group block bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                    <span className="text-2xl sm:text-3xl text-white">{service.icon}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                                    {service.description}
                                </p>
                                <div className="text-blue-600 font-semibold text-sm group-hover:underline inline-flex items-center space-x-1">
                                    <span>Explore</span>
                                    <span>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                            The Solar Advantage
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
                            See how solar energy can transform your energy costs and environmental impact
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">
                                    {benefit.stat}
                                </div>
                                <div className="text-blue-100 text-sm sm:text-base font-medium">
                                    {benefit.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            How It Works
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                            Simple process from consultation to power generation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto text-lg sm:text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {step.step}
                                    </div>
                                    {index < processSteps.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 left-3/4 w-full h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                                    )}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                        Ready to Start Your Solar Journey?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                        Take the first step towards energy independence and significant savings
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/calculator"
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto text-center"
                        >
                            Calculate Your Savings
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                        >
                            Get Free Consultation
                        </Link>
                    </div>
                    <div className="mt-6 sm:mt-8 text-blue-200 text-sm">
                        <p>No obligation • Free assessment • 30-minute consultation</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home