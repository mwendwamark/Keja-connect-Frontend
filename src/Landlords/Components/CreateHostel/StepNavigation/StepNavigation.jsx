import React from "react";
import { BsArrowRight } from "react-icons/bs";
import "./StepNavigation.css";

const StepNavigation = ({ onBack, onNext, isLastStep, loading }) => {
  return (
    <div className="step-navigation-wrapper">
      <div className="step-navigation-container">
        {onBack && (
          <button type="button" className="step-back-button" onClick={onBack}>
            Back
          </button>
        )}
        {isLastStep ? (
          <button
            type="submit"
            className="step-submit-button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Hostel"}
          </button>
        ) : (
          <button type="button" className="step-next-button" onClick={onNext}>
            Next <BsArrowRight className="next-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
