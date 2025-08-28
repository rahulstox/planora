import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Custom/Navbar";
import { useTheme } from "../context/ThemeContext";
import { config } from "../config";
import axios from "axios";

function Hotels() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  // State for search query, suggestions, and results
  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search).get("query") || ""
  );
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- API CALLS ---

  // Fetches location suggestions from OpenStreetMap
  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  }, []);

  // Fetches hotel results from our backend
  const fetchHotels = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setHotels([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${config.API_BASE_URL}/hotels/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      setHotels(res.data);
    } catch (err) {
      console.error("Failed to fetch hotels:", err);
      setError(
        "Could not fetch hotels. The API might be down or your key may be invalid."
      );
      toast.error("Failed to fetch hotels.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce effect for search suggestions
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions(query);
    }, 300); // 300ms delay after user stops typing
    return () => clearTimeout(handler);
  }, [query, fetchSuggestions]);

  // Effect to run search when the URL changes
  useEffect(() => {
    const currentQuery =
      new URLSearchParams(location.search).get("query") || "";
    setQuery(currentQuery);
    if (currentQuery) {
      fetchHotels(currentQuery);
    } else {
      setHotels([]); // Clear hotels if there's no query
    }
  }, [location.search, fetchHotels]);

  // --- EVENT HANDLERS ---

  const handleSearchSubmit = (searchQuery) => {
    setIsSuggestionsVisible(false);
    if (searchQuery.trim()) {
      navigate(`/hotels?query=${searchQuery}`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(query);
  };

  const handleSuggestionClick = (placeName) => {
    const mainName = placeName.split(",")[0];
    setQuery(mainName);
    handleSearchSubmit(mainName);
  };

  const handleLike = async (hotel) => {
    // This function remains the same
  };

  return (
    <div
      className={`flex flex-col min-h-screen w-full overflow-x-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-black to-pink-900"
          : "bg-gradient-to-b from-blue-50 via-pink-50 to-purple-50"
      }`}
    >
      <Navbar lightBackground={false} />
      <main className="flex flex-col flex-1 w-full items-center">
        <section className="w-full py-24 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700 mb-6">
            Explore World-Class <span className="text-pink-600">Hotels</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
            Search and book from a live database of hotels worldwide.
          </p>
          <div className="w-full max-w-lg relative">
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSuggestionsVisible(true)}
                onBlur={() =>
                  setTimeout(() => setIsSuggestionsVisible(false), 200)
                } // Hide on blur with a small delay
                placeholder="Search any city or destination..."
                className={`w-full px-6 py-4 rounded-xl border-2 text-gray-900 ...`}
              />
            </form>
            {isSuggestionsVisible && suggestions.length > 0 && (
              <div
                className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-lg z-10 border overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                {suggestions.map((place) => (
                  <div
                    key={place.place_id}
                    onMouseDown={() =>
                      handleSuggestionClick(place.display_name)
                    }
                    className={`px-4 py-3 cursor-pointer ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    {place.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="max-w-7xl w-full pt-12 px-4 pb-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <p className="col-span-full text-center text-lg">
              Searching for hotels...
            </p>
          )}
          {error && (
            <p className="col-span-full text-center text-red-500">{error}</p>
          )}

          {!loading &&
            !error &&
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className={`flex flex-col rounded-2xl shadow-xl ...`}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  className="w-full h-56 object-cover object-center rounded-t-2xl"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className={`text-2xl font-semibold ...`}>{hotel.name}</h3>
                  <span className={`font-medium mb-3 ...`}>
                    {hotel.location}
                  </span>
                  <p className={`text-sm line-clamp-3 flex-1 ...`}>
                    {hotel.description}
                  </p>
                  <button
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                    className="mt-4 self-start bg-gradient-to-r ..."
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleLike(hotel)}
                    className={`mt-2 px-4 py-2 rounded-lg ...`}
                  >
                    ❤️ Save to Dashboard
                  </button>
                </div>
              </div>
            ))}
          {!loading && !error && hotels.length === 0 && query && (
            <p className={`col-span-full text-center text-lg font-medium ...`}>
              No hotels match your search for "{query}".
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Hotels;
