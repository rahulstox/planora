import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDashboardData } from '../context/DashboardDataContext';

const CountriesVisited = () => {
    const navigate = useNavigate();
    const { setCountryCount } = useDashboardData();

    const visitedCountries = [
        "France",
        "Japan",
        "Italy",
        "Germany",
        "Spain",
        "Thailand",
        "India",
    ];

    // ✅ Update count using the correct array
    useEffect(() => {
        setCountryCount(visitedCountries.length);
    }, [visitedCountries, setCountryCount]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-pink-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Visited Countries</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition"
                    >
                        Back to Dashboard
                    </button>
                </div>

                {/* Scrollable list */}
                <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4 custom-scroll">
                    {visitedCountries.map((country, index) => (
                        <div
                            key={index}
                            className="bg-white/5 p-4 rounded-lg flex items-center justify-between hover:bg-white/10 transition"
                        >
                            <h3 className="text-white font-medium text-lg">{country}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                Completed
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountriesVisited;






