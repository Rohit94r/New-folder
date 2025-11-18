"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ArrowLeft, Upload, MapPin, Users, Wifi, Snowflake, Tv, Car, Shield } from "lucide-react";
import { propertiesAPI } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

export default function AddPGPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ownerPhone: "",
    rent: "",
    sharingType: "single",
    amenities: [] as string[],
    distance: "",
    roomSize: "",
    deposit: "",
    totalSeats: "",
    address: "",
    photos: [] as string[], // This will store base64 encoded images
    googleMapLink: "",
    description: ""
  });
  
  const [previewImages, setPreviewImages] = useState<string[]>([]); // For image previews

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPreviewImages: string[] = [];
    const newPhotos: string[] = [];

    // Process each selected file
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviewImages.push(event.target.result as string);
          newPhotos.push(event.target.result as string);
          
          // Update state when all files are processed
          if (newPreviewImages.length === files.length) {
            setPreviewImages(prev => [...prev, ...newPreviewImages]);
            setFormData(prev => ({
              ...prev,
              photos: [...prev.photos, ...newPhotos]
            }));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => {
      const amenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      
      return {
        ...prev,
        amenities
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name) {
        alert("PG/Hostel name is required");
        setLoading(false);
        return;
      }
      
      if (!formData.ownerPhone) {
        alert("Owner phone is required");
        setLoading(false);
        return;
      }
      
      if (!formData.rent) {
        alert("Rent is required");
        setLoading(false);
        return;
      }
      
      if (!formData.totalSeats) {
        alert("Total seats is required");
        setLoading(false);
        return;
      }
      
      if (!formData.address) {
        alert("Address is required");
        setLoading(false);
        return;
      }

      const propertyData = {
        name: formData.name,
        type: "PG",
        phone: formData.ownerPhone,
        address: formData.address,
        distanceFromCollege: parseFloat(formData.distance) || 0,
        roomSize: formData.roomSize,
        rent: parseFloat(formData.rent) || 0,
        deposit: parseFloat(formData.deposit) || 0,
        sharingType: formData.sharingType,
        amenities: formData.amenities,
        totalSeats: Number(formData.totalSeats),
        availability: "Available",
        image: formData.photos.length > 0 ? formData.photos[0] : "https://via.placeholder.com/400x300?text=PG+Hostel",
        photos: formData.photos, // Send all photos
        googleMapLink: formData.googleMapLink,
        description: formData.description
      };

      // Always use the public endpoint for PG listings to avoid authentication issues
      await propertiesAPI.createPublic(propertyData);
      
      alert("Your PG/Hostel listing has been submitted. After verification, it will appear on Roomeze.");
      router.push("/properties");
    } catch (error: any) {
      console.error("Error submitting PG listing:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
      alert(`Failed to submit PG/Hostel listing: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const amenitiesOptions = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "ac", label: "AC", icon: Snowflake },
    { id: "food", label: "Food", icon: Users },
    { id: "laundry", label: "Laundry", icon: Building2 },
    { id: "tv", label: "TV", icon: Tv },
    { id: "parking", label: "Parking", icon: Car },
    { id: "security", label: "Security", icon: Shield }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => router.push("/service-provider/add")}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Service Types
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Add PG / Hostel / Flat Listing
            </h1>
            <p className="text-lg text-gray-600">
              Fill in the details of your accommodation listing
            </p>
          </div>
          
          <Card className="p-6 md:p-8 bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PG/Hostel Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Royal PG for Students"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Owner Phone *
                    </label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., +91 9876543210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rent per Month (₹) *
                    </label>
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., 8000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sharing Type *
                    </label>
                    <select
                      name="sharingType"
                      value={formData.sharingType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="single">Single Occupancy</option>
                      <option value="double">Double Sharing</option>
                      <option value="triple">Triple Sharing</option>
                      <option value="four">Four Sharing</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {amenitiesOptions.map((amenity) => {
                    const IconComponent = amenity.icon;
                    return (
                      <label 
                        key={amenity.id}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.amenities.includes(amenity.id)
                            ? "bg-red-50 border-red-500"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity.id)}
                          onChange={() => handleAmenityChange(amenity.id)}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                        />
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm">{amenity.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Size (sq ft)
                    </label>
                    <input
                      type="number"
                      name="roomSize"
                      value={formData.roomSize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., 120"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats *
                    </label>
                    <input
                      type="number"
                      name="totalSeats"
                      value={formData.totalSeats}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., 10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deposit Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="deposit"
                      value={formData.deposit}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., 15000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance from College (km)
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="distance"
                        value={formData.distance}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g., 1.5"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Contact</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Complete address with area and landmarks"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Map Link
                    </label>
                    <input
                      type="url"
                      name="googleMapLink"
                      value={formData.googleMapLink}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload photos of your PG/Hostel</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  <Button type="button" variant="outline" className="mt-4" onClick={handlePhotoClick}>
                    Select Photos
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*" 
                    multiple 
                    onChange={handlePhotoChange}
                  />
                  
                  {/* Image previews */}
                  {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {previewImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Your PG/Hostel
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Tell students about your PG/Hostel, rules, environment, special offers, etc."
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/service-provider/add")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {loading ? "Submitting..." : "Submit PG/Hostel Listing"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}