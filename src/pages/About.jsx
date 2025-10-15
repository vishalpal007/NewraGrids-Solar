import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "👩‍💼",
            bio: "15+ years in renewable energy, MIT Engineering graduate. Passionate about making solar accessible to all.",
            expertise: "Strategic Leadership & Innovation"
        },
        {
            name: "Mike Chen",
            role: "Chief Technology Officer",
            image: "👨‍💻",
            bio: "Solar engineering specialist with 12+ years experience. PhD in Electrical Engineering from Stanford.",
            expertise: "Technology & System Design"
        },
        {
            name: "Emily Rodriguez",
            role: "Operations Director",
            image: "👩‍🔧",
            bio: "Ensures seamless project execution with 10+ years in renewable energy operations and customer success.",
            expertise: "Project Management & Operations"
        },
        {
            name: "David Kim",
            role: "Lead Installation Specialist",
            image: "👷‍♂️",
            bio: "NABCEP certified with 10+ years and 500+ successful installations. Master electrician license.",
            expertise: "Installation & Quality Assurance"
        }
    ]

    const values = [
        {
            icon: "⚡",
            title: "Innovation",
            description: "We leverage cutting-edge solar technology and smart energy solutions"
        },
        {
            icon: "🤝",
            title: "Integrity",
            description: "Transparent pricing, honest recommendations, and ethical business practices"
        },
        {
            icon: "🌱",
            title: "Sustainability",
            description: "Committed to environmental stewardship and reducing carbon footprints"
        },
        {
            icon: "⭐",
            title: "Excellence",
            description: "Uncompromising quality in every installation and customer interaction"
        }
    ]

    const certifications = [
        { name: "NABCEP Certified", icon: "🏅" },
        { name: "Licensed Electricians", icon: "⚡" },
        { name: "OSHA Certified", icon: "🛡️" },
        { name: "25-Year Warranty", icon: "📜" },
        { name: "BBB A+ Rating", icon: "⭐" },
        { name: "Local Permitting Experts", icon: "🏛️" }
    ]

    const milestones = [
        {
            year: "2018",
            title: "Foundation",
            description: "Founded with a mission to make solar energy accessible to everyone",
            achievement: "First 50 installations",
            icon: "🚀"
        },
        {
            year: "2020",
            title: "Growth",
            description: "Expanded to commercial solar and energy storage solutions",
            achievement: "500+ projects completed",
            icon: "📈"
        },
        {
            year: "2022",
            title: "Innovation",
            description: "Launched smart home integration and AI-powered energy management",
            achievement: "1,500+ customers served",
            icon: "💡"
        },
        {
            year: "2024",
            title: "Leadership",
            description: "Industry leader with nationwide recognition and innovative solutions",
            achievement: "2,500+ happy customers",
            icon: "🏆"
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Hero Section */}
            <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-900/80 to-blue-700/80">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80")'
                    }}
                />
                <div className="absolute inset-0 bg-black/40 z-1"></div>

                <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-sm font-semibold backdrop-blur-sm mb-6">
                        About NewRa Grids
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Powering a <span className="text-yellow-400">Brighter</span> Future
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Leading the solar energy revolution with innovative solutions, unmatched expertise,
                        and a commitment to sustainable energy for generations to come.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get Your Free Quote
                        </Link>
                        <Link
                            to="/calculator"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Calculate Savings
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-white py-12 shadow-lg -mt-20 relative z-20 mx-8 rounded-2xl">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">2,500+</div>
                            <div className="text-gray-600 font-semibold">Solar Installations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">45MW+</div>
                            <div className="text-gray-600 font-semibold">Total Capacity</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">$8.5M+</div>
                            <div className="text-gray-600 font-semibold">Customer Savings</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">15,000+</div>
                            <div className="text-gray-600 font-semibold">Tons CO₂ Reduced</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Journey/Timeline Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                            Our Journey
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Building a Sustainable Future
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From visionary beginnings to industry leadership - our journey of innovation and growth
                        </p>
                    </div>

                    <div className="relative">
                        {/* Main Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-green-500 h-full hidden lg:block"></div>

                        <div className="space-y-16 lg:space-y-0">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`relative lg:flex lg:items-center lg:justify-between ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                    {/* Content Card */}
                                    <div className={`lg:w-5/12 mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                            <div className="flex items-start space-x-4 mb-4">
                                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                                                    <span className="text-2xl text-white">{milestone.icon}</span>
                                                </div>
                                                <div>
                                                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-2">
                                                        {milestone.year}
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                        {milestone.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {milestone.description}
                                            </p>
                                            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border-l-4 border-blue-500">
                                                <p className="text-blue-700 font-semibold text-sm">
                                                    {milestone.achievement}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline Center Dot - Visible on desktop */}
                                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full z-10 items-center justify-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    </div>

                                    {/* Year Marker - Visible on desktop */}
                                    <div className={`hidden lg:block lg:w-2/12 text-center ${index % 2 === 0 ? 'lg:order-3' : 'lg:order-1'}`}>
                                        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                                            {milestone.year}
                                        </div>
                                    </div>

                                    {/* Mobile Timeline */}
                                    <div className="lg:hidden flex items-center space-x-4 mb-6">
                                        <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow"></div>
                                        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                                            {milestone.year}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Starting and Ending Elements */}
                        <div className="text-center mt-12">
                            <div className="inline-flex items-center space-x-4 bg-white rounded-2xl px-8 py-4 shadow-lg border border-gray-100">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-gray-700 font-semibold">Continuing our journey towards a sustainable future</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose NewRa Grids */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                                Why We're Different
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                Why Choose <span className="text-blue-600">NewRa Grids</span>?
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                We're not just another solar company. We're your partners in energy independence,
                                combining cutting-edge technology with unparalleled service excellence to deliver
                                the best solar experience in the industry.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Advanced solar technology with 22.8%+ efficiency",
                                    "Competitive pricing with premium quality guarantee",
                                    "Streamlined installation in as little as 30 days",
                                    "24/7 monitoring and comprehensive support",
                                    "25-year performance warranty included",
                                    "Local expert installation teams"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                {
                                    icon: "🚀",
                                    title: "Advanced Tech",
                                    description: "Latest solar panels with smart monitoring"
                                },
                                {
                                    icon: "💰",
                                    title: "Best Value",
                                    description: "Maximum savings with premium quality"
                                },
                                {
                                    icon: "⚡",
                                    title: "Quick Setup",
                                    description: "30-day installation process"
                                },
                                {
                                    icon: "🛡️",
                                    title: "Full Support",
                                    description: "24/7 monitoring & maintenance"
                                }
                            ].map((feature, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-8 h-full shadow-lg border border-gray-100">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                        <span className="text-3xl text-white">🎯</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                                        <p className="text-blue-600 font-semibold">Driving Solar Adoption</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    To democratize access to clean energy by making solar power affordable,
                                    reliable, and accessible to every homeowner and business. We're committed
                                    to accelerating the transition to renewable energy.
                                </p>
                                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                                    <h4 className="font-semibold text-blue-800 mb-2">Our Promise:</h4>
                                    <ul className="text-blue-700 space-y-1 text-sm">
                                        <li>• Zero-down financing options available</li>
                                        <li>• 25-year comprehensive performance warranty</li>
                                        <li>• Price match guarantee on all quotes</li>
                                        <li>• Local, certified installation teams</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-8 h-full shadow-lg border border-gray-100">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                                        <span className="text-3xl text-white">🔭</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                                        <p className="text-green-600 font-semibold">Sustainable Future</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    To create a world where every building generates its own clean energy,
                                    where communities are energy-independent, and where future generations
                                    inherit a healthier, more sustainable planet.
                                </p>
                                <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                                    <h4 className="font-semibold text-green-800 mb-2">2030 Goals:</h4>
                                    <ul className="text-green-700 space-y-1 text-sm">
                                        <li>• 1 million homes powered by solar energy</li>
                                        <li>• Community solar programs nationwide</li>
                                        <li>• Smart grid integration technology</li>
                                        <li>• Carbon-neutral company operations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The guiding principles that shape everything we do at NewRa Grids
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="group text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
                                    <span className="text-3xl">{value.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications & Team */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Certifications */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Certifications & Credentials
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Trust the experts - our credentials speak for themselves
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {certifications.map((cert, index) => (
                                        <div key={index} className="text-center bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 hover:from-blue-100 transition-all duration-300 border border-blue-100">
                                            <div className="text-2xl mb-2">{cert.icon}</div>
                                            <p className="text-sm font-semibold text-gray-800">{cert.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Team */}
                        <div className="lg:col-span-2">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                    Meet Our Expert Team
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Our team of solar experts brings decades of combined experience in renewable energy,
                                    engineering, and customer service.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                        <div className="flex items-start space-x-4">
                                            <div className="text-5xl flex-shrink-0">{member.image}</div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                    {member.name}
                                                </h3>
                                                <p className="text-blue-600 font-semibold mb-3">
                                                    {member.role}
                                                </p>
                                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                                    {member.bio}
                                                </p>
                                                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border-l-4 border-blue-500">
                                                    <p className="text-blue-800 text-xs font-semibold">{member.expertise}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Power Your Future?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of satisfied customers who have made the switch to clean,
                        affordable solar energy with NewRa Grids.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get Free Consultation
                        </Link>
                        <Link
                            to="/calculator"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Calculate Your Savings
                        </Link>
                    </div>
                    <div className="mt-8 text-blue-200 text-sm">
                        <p>No obligation • Free assessment • 30-minute consultation</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About