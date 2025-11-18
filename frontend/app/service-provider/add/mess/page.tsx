"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, ArrowLeft, Upload, MapPin, Clock, Calendar, Users } from "lucide-react";
import { messAPI } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

export default function AddMessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    phone: "",
    address: "",
    distance: "",
    priceRange: "",
    mealsIncluded: {
      breakfast: false,
      lunch: false,
      dinner: false,
      snacks: false
    },
    menu: "",
    photos: [] as string[], // This will store base64 encoded images
    googleMapLink: "",
    openingTime: "",
    closingTime: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMealChange = (meal: string) => {
    setFormData(prev => ({
      ...prev,
      mealsIncluded: {
        ...prev.mealsIncluded,
        [meal]: !prev.mealsIncluded[meal as keyof typeof prev.mealsIncluded]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name) {
        alert("Mess name is required");
        setLoading(false);
        return;
      }
      
      if (!formData.ownerName) {
        alert("Owner name is required");
        setLoading(false);
        return;
      }
      
      if (!formData.phone) {
        alert("Phone number is required");
        setLoading(false);
        return;
      }
      
      if (!formData.priceRange) {
        alert("Price range is required");
        setLoading(false);
        return;
      }
      
      if (!formData.address) {
        alert("Address is required");
        setLoading(false);
        return;
      }

      const messData = {
        name: formData.name,
        ownerName: formData.ownerName,
        phone: formData.phone,
        address: formData.address,
        distance: parseFloat(formData.distance) || 0,
        priceRange: formData.priceRange,
        mealsIncluded: formData.mealsIncluded,
        menu: formData.menu.split('\n'),
        image: formData.photos.length > 0 ? formData.photos[0] : "https://via.placeholder.com/400x300?text=Mess+Service",
        photos: formData.photos, // Send all photos
        googleMapLink: formData.googleMapLink,
        timings: `${formData.openingTime} - ${formData.closingTime}`,
        description: formData.description,
        isOfficial: false
      };

      // Always use the public endpoint for mess listings to avoid authentication issues
      await messAPI.createPublic(messData);
      
      alert("Your mess service has been submitted. After verification, it will appear on Roomeze.");
      router.push("/mess-partners");
    } catch (error: any) {
      console.error("Error submitting mess:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
      alert(`Failed to submit mess service: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Add Mess / Canteen Service
            </h1>
            <p className="text-lg text-gray-600">
              Fill in the details of your mess service
            </p>
          </div>
          
          <Card className="p-6 md:p-8 bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mess Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Royal Mess"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Owner Name *
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., +91 9876543210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Price Range *
                    </label>
                    <input
                      type="text"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., ₹3000 - ₹5000"
                    />
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
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Complete address with area and landmarks"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distance from Atharva College (km)
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          name="distance"
                          value={formData.distance}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="e.g., 2.5"
                          step="0.1"
                        />
                      </div>
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
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        name="openingTime"
                        value={formData.openingTime}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        name="closingTime"
                        value={formData.closingTime}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Meals Included</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(formData.mealsIncluded).map(([meal, isChecked]) => (
                    <label key={meal} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleMealChange(meal)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="capitalize">{meal}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily/Weekly Menu
                  </label>
                  <textarea
                    name="menu"
                    value={formData.menu}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your daily/weekly menu, one item per line&#10;e.g.:&#10;Monday: Paneer Butter Masala, Roti, Rice&#10;Tuesday: Chicken Curry, Roti, Dal..."
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload photos of your mess</p>
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
                    About Your Mess
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Tell students about your mess, special offers, hygiene standards, etc."
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
                  {loading ? "Submitting..." : "Submit Mess Service"}
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