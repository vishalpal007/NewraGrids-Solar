import { useState, useMemo } from 'react';

const SolarCalculator = () => {
    const [formData, setFormData] = useState({
        monthlyBill: 5000,
        roofArea: 1000,
        state: 'maharashtra'
    });

    const stateRates = {
        maharashtra: { rate: 8.5, subsidy: 40000, name: 'Maharashtra' },
        delhi: { rate: 7.0, subsidy: 30000, name: 'Delhi' },
        karnataka: { rate: 7.5, subsidy: 35000, name: 'Karnataka' },
        tamilnadu: { rate: 6.5, subsidy: 25000, name: 'Tamil Nadu' },
        gujarat: { rate: 8.0, subsidy: 40000, name: 'Gujarat' },
        rajasthan: { rate: 9.0, subsidy: 45000, name: 'Rajasthan' }
    };

    const calculations = useMemo(() => {
        const { monthlyBill, roofArea, state } = formData;
        const stateData = stateRates[state];

        // Calculate system size based on monthly bill
        const monthlyUnits = monthlyBill / stateData.rate;
        const systemSize = Math.min(monthlyUnits / 30 / 4.5 * 1.3, roofArea / 100);

        // System cost (₹50,000 per kW)
        const systemCost = systemSize * 50000;
        const afterSubsidy = Math.max(systemCost - stateData.subsidy, 0);

        // Monthly savings (80% of bill)
        const monthlySavings = monthlyBill * 0.8;
        const annualSavings = monthlySavings * 12;

        // Payback and ROI
        const paybackYears = afterSubsidy / annualSavings;
        const twentyFiveYearSavings = annualSavings * 25;
        const netSavings = twentyFiveYearSavings - afterSubsidy;
        const roi = ((netSavings / afterSubsidy) * 100);

        return {
            systemSize: systemSize.toFixed(1),
            systemCost: Math.round(systemCost),
            afterSubsidy: Math.round(afterSubsidy),
            monthlySavings: Math.round(monthlySavings),
            annualSavings: Math.round(annualSavings),
            paybackYears: paybackYears.toFixed(1),
            roi: roi.toFixed(0),
            totalSavings: Math.round(twentyFiveYearSavings),
            netSavings: Math.round(netSavings),
            co2Reduction: Math.round(systemSize * 1.5 * 365 * 25 / 1000), // tons CO2
        };
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: field === 'state' ? value : parseFloat(value) || 0
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        Solar Savings Calculator
                    </h1>
                    <p className="text-gray-600 text-lg">
                        See how much you can save with solar panels
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {/* Monthly Bill */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Monthly Electricity Bill
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="1000"
                                    max="20000"
                                    step="500"
                                    value={formData.monthlyBill}
                                    onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">₹1,000</span>
                                    <span className="text-lg font-semibold text-blue-600">
                                        ₹{formData.monthlyBill}
                                    </span>
                                    <span className="text-sm text-gray-500">₹20,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Roof Area */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Roof Area
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="100"
                                    max="2000"
                                    step="100"
                                    value={formData.roofArea}
                                    onChange={(e) => handleInputChange('roofArea', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">100 sq.ft</span>
                                    <span className="text-lg font-semibold text-blue-600">
                                        {formData.roofArea} sq.ft
                                    </span>
                                    <span className="text-sm text-gray-500">2000 sq.ft</span>
                                </div>
                            </div>
                        </div>

                        {/* State Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Your State
                            </label>
                            <select
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {Object.entries(stateRates).map(([key, data]) => (
                                    <option key={key} value={key}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Current State Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-blue-800">
                                    {stateRates[formData.state].name}
                                </h4>
                                <p className="text-sm text-blue-600">
                                    Electricity Rate: ₹{stateRates[formData.state].rate}/unit •
                                    Subsidy: ₹{stateRates[formData.state].subsidy.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                            ₹{calculations.monthlySavings}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Savings</div>
                    </div>

                    <div className="bg-white rounded-xl p-5 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                            ₹{calculations.annualSavings.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Annual Savings</div>
                    </div>

                    <div className="bg-white rounded-xl p-5 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                            {calculations.paybackYears}yrs
                        </div>
                        <div className="text-sm text-gray-600">Payback Period</div>
                    </div>

                    <div className="bg-white rounded-xl p-5 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                            {calculations.roi}%
                        </div>
                        <div className="text-sm text-gray-600">Return on Investment</div>
                    </div>
                </div>

                {/* System Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">System Size</span>
                                <span className="font-semibold">{calculations.systemSize} kW</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">Total Cost</span>
                                <span className="font-semibold">₹{calculations.systemCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">After Subsidy</span>
                                <span className="font-semibold">₹{calculations.afterSubsidy.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">CO₂ Reduction</span>
                                <span className="font-semibold">{calculations.co2Reduction} tons</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Long-term Savings</h3>
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">
                                    ₹{calculations.totalSavings.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600">25-Year Total Savings</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-green-800 font-medium">Net Savings</span>
                                    <span className="text-green-800 font-bold">
                                        ₹{calculations.netSavings.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-green-600 mt-1">
                                    After deducting system cost
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">Ready to Go Solar?</h3>
                    <p className="text-blue-100 mb-6 max-w-md mx-auto">
                        Get a free personalized quote and start saving with solar energy
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Get Free Quote
                        </a>
                        <a
                            href="/contact"
                            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Book Consultation
                        </a>
                    </div>
                    <div className="mt-4 text-blue-200 text-sm">
                        Free site assessment • No obligation • Expert advice
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolarCalculator;