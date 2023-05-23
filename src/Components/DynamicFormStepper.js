import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography,TextField } from '@mui/material';
import formStructure from '../formStructure.json';
// import { TextField } from '@material-ui/core';

const DynamicFormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  const steps = formStructure.steps;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFieldChange = (fieldId, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldId]: value,
    }));
  };

  const renderFormFields = () => {
    const currentFields = steps[activeStep].fields;

    return currentFields.map((field) => (
      <div key={field.id} style={{padding:"20px"}}>
        <label htmlFor={field.id}>{field.label} : </label> &nbsp; &nbsp;&nbsp;
        <input
          type={field.type}
          id={field.id}
          required={field.required}
          value={formValues[field.id] || ''}
          onChange={(e) => handleFieldChange(field.id, e.target.value)}
        />


{/* <TextField
           type={field.type}
          id={field.id}
          required={field.required}
          value={formValues[field.id] || ''}
          label={field.label}
          onChange={(e) => handleFieldChange(field.id, e.target.value)}
      
      /> */}
    
      </div>
    ));
  };

  const renderConfirmationPage = () => {
    return (
      <div style={{padding:"50px"}}>
        <Typography variant="h5">Confirmation</Typography>
        <br/> 
        <Typography>
          First Name: {formValues.firstName}
        </Typography>
        <br/> 
        <Typography>
          Last Name: {formValues.lastName}
        </Typography>
        <br/> 
        <Typography>
          Email: {formValues.email}
        </Typography>
        <br/> 
        <Typography>
          Phone: {formValues.phone || 'N/A'}
        </Typography>
        <br/> 
        <Typography>
          Address: {formValues.address}
        </Typography>
        <br/> 
        <Typography>
          Pin Code: {formValues.pincode}
        </Typography>
      </div>
    );
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        renderConfirmationPage()
      ) : (
        <div>
          {renderFormFields()}
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DynamicFormStepper;