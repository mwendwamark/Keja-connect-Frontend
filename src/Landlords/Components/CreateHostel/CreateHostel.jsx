import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LandlordNavbar from "../../LandlordNavbar/LandlordNavbar";
import "./CreateHostel.css";
import Step1Intro from "../StepsIntro/Step1Intro";
import Step2Intro from "../StepsIntro/Step2Intro";
import Step3intro from "../StepsIntro/Step3intro";
import loadingGif from "../../../assets/loading.gif";
import { BsArrowRight } from "react-icons/bs";
import BasicHostelInfo from "./BasicHostelInfo/BasicHostelInfo";
import StepNavigation from "./StepNavigation/StepNavigation";
import AmenitiesInfo from "./Amenitiesinfo/AmenitiesInfo";
import FinalInfo from "./FinalInfo/FinalInfo";
const CreateHostel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hostelData, setHostelData] = useState({
    name: "",
    location: "",
    price_per_month: "",
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
    tokens: false,
    cctv_cameras: false,
    hot_shower: false,
    air_conditioner: false,
    smoke_alarm: false,
    first_aid_kit: false,
    water_supply: "",
    security: "",
  });

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const landlordId = localStorage.getItem("landlord_id");

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

    Object.keys(hostelData).forEach((key) => {
      formData.append(`hostel[${key}]`, hostelData[key]);
    });

    Array.from(images).forEach((image) => {
      formData.append("hostel[images][]", image);
    });

    formData.append("hostel[landlord_id]", landlordId);

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
      toast.success("Hostel created successfully!");
      setTimeout(() => {
        window.location.href = "/landlord/dashboard";
      }, 5000);
    } catch (error) {
      console.error("Error creating hostel:", error);
      toast.error("Failed to create hostel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 1500);
  };

  const prevStep = () => {
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
    }, 1500);
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
              <div className="step-buttons-container container">
                <span className="back-link" onClick={prevStep}></span>
                <button
                  type="button"
                  className="next-button step1-btn"
                  onClick={nextStep}
                >
                  Next <BsArrowRight className="next-icon" />
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Superficial Details */}

          {currentStep == 1 && (
            <div className="step-container_">
              <BasicHostelInfo
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}

          {/* Step 2: Amenities */}
          {currentStep === 2 && (
            <div className="step-container">
              <Step2Intro />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}

          {/* Step 3: Amenities */}
          {currentStep === 3 && (
            <div className="step-container">
              <AmenitiesInfo
                hostelData={hostelData}
                handleChange={handleChange}
              />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}

          {/* Step 4: Images, Description, and Price */}
          {currentStep === 4 && (
            <div className="step-container">
              <Step3intro />
              <StepNavigation onBack={prevStep} onNext={nextStep} />
            </div>
          )}

          {/* Step 5: Images, Description, and Price */}
          {currentStep === 5 && (
            <div className="step-container">
              <FinalInfo
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
                  className="submit-button"
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
