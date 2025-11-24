import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
  location: String,
  languages: String,
  certifications: String,
  experience: String,
  contact: String,
}, { _id: false });

const travelGuideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: String,
  bio: String,
  image: String,
  details: detailsSchema,
}, { timestamps: true });

const travelGuide = mongoose.model('TravelGuide', travelGuideSchema);`nexport default travelGuide; 