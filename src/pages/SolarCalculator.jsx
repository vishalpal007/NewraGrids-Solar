import { useState, useMemo } from 'react';

const SolarCalculator = () => {
    const [formData, setFormData] = useState({
        monthlyBill: 5000,
        roofArea: 1000,
        state: 'maharashtra',
        electricityRate: 8.5
    });

    const stateRates = {
        maharashtra: { rate: 8.5, subsidy: 40000, name: 'Maharashtra', minSubsidy: 20000, maxSubsidy: 60000 },
        delhi: { rate: 7.0, subsidy: 30000, name: 'Delhi', minSubsidy: 15000, maxSubsidy: 50000 },
        karnataka: { rate: 7.5, subsidy: 35000, name: 'Karnataka', minSubsidy: 18000, maxSubsidy: 55000 },
        tamilnadu: { rate: 6.5, subsidy: 25000, name: 'Tamil Nadu', minSubsidy: 12000, maxSubsidy: 40000 },
        gujarat: { rate: 8.0, subsidy: 40000, name: 'Gujarat', minSubsidy: 20000, maxSubsidy: 60000 },
        rajasthan: { rate: 9.0, subsidy: 45000, name: 'Rajasthan', minSubsidy: 22000, maxSubsidy: 65000 }
    };

    const calculations = useMemo(() => {
        const { monthlyBill, roofArea, state } = formData;
        const stateData = stateRates[state];

        // Calculate system size based on monthly bill
        const monthlyUnits = monthlyBill / stateData.rate;
        const systemSize = Math.min(monthlyUnits / 30 / 4.5 * 1.3, roofArea / 100);

        // System cost (₹50,000 per kW)
        const systemCost = systemSize * 50000;
        const subsidyAmount = Math.min(stateData.subsidy, systemCost * 0.4); // Max 40% subsidy
        const afterSubsidy = Math.max(systemCost - subsidyAmount, 0);

        // Monthly savings (80% of bill)
        const monthlySavings = monthlyBill * 0.8;
        const annualSavings = monthlySavings * 12;

        // Payback and ROI
        const paybackYears = afterSubsidy / annualSavings;
        const twentyFiveYearSavings = annualSavings * 25;
        const netSavings = twentyFiveYearSavings - afterSubsidy;
        const roi = ((netSavings / afterSubsidy) * 100);

        // Environmental impact
        const co2Reduction = Math.round(systemSize * 1.5 * 365 * 25 / 1000);
        const treesEquivalent = Math.round(co2Reduction * 50);

        return {
            systemSize: systemSize.toFixed(1),
            systemCost: Math.round(systemCost),
            subsidyAmount: Math.round(subsidyAmount),
            afterSubsidy: Math.round(afterSubsidy),
            monthlySavings: Math.round(monthlySavings),
            annualSavings: Math.round(annualSavings),
            paybackYears: paybackYears.toFixed(1),
            roi: roi.toFixed(0),
            totalSavings: Math.round(twentyFiveYearSavings),
            netSavings: Math.round(netSavings),
            co2Reduction,
            treesEquivalent,
            monthlyUnits: Math.round(monthlyUnits)
        };
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: field === 'state' ? value : parseFloat(value) || 0
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Official Solar Calculator
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        Solar Savings Calculator
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Calculate your potential savings with government-approved solar subsidies and incentives
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Input Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Enter Your Details
                            </h2>

                            {/* Monthly Bill */}
                            <div className="mb-6 sm:mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Monthly Electricity Bill
                                    </label>
                                    <span className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                        ₹{formData.monthlyBill.toLocaleString()}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1000"
                                    max="20000"
                                    step="500"
                                    value={formData.monthlyBill}
                                    onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>₹1,000</span>
                                    <span>₹20,000</span>
                                </div>
                            </div>

                            {/* Roof Area */}
                            <div className="mb-6 sm:mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Available Roof Area
                                    </label>
                                    <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                                        {formData.roofArea} sq.ft
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="2000"
                                    step="100"
                                    value={formData.roofArea}
                                    onChange={(e) => handleInputChange('roofArea', e.target.value)}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>100 sq.ft</span>
                                    <span>2000 sq.ft</span>
                                </div>
                            </div>

                            {/* State Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Select Your State
                                </label>
                                <select
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium"
                                >
                                    {Object.entries(stateRates).map(([key, data]) => (
                                        <option key={key} value={key}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Current State Info */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5">
                                <h4 className="font-bold text-blue-800 text-lg mb-2">
                                    {stateRates[formData.state].name} Benefits
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-blue-700">Electricity Rate:</span>
                                        <span className="font-semibold text-blue-800">₹{stateRates[formData.state].rate}/unit</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-700">Subsidy Available:</span>
                                        <span className="font-semibold text-green-600">₹{stateRates[formData.state].subsidy.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-700">Subsidy Range:</span>
                                        <span className="font-semibold text-blue-800">
                                            ₹{stateRates[formData.state].minSubsidy.toLocaleString()} - ₹{stateRates[formData.state].maxSubsidy.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <div className="bg-white rounded-xl p-4 sm:p-5 text-center shadow-lg border border-green-200">
                                <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                                    ₹{calculations.monthlySavings.toLocaleString()}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 font-medium">Monthly Savings</div>
                            </div>

                            <div className="bg-white rounded-xl p-4 sm:p-5 text-center shadow-lg border border-blue-200">
                                <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                                    ₹{calculations.annualSavings.toLocaleString()}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 font-medium">Annual Savings</div>
                            </div>

                            <div className="bg-white rounded-xl p-4 sm:p-5 text-center shadow-lg border border-orange-200">
                                <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">
                                    {calculations.paybackYears}yrs
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 font-medium">Payback Period</div>
                            </div>

                            <div className="bg-white rounded-xl p-4 sm:p-5 text-center shadow-lg border border-purple-200">
                                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
                                    {calculations.roi}%
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 font-medium">ROI</div>
                            </div>
                        </div>

                        {/* System Details & Savings */}
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {/* System Details */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    System Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <div>
                                            <div className="text-gray-600 text-sm">System Size</div>
                                            <div className="text-xs text-gray-400">Recommended capacity</div>
                                        </div>
                                        <span className="font-bold text-blue-600 text-lg">{calculations.systemSize} kW</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <div>
                                            <div className="text-gray-600 text-sm">Total System Cost</div>
                                            <div className="text-xs text-gray-400">Before subsidy</div>
                                        </div>
                                        <span className="font-bold text-gray-800 text-lg">₹{calculations.systemCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <div>
                                            <div className="text-green-600 text-sm font-semibold">Government Subsidy</div>
                                            <div className="text-xs text-green-500">Central & State benefits</div>
                                        </div>
                                        <span className="font-bold text-green-600 text-lg">- ₹{calculations.subsidyAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 bg-blue-50 rounded-lg px-4">
                                        <div>
                                            <div className="text-blue-700 text-sm font-bold">Your Investment</div>
                                            <div className="text-xs text-blue-600">After subsidy</div>
                                        </div>
                                        <span className="font-bold text-blue-700 text-xl">₹{calculations.afterSubsidy.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Environmental Impact */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Environmental Impact
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
                                        <div className="text-2xl font-bold text-green-600 mb-1">{calculations.co2Reduction} tons</div>
                                        <div className="text-sm text-green-700 font-medium">CO₂ Reduction in 25 years</div>
                                    </div>
                                    <div className="flex items-center space-x-4 bg-blue-50 rounded-xl p-4 border border-blue-200">
                                        <div className="text-3xl">🌳</div>
                                        <div>
                                            <div className="font-semibold text-blue-800">{calculations.treesEquivalent} trees</div>
                                            <div className="text-xs text-blue-600">Equivalent carbon absorption</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 bg-orange-50 rounded-xl p-4 border border-orange-200">
                                        <div className="text-3xl">🚗</div>
                                        <div>
                                            <div className="font-semibold text-orange-800">{Math.round(calculations.co2Reduction * 2.5)} cars</div>
                                            <div className="text-xs text-orange-600">Equivalent to taking cars off road</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Savings Breakdown */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6 sm:mb-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Savings Breakdown (25 Years)
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Total Electricity Savings</span>
                                        <span className="font-semibold text-green-600">₹{calculations.totalSavings.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Your Investment</span>
                                        <span className="font-semibold text-blue-600">- ₹{calculations.afterSubsidy.toLocaleString()}</span>
                                    </div>
                                    <div className="border-t pt-3 mt-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-800">Net Savings</span>
                                            <span className="text-2xl font-bold text-green-600">₹{calculations.netSavings.toLocaleString()}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            That's like earning ₹{Math.round(calculations.netSavings / 25 / 12).toLocaleString()} every month for 25 years!
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                                    <h4 className="font-semibold text-gray-800 mb-3">Key Benefits</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>25-year performance warranty</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>Government subsidy included</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>Maintenance-free operation</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>Grid-tied with net metering</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8 text-center text-white">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3">Ready to Go Solar?</h3>
                            <p className="text-blue-100 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                                Get your personalized solar proposal with exact pricing and subsidy details
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Get Exact Quote
                                </a>
                                <a
                                    href="/contact"
                                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
                                >
                                    Free Site Survey
                                </a>
                            </div>
                            <div className="mt-4 text-blue-200 text-xs sm:text-sm">
                                ✅ Free assessment • ✅ Subsidy guidance • ✅ EMI options
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Important Note</h4>
                    <p className="text-yellow-700 text-sm">
                        Subsidy amounts are based on current government schemes and may vary based on system size and eligibility criteria.
                        Final subsidy disbursement is subject to MNRE guidelines and state policies.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SolarCalculator;