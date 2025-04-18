import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LandlordNavbar from "../../LandlordNavbar/LandlordNavbar";
import "./CreateHostel.css";
import Step1Intro from "./StepsIntro/Step1Intro";
import Step2Intro from "./StepsIntro/Step2Intro";
import Step3intro from "./StepsIntro/Step3intro";
import loadingGif from "../../../assets/loading.gif";
import { BsArrowRight } from "react-icons/bs";
import StepNavigation from "./StepNavigation/StepNavigation";
import FinalInfo from "./HostelStep3/HostelStep3";
import HostelStep1 from "./HostelStep1/HostelStep1";
import HostelStep2 from "./HostelStep2/HostelStep2";
import HostelStep3 from "./HostelStep3/HostelStep3";
import HostelStep4 from "./HostelStep4/HostelStep4";
import HostelStep5 from "./HostelStep5/HostelStep5";
import HostelStep7 from "./HostelStep7/HostelStep7";
import HostelStep6 from "./HostelStep6/HostelStep6";
import HostelMap from "./HostelMap";

const CreateHostel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hostelData, setHostelData] = useState({
    name: "",
    location: "",
    price_per_month: "",
    description: "",
    room_type: "",
    bedrooms: "",
    toilet: false,
    kitchen: false,
    study_room: false,
    wifi: false,
    bathroom: false,
    wardrobe: false,
    laundry_services: false,
    balcony: false,
    garden: false,
    swimming_pool: false,
    gym: false,
    available_units: "",
    parking: false,
    cctv_cameras: false,
    hot_shower: false,
    air_conditioner: false,
    smoke_alarm: false,
    first_aid_kit: false,
    water_supply: "",
    security: "",
    latitude: "",
    longitude: "",
    deposit_amount: "",
    pet_friendly: false,
    electricity_billing: "",
    max_occupancy: "",
    furnishing: "",
    nearby_facilities: "",
    rules: "",
    university_id: ""
  });

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const landlordId = localStorage.getItem("landlord_id");

  // Function to get location coordinates
  const getLocationCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setHostelData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(
            "Failed to get location. Please enable location services."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  // Automatically fetch coordinates when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setHostelData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get location. Please enable location services.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handler for updating coordinates from map
  const handleMapCoordinates = ({ latitude, longitude }) => {
    setHostelData((prevData) => ({
      ...prevData,
      latitude,
      longitude,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHostelData({
      ...hostelData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
  
    // Append all hostel data
    Object.keys(hostelData).forEach((key) => {
      formData.append(`hostel[${key}]`, hostelData[key]);
    });
  
    // Append images
    Array.from(images).forEach((image) => {
      formData.append("hostel[images][]", image);
    });
  
    // Append landlord_id and university_id
    formData.append("hostel[landlord_id]", landlordId); // Ensure landlordId is set correctly
    formData.append("hostel[university_id]", hostelData.university_id); // Ensure university_id is set correctly
  
    try {
      const response = await axios.post(
        "http://localhost:3000/hostels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrls(response.data.image_urls);

      toast.success(
        "Hostel created successfully!"
      );
      toast.success("Redirecting to dashboard");
      setTimeout(() => {
        window.location.href = "/landlord/dashboard";
      }, 8000);
    } catch (error) {
      toast.error("Failed to create hostel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 1200);
  };

  const prevStep = () => {
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
    }, 1200);
  };

  return (
    <>
      <LandlordNavbar />
      <ToastContainer />
      <div className="create-hostel-form container">
        <form onSubmit={handleSubmit}>
          {/* Step 0: Introduction */}
          {currentStep === 0 && (
            <div className="step-container">
              <Step1Intro />
              <StepNavigation onNext={nextStep} />
            </div>
          )}
          {/* Step 1: Basic Hostel Information */}
          {currentStep === 1 && (
            <div className="step-container_">
              <HostelStep1
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}{" "}
          {/* Hostel Location Step */}
          {currentStep === 2 && (
            <div className="step-container">
              <div style={{ margin: "2rem 0" }}>
                <h4>Select Hostel Location</h4>
                <HostelMap
                  latitude={hostelData.latitude}
                  longitude={hostelData.longitude}
                  setCoordinates={handleMapCoordinates}
                />
                {hostelData.latitude && hostelData.longitude && (
                  <p>
                    Selected Coordinates: <b>{hostelData.latitude}, {hostelData.longitude}</b>
                  </p>
                )}
              </div>
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 3 && (
            <div className="step-container">
              <Step2Intro />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 4 && (
            <div className="step-container">
              <HostelStep2
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 5 && (
            <div className="step-container">
              <HostelStep3
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 6 && (
            <div className="step-container">
              <HostelStep4
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 7 && (
            <div className="step-container">
              <HostelStep5
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 8 && (
            <div className="step-container">
              <Step3intro />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 9 && (
            <div className="step-container">
              <HostelStep6
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}
          {currentStep === 10 && (
            <div className="step-container">
              <HostelStep7
                hostelData={hostelData}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                imageUrls={imageUrls}
              />
              <div className="step-buttons-container container">
                <span className="back-link" onClick={prevStep}>
                  Back
                </span>
                <button
                  type="submit"
                  className="submit-hostel-button"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Hostel"}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Loading Overlay */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <img src={loadingGif} alt="loading-gif" />
              <p>Creating your hostel, please wait...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateHostel;
