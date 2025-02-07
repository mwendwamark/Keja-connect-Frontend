import React from "react";
import { BsArrowRight } from "react-icons/bs";


const StepNavigation = ({ onBack, onNext, isLastStep, loading }) => {
  return (
    <div className="step-buttons-container container">
      <span className="back-link" onClick={onBack}>
        {onBack ? "Back" : ""}
      </span>
      {isLastStep ? (
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating..." : "Create Hostel"}
        </button>
      ) : (
        <button type="button" className="next-button" onClick={onNext}>
          Next <BsArrowRight className="next-icon" />
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
