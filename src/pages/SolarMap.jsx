import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SolarMap = () => {
    const [mapRef, setMapRef] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [viewMode, setViewMode] = useState("irradiance"); // irradiance, savings, installations

    // Enhanced solar irradiance data for major Indian cities
    const indianCitiesData = [
        { city: "Jodhpur", lat: 26.2389, lon: 73.0243, irradiance: 6.2, potential: "Excellent", savings: 92, installations: 1800, description: "Highest solar irradiance in India" },
        { city: "Jaipur", lat: 26.9124, lon: 75.7873, irradiance: 5.9, potential: "Very High", savings: 88, installations: 2200, description: "Excellent for solar power generation" },
        { city: "Ahmedabad", lat: 23.0225, lon: 72.5714, irradiance: 5.8, potential: "Very High", savings: 87, installations: 1900, description: "Great solar potential with high irradiance" },
        { city: "Mumbai", lat: 19.0760, lon: 72.8777, irradiance: 5.5, potential: "High", savings: 85, installations: 3500, description: "Good coastal solar conditions" },
        { city: "Delhi", lat: 28.6139, lon: 77.2090, irradiance: 5.3, potential: "High", savings: 82, installations: 4200, description: "Strong solar potential in capital region" },
        { city: "Chennai", lat: 13.0827, lon: 80.2707, irradiance: 5.4, potential: "High", savings: 83, installations: 2800, description: "Consistent solar radiation throughout year" },
        { city: "Bengaluru", lat: 12.9716, lon: 77.5946, irradiance: 5.2, potential: "High", savings: 80, installations: 3200, description: "Moderate to high solar irradiance" },
        { city: "Hyderabad", lat: 17.3850, lon: 78.4867, irradiance: 5.3, potential: "High", savings: 81, installations: 2500, description: "Excellent solar conditions" },
        { city: "Kolkata", lat: 22.5726, lon: 88.3639, irradiance: 4.9, potential: "Medium", savings: 78, installations: 1800, description: "Moderate solar potential" },
        { city: "Pune", lat: 18.5204, lon: 73.8567, irradiance: 5.4, potential: "High", savings: 84, installations: 2100, description: "Good solar radiation levels" },
        { city: "Surat", lat: 21.1702, lon: 72.8311, irradiance: 5.7, potential: "High", savings: 86, installations: 1500, description: "High solar irradiance area" },
        { city: "Lucknow", lat: 26.8467, lon: 80.9462, irradiance: 5.1, potential: "Medium", savings: 79, installations: 1200, description: "Moderate solar conditions" },
        { city: "Bhopal", lat: 23.2599, lon: 77.4126, irradiance: 5.4, potential: "High", savings: 83, installations: 900, description: "Good for solar installations" },
        { city: "Indore", lat: 22.7196, lon: 75.8577, irradiance: 5.6, potential: "High", savings: 85, installations: 1100, description: "Strong solar radiation" },
        { city: "Patna", lat: 25.5941, lon: 85.1376, irradiance: 5.0, potential: "Medium", savings: 77, installations: 800, description: "Moderate solar potential" }
    ];

    // Enhanced color scale for solar irradiance
    const getColor = (irradiance) => {
        if (irradiance >= 6.0) return "#16a34a"; // Excellent - Green
        if (irradiance >= 5.5) return "#22c55e"; // Very High - Light Green
        if (irradiance >= 5.0) return "#eab308"; // High - Yellow
        if (irradiance >= 4.5) return "#f97316"; // Medium - Orange
        return "#dc2626"; // Low - Red
    };

    const getRadius = (value, mode) => {
        switch (mode) {
            case "irradiance":
                return Math.max(8, Math.min(25, value * 4));
            case "savings":
                return Math.max(6, Math.min(20, value / 5));
            case "installations":
                return Math.max(5, Math.min(18, value / 200));
            default:
                return 10;
        }
    };

    const getValueByMode = (city, mode) => {
        switch (mode) {
            case "irradiance":
                return city.irradiance;
            case "savings":
                return city.savings;
            case "installations":
                return city.installations;
            default:
                return city.irradiance;
        }
    };

    const getPopupContent = (city) => (
        <div className="p-3 min-w-[280px]">
            <h3 className="font-bold text-lg text-gray-800 mb-2">{city.city}</h3>
            <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Solar Irradiance:</span>
                    <span className="font-semibold text-blue-600">{city.irradiance} kWh/m²/day</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Potential:</span>
                    <span
                        className="font-semibold px-2 py-1 rounded-full text-white text-xs"
                        style={{ backgroundColor: getColor(city.irradiance) }}
                    >
                        {city.potential}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Savings:</span>
                    <span className="font-semibold text-green-600">{city.savings}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Installations:</span>
                    <span className="font-semibold">{city.installations}+</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mb-3 italic border-t pt-2">
                {city.description}
            </p>
            <div className="space-y-2">
                <button
                    onClick={() => window.location.href = '/calculator'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                >
                    Calculate Savings for {city.city}
                </button>
                <button
                    onClick={() => window.location.href = '/contact'}
                    className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                >
                    Get Quote for {city.city}
                </button>
            </div>
        </div>
    );

    // Map listener component
    function MapListener({ onBoundsChange }) {
        useMapEvents({
            moveend: (e) => {
                const map = e.target;
                onBoundsChange(map.getBounds());
            },
            zoomend: (e) => {
                const map = e.target;
                onBoundsChange(map.getBounds());
            },
        });
        return null;
    }

    const handleBoundsChange = useCallback(async (bounds) => {
        setMarkers(indianCitiesData);
    }, []);

    useEffect(() => {
        if (mapRef) {
            handleBoundsChange(mapRef.getBounds());
        }
    }, [mapRef, handleBoundsChange]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Solar Irradiance Map
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                        Explore solar irradiance levels across India. Solar irradiance measures how much solar power
                        you receive at your location - higher values mean more energy generation potential.
                    </p>

                    {/* View Mode Selector */}
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <button
                            onClick={() => setViewMode("irradiance")}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${viewMode === "irradiance"
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-100 border"
                                }`}
                        >
                            ☀️ Solar Irradiance
                        </button>
                        <button
                            onClick={() => setViewMode("savings")}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${viewMode === "savings"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-100 border"
                                }`}
                        >
                            💰 Savings Potential
                        </button>
                        <button
                            onClick={() => setViewMode("installations")}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${viewMode === "installations"
                                ? "bg-purple-600 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-100 border"
                                }`}
                        >
                            🏠 Installations
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Legend */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">
                                {viewMode === "irradiance" ? "Solar Irradiance Levels" :
                                    viewMode === "savings" ? "Savings Potential" :
                                        "Installation Density"}
                            </h3>
                            <div className="space-y-3 text-sm">
                                {viewMode === "irradiance" && [
                                    { level: 'Excellent', color: '#16a34a', min: 6.0, desc: '6.0+ kWh/m²/day' },
                                    { level: 'Very High', color: '#22c55e', min: 5.5, desc: '5.5-6.0 kWh/m²/day' },
                                    { level: 'High', color: '#eab308', min: 5.0, desc: '5.0-5.5 kWh/m²/day' },
                                    { level: 'Medium', color: '#f97316', min: 4.5, desc: '4.5-5.0 kWh/m²/day' },
                                    { level: 'Low', color: '#dc2626', min: 0, desc: 'Below 4.5 kWh/m²/day' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div
                                            className="w-4 h-4 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{item.level}</div>
                                            <div className="text-xs text-gray-500">
                                                {item.desc}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {viewMode === "savings" && [
                                    { range: '85-92%', color: '#16a34a', desc: 'Maximum savings' },
                                    { range: '80-84%', color: '#22c55e', desc: 'High savings' },
                                    { range: '75-79%', color: '#eab308', desc: 'Good savings' },
                                    { range: '70-74%', color: '#f97316', desc: 'Moderate savings' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div
                                            className="w-4 h-4 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{item.range}</div>
                                            <div className="text-xs text-gray-500">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* City List */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">
                                Major Indian Cities
                            </h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {indianCitiesData.map((city, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedRegion(city);
                                            if (mapRef) {
                                                mapRef.setView([city.lat, city.lon], 10);
                                            }
                                        }}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 ${selectedRegion?.city === city.city
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold text-gray-900">
                                                {city.city}
                                            </div>
                                            <div
                                                className="px-2 py-1 rounded-full text-xs font-bold text-white"
                                                style={{ backgroundColor: getColor(city.irradiance) }}
                                            >
                                                {city.irradiance}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <div>Irradiance: <span className="font-medium">{city.irradiance} kWh/m²/day</span></div>
                                            <div>Savings: <span className="font-medium text-green-600">{city.savings}%</span></div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">
                                Solar Irradiance Facts
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">National Average:</span>
                                    <span className="font-semibold">5.3 kWh/m²/day</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Global Average:</span>
                                    <span className="font-semibold">4.8 kWh/m²/day</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Peak Hours:</span>
                                    <span className="font-semibold">5-7 hours/day</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Best Season:</span>
                                    <span className="font-semibold">March-June</span>
                                </div>
                            </div>
                        </div>

                        {/* What is Solar Irradiance */}
                        <div className="bg-blue-50 rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-3 text-gray-800">
                                What is Solar Irradiance?
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Solar irradiance is the power per unit area received from the Sun. It's measured in
                                kilowatt-hours per square meter per day (kWh/m²/day).
                            </p>
                            <div className="text-xs text-blue-700 space-y-1">
                                <div>• <strong>5.0+</strong>: Excellent for solar</div>
                                <div>• <strong>4.0-5.0</strong>: Good for solar</div>
                                <div>• <strong>Below 4.0</strong>: Moderate potential</div>
                            </div>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <div className="h-96 lg:h-[600px] rounded-xl overflow-hidden relative">
                                {loading && (
                                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                            <p className="text-gray-700 font-medium">Loading solar irradiance data...</p>
                                        </div>
                                    </div>
                                )}

                                <MapContainer
                                    center={[22.9734, 78.6569]} // Center of India
                                    zoom={5}
                                    style={{ height: '100%', width: '100%' }}
                                    ref={setMapRef}
                                    className="rounded-xl"
                                >
                                    <LayersControl position="topright">
                                        <LayersControl.BaseLayer checked name="Street Map">
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                            />
                                        </LayersControl.BaseLayer>
                                        <LayersControl.BaseLayer name="Satellite View">
                                            <TileLayer
                                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                                            />
                                        </LayersControl.BaseLayer>
                                        <LayersControl.BaseLayer name="Terrain">
                                            <TileLayer
                                                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                                            />
                                        </LayersControl.BaseLayer>
                                    </LayersControl>

                                    <MapListener onBoundsChange={handleBoundsChange} />

                                    {markers.map((city, idx) => {
                                        const value = getValueByMode(city, viewMode);
                                        const color = viewMode === "irradiance" ? getColor(city.irradiance) :
                                            viewMode === "savings" ? getColor(city.savings / 15) :
                                                "#8b5cf6"; // Purple for installations

                                        return (
                                            <CircleMarker
                                                key={`${city.lat}-${city.lon}-${idx}`}
                                                center={[city.lat, city.lon]}
                                                radius={getRadius(value, viewMode)}
                                                pathOptions={{
                                                    color,
                                                    fillColor: color,
                                                    fillOpacity: 0.7,
                                                    weight: 2
                                                }}
                                                eventHandlers={{
                                                    click: () => setSelectedRegion(city),
                                                }}
                                            >
                                                <Popup>
                                                    {getPopupContent(city)}
                                                </Popup>
                                            </CircleMarker>
                                        );
                                    })}
                                </MapContainer>
                            </div>
                        </div>

                        {/* Additional Information Cards */}
                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                                <div className="text-3xl font-bold text-blue-600 mb-2">5.3</div>
                                <div className="text-sm text-gray-600">Avg. Solar Irradiance (kWh/m²/day)</div>
                            </div>
                            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                                <div className="text-3xl font-bold text-green-600 mb-2">82%</div>
                                <div className="text-sm text-gray-600">Average Electricity Bill Reduction</div>
                            </div>
                            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                                <div className="text-3xl font-bold text-purple-600 mb-2">6-8 Years</div>
                                <div className="text-sm text-gray-600">Average Payback Period</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-center text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to Harness Solar Energy?
                    </h3>
                    <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                        Use our solar calculator to see how much you can save based on your location's solar irradiance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/calculator"
                            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Calculate Your Savings
                        </a>
                        <a
                            href="/contact"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Get Free Consultation
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolarMap;