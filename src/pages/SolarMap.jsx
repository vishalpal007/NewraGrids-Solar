import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents, LayersControl, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SolarMap = () => {
    const [mapRef, setMapRef] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [viewMode, setViewMode] = useState("irradiance");
    const mapContainerRef = useRef(null);

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
        if (irradiance >= 6.0) return "#16a34a";
        if (irradiance >= 5.5) return "#22c55e";
        if (irradiance >= 5.0) return "#eab308";
        if (irradiance >= 4.5) return "#f97316";
        return "#dc2626";
    };

    const getRadius = (value, mode) => {
        switch (mode) {
            case "irradiance":
                return Math.max(6, Math.min(20, value * 3));
            case "savings":
                return Math.max(5, Math.min(16, value / 6));
            case "installations":
                return Math.max(4, Math.min(14, value / 250));
            default:
                return 8;
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
        <div className="p-4 min-w-[260px] max-w-[90vw]">
            <h3 className="font-bold text-lg text-gray-800 mb-3 border-b pb-2">{city.city}</h3>
            <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Solar Irradiance:</span>
                    <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {city.irradiance} kWh/m²/day
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Potential:</span>
                    <span
                        className="font-semibold px-3 py-1 rounded-full text-white text-xs"
                        style={{ backgroundColor: getColor(city.irradiance) }}
                    >
                        {city.potential}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Savings:</span>
                    <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {city.savings}%
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Installations:</span>
                    <span className="font-semibold bg-gray-100 px-2 py-1 rounded">{city.installations}+</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mb-4 italic border-t pt-3">
                {city.description}
            </p>
            <div className="space-y-3">
                <button
                    onClick={() => window.location.href = '/calculator'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                >
                    Calculate Savings for {city.city}
                </button>
                <button
                    onClick={() => window.location.href = '/contact'}
                    className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
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

    // Prevent map zoom on scroll
    useEffect(() => {
        if (mapRef) {
            mapRef.scrollWheelZoom.disable();
            mapRef.doubleClickZoom.disable();
        }
    }, [mapRef]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                {/* Enhanced Header Section */}
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
                        Solar Potential Mapping
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                        India Solar Irradiance Map
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
                        Explore solar potential across India. Discover irradiance levels, savings potential,
                        and installation density in major cities.
                    </p>

                    {/* Enhanced View Mode Selector */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-2">
                        {[
                            { mode: "irradiance", label: "☀️ Solar Irradiance", color: "blue" },
                            { mode: "savings", label: "💰 Savings Potential", color: "green" },
                            { mode: "installations", label: "🏠 Installations", color: "purple" }
                        ].map((item) => (
                            <button
                                key={item.mode}
                                onClick={() => setViewMode(item.mode)}
                                className={`px-5 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${viewMode === item.mode
                                        ? `bg-${item.color}-600 text-white shadow-lg`
                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                    {/* Enhanced Sidebar */}
                    <div className="lg:w-1/3 xl:w-1/4 space-y-4 sm:space-y-6 order-2 lg:order-1">
                        {/* Legend Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                {viewMode === "irradiance" ? "Solar Irradiance Levels" :
                                    viewMode === "savings" ? "Savings Potential" :
                                        "Installation Density"}
                            </h3>
                            <div className="space-y-3 text-sm">
                                {viewMode === "irradiance" && [
                                    { level: 'Excellent', color: '#16a34a', desc: '6.0+ kWh/m²/day' },
                                    { level: 'Very High', color: '#22c55e', desc: '5.5-6.0 kWh/m²/day' },
                                    { level: 'High', color: '#eab308', desc: '5.0-5.5 kWh/m²/day' },
                                    { level: 'Medium', color: '#f97316', desc: '4.5-5.0 kWh/m²/day' },
                                    { level: 'Low', color: '#dc2626', desc: 'Below 4.5 kWh/m²/day' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div
                                            className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-gray-900 text-sm">{item.level}</div>
                                            <div className="text-xs text-gray-500 truncate">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}

                                {viewMode === "savings" && [
                                    { range: '85-92%', color: '#16a34a', desc: 'Maximum savings' },
                                    { range: '80-84%', color: '#22c55e', desc: 'High savings' },
                                    { range: '75-79%', color: '#eab308', desc: 'Good savings' },
                                    { range: '70-74%', color: '#f97316', desc: 'Moderate savings' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div
                                            className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-gray-900 text-sm">{item.range}</div>
                                            <div className="text-xs text-gray-500">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* City List Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Major Indian Cities
                            </h3>
                            <div className="space-y-2 max-h-80 sm:max-h-96 overflow-y-auto pr-2 -mr-2">
                                {indianCitiesData.map((city, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedRegion(city);
                                            if (mapRef) {
                                                mapRef.setView([city.lat, city.lon], 10);
                                            }
                                        }}
                                        className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-200 border-2 ${selectedRegion?.city === city.city
                                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                                : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold text-gray-900 text-sm sm:text-base">
                                                {city.city}
                                            </div>
                                            <div
                                                className="px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                                                style={{ backgroundColor: getColor(city.irradiance) }}
                                            >
                                                {city.irradiance}
                                            </div>
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                                            <div className="flex justify-between">
                                                <span>Irradiance:</span>
                                                <span className="font-medium">{city.irradiance} kWh/m²</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Savings:</span>
                                                <span className="font-medium text-green-600">{city.savings}%</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
                            <h3 className="text-lg font-bold mb-4 flex items-center">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                Solar Facts
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-blue-400/30">
                                    <span className="text-blue-100">National Average:</span>
                                    <span className="font-semibold">5.3 kWh/m²/day</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-blue-400/30">
                                    <span className="text-blue-100">Global Average:</span>
                                    <span className="font-semibold">4.8 kWh/m²/day</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-blue-400/30">
                                    <span className="text-blue-100">Peak Hours:</span>
                                    <span className="font-semibold">5-7 hours/day</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-blue-100">Best Season:</span>
                                    <span className="font-semibold">March-June</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Map Container */}
                    <div className="lg:w-2/3 xl:w-3/4 order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200">
                            <div
                                ref={mapContainerRef}
                                className="h-80 sm:h-96 lg:h-[500px] xl:h-[600px] rounded-xl overflow-hidden relative border border-gray-300"
                            >
                                {loading && (
                                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-xl">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                            <p className="text-gray-700 font-medium">Loading solar data...</p>
                                        </div>
                                    </div>
                                )}

                                <MapContainer
                                    center={[22.9734, 78.6569]}
                                    zoom={5}
                                    style={{ height: '100%', width: '100%' }}
                                    ref={setMapRef}
                                    className="rounded-xl"
                                    zoomControl={false}
                                    scrollWheelZoom={false}
                                    doubleClickZoom={false}
                                    dragging={true}
                                    touchZoom={true}
                                >
                                    <ZoomControl position="bottomright" />

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
                                                "#8b5cf6";

                                        return (
                                            <CircleMarker
                                                key={`${city.lat}-${city.lon}-${idx}`}
                                                center={[city.lat, city.lon]}
                                                radius={getRadius(value, viewMode)}
                                                pathOptions={{
                                                    color: '#ffffff',
                                                    fillColor: color,
                                                    fillOpacity: 0.8,
                                                    weight: 2,
                                                    opacity: 1
                                                }}
                                                eventHandlers={{
                                                    click: () => setSelectedRegion(city),
                                                }}
                                            >
                                                <Popup className="custom-popup">
                                                    {getPopupContent(city)}
                                                </Popup>
                                            </CircleMarker>
                                        );
                                    })}
                                </MapContainer>
                            </div>

                            {/* Map Controls Info */}
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                        💡 Click cities for details
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-xs">Use + - buttons to zoom</span>
                                </div>
                            </div>

                            {/* Enhanced Information Cards */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">5.3</div>
                                    <div className="text-xs sm:text-sm text-gray-700 font-medium">Avg. Solar Irradiance (kWh/m²/day)</div>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
                                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">82%</div>
                                    <div className="text-xs sm:text-sm text-gray-700 font-medium">Avg. Electricity Bill Reduction</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
                                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">6-8 Years</div>
                                    <div className="text-xs sm:text-sm text-gray-700 font-medium">Avg. Payback Period</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Bottom CTA */}
                <div className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8 text-center text-white">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                        Ready to Harness Solar Energy?
                    </h3>
                    <p className="text-blue-100 text-base sm:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
                        Calculate your potential savings based on your location's solar irradiance data.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <a
                            href="/calculator"
                            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 sm:px-8 rounded-lg text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Calculate Your Savings
                        </a>
                        <a
                            href="/contact"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 sm:px-8 rounded-lg text-base transition-all duration-300 transform hover:scale-105"
                        >
                            Get Free Consultation
                        </a>
                    </div>
                    <div className="mt-4 text-blue-200 text-xs sm:text-sm">
                        No obligation • Free assessment • Expert consultation
                    </div>
                </div>
            </div>

            {/* Custom CSS for better map controls */}
            <style jsx>{`
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .leaflet-control-zoom a {
                    background: white !important;
                    color: #374151 !important;
                    border: 1px solid #d1d5db !important;
                    font-weight: bold;
                }
                .leaflet-control-zoom a:hover {
                    background: #f3f4f6 !important;
                }
                @media (max-width: 640px) {
                    .leaflet-control-layers {
                        transform: scale(0.8);
                        transform-origin: top right;
                    }
                }
            `}</style>
        </div>
    );
};

export default SolarMap;