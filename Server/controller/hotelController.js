// Server/controller/hotelController.js

const axios = require('axios');
const { asyncHandler } = require('../utils/asyncHandler');

// Helper function to get the destination ID for a city name
const getDestinationId = async (cityName) => {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        params: { name: cityName, locale: 'en-gb' },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };
    const response = await axios.request(options);
    // Return the dest_id of the first result (most relevant)
    if (response.data && response.data.length > 0) {
        return response.data[0].dest_id;
    }
    return null;
};

exports.searchHotels = asyncHandler(async (req, res) => {
    const { query } = req.query; // e.g., "Noida"

    if (!query) {
        return res.status(400).json({ error: 'A search query is required.' });
    }

    // Step 1: Get the Destination ID for the searched city
    const destId = await getDestinationId(query);

    if (!destId) {
        return res.json([]); // Return an empty array if city is not found
    }

    // Step 2: Use the Destination ID to search for hotels
    const hotelSearchOptions = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
            checkin_date: '2025-09-27',
            dest_type: 'city',
            units: 'metric',
            checkout_date: '2025-09-28',
            adults_number: '2',
            order_by: 'popularity',
            dest_id: destId, // <-- Using the dynamic destId here!
            filter_by_currency: 'USD',
            locale: 'en-gb',
            room_number: '1',
            page_number: '0',
            include_adjacency: 'true'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    const response = await axios.request(hotelSearchOptions);

    const formattedHotels = response.data.result.map(hotel => ({
        id: hotel.hotel_id,
        name: hotel.hotel_name,
        location: `${hotel.city}, ${hotel.country_trans}`,
        rating: (hotel.review_score / 2).toFixed(1),
        image: hotel.max_photo_url.replace('square60', 'square200'),
        description: `A fantastic hotel with a score of ${hotel.review_score_word}.`,
        price: hotel.composite_price_breakdown?.gross_amount_per_night?.value || 0,
        isPetFriendly: hotel.is_pet_friendly || false
    }));

    res.status(200).json(formattedHotels);
});