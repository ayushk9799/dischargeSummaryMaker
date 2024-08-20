import React, { useState } from "react";
import "./App.css";
import DischargeSummaryPDF from "./PDF";
import {PDFViewer,PDFDownloadLink} from '@react-pdf/renderer'

function App() {
  const [patientInfo, setPatientInfo] = useState({
    registrationNo: "",
    name: "",
    age: "",
    gender: "",
    roomNo: "",
    admitDate: "",
    dischargeDate: "",
    address: "",
    clinicalSummary: "",
    diagnosis: "",
    diagnosisOther: "",
  });
  const [advice, setAdvice] = useState([
    { medicine: "", timesPerDay: "", numDoses: "", days: "" },
    { medicine: "", timesPerDay: "", numDoses: "", days: "" },
    { medicine: "", timesPerDay: "", numDoses: "", days: "" },
    { medicine: "", timesPerDay: "", numDoses: "", days: "" },
  ]);
  const [investigations, setInvestigations] = useState({
    ultrasonography: {
      date: "",
      report: "",
    },
    ivp: {
      date: "",
      report: "",
    },
    ctkub: {
      date: "",
      report: "",
    },
    bloodWork: {
      date: "",
     
      hemoglobin: { value: "", unit: "g/dL" },
      whiteBloodCell: { value: "", unit: "cells/µL" },
      wbcComponents: {
        neutrophil: { value: "", unit: "%" },
        eosinophil: { value: "", unit: "%" },
        lymphocyte: { value: "", unit: "%" },
        monocyte: { value: "", unit: "%" },
        basophil: { value: "", unit: "%" },
      },
      platelets:{value:"",unit:"cells/µL"},

      bloodGroup: { value: "", unit: "" },
      rhFactor: { value: "", unit: "" },
      elisaForHiv1And2: { value: "", unit: "" },
      elisaNonHcv: { value: "", unit: "" },
      australianAntigen: { value: "", unit: "" },
      bloodUrea: { value: "", unit: "mg/dL" },
      serumCreatinine: { value: "", unit: "mg/dL" },
      bloodSugar: { value: "", unit: "mg/dL" },
      srPsa:{value:"",unit:"ng/mL"}
    },
  });

  const [customBloodWork, setCustomBloodWork] = useState([]);
  const [dynamicInvestigations, setDynamicInvestigations] = useState([]);
  const [treatment, setTreatment] = useState({
    date: "",
    treatment: "",
  });
  const handleAdviceChange = (index, field, value) => {
    const newAdvice = [...advice];
    newAdvice[index][field] = value;
    setAdvice(newAdvice);
  };

  const addAdviceRow = () => {
    setAdvice([
      ...advice,
      { medicine: "", timesPerDay: "", numDoses: "", days: "" },
    ]);
  };
  const [showPdfViewer, setShowPdfViewer] = useState(false);


  const togglePdfViewer = () => {
    setShowPdfViewer(!showPdfViewer);
  };
  
  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setPatientInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
      // Reset diagnosisOther when diagnosis is changed to a non-"other" option
      ...(name === 'diagnosis' && value !== 'other' ? { diagnosisOther: "" } : {})
    }));
  };
  const addDynamicInvestigation = () => {
    setDynamicInvestigations([
      ...dynamicInvestigations,
      { name: "", date: "", report: "" },
    ]);
  };
  const handleInvestigationsChange = (
    investigation,
    field,
    value,
    subfield = null,
    type = null
  ) => {
    if (investigation === "bloodWork" && subfield) {
      setInvestigations((prev) => ({
        ...prev,
        bloodWork: {
          ...prev.bloodWork,
          [field]: {
            ...prev.bloodWork[field],
            [subfield]: {
              ...prev.bloodWork[field][subfield],
              [type]: value,
            },
          },
        },
      }));
    } else if (investigation === "bloodWork" && type) {
      setInvestigations((prev) => ({
        ...prev,
        bloodWork: {
          ...prev.bloodWork,
          [field]: {
            ...prev.bloodWork[field],
            [type]: value,
          },
        },
      }));
    } else {
      setInvestigations((prev) => ({
        ...prev,
        [investigation]: {
          ...prev[investigation],
          [field]: value,
        },
      }));
    }
  };
  const handleDynamicInvestigationChange = (index, field, value) => {
    const updatedDynamicInvestigations = [...dynamicInvestigations];
    updatedDynamicInvestigations[index] = {
      ...updatedDynamicInvestigations[index],
      [field]: value,
    };
    setDynamicInvestigations(updatedDynamicInvestigations);
  };
  console.log(dynamicInvestigations)
  const handleCustomBloodWorkChange = (index, field, value) => {
    const updatedCustomBloodWork = [...customBloodWork];
    updatedCustomBloodWork[index][field] = value;
    setCustomBloodWork(updatedCustomBloodWork);
  };

  const addCustomBloodWorkField = () => {
    setCustomBloodWork([
      ...customBloodWork,
      { parameter: "", value: "", unit: "" },
    ]);
  };

  const SelectWithOptions = ({ id, name, value, options, onChange }) => (
    <div className="input-group">
      <label htmlFor={id}>{name}:</label>
      <select
        id={id}
        value={value}
        onChange={(e) =>
          onChange("bloodWork", id, e.target.value, null, "value")
        }
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
 
  return (
    <div className="app-container">
      <div className="form-container">
      <div className="title-container">
          <h1>Discharge Summary Generator</h1>
          <button onClick={togglePdfViewer} className="add-investigation-btn">
            {showPdfViewer ? "Hide PDF" : "Show PDF"}
          </button>
        </div>
<div className="section patient-info">
  <h2>Patient Information</h2>
  <div className="patient-info-grid">
    <div className="input-group">
      <label htmlFor="patientId">Registration No:</label>
      <input
        id="patientId"
        name="registrationNo"
        type="text"
        value={patientInfo.registrationNo}
        onChange={handlePatientInfoChange}
      />
    </div>
    <div className="input-group">
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={patientInfo.name}
        onChange={handlePatientInfoChange}
      />
    </div>
    <div className="input-group">
      <label htmlFor="age">Age:</label>
      <input
        id="age"
        name="age"
        type="text"
        value={patientInfo.age}
        onChange={handlePatientInfoChange}
      />
    </div>
    <div className="input-group">
      <label htmlFor="gender">Gender:</label>
      <input
        id="gender"
        name="gender"
        type="text"
        value={patientInfo.gender}
        onChange={handlePatientInfoChange}
      />
    </div>
    <div className="input-group">
      <label htmlFor="roomNo">Room No:</label>
      <input
        id="roomNo"
        name="roomNo"
        type="text"
        value={patientInfo.roomNo}
        onChange={handlePatientInfoChange}
      />
    </div>
    <div className="input-group">
      <label htmlFor="admitDate">Admit Date:</label>
      <input
        id="admitDate"
        name="admitDate"
        type="date"
        value={patientInfo.admitDate}
        onChange={handlePatientInfoChange}
      />
    </div>
    <div className="input-group">
      <label htmlFor="dischargeDate">Discharge Date:</label>
      <input
        id="dischargeDate"
        name="dischargeDate"
        type="date"
        value={patientInfo.dischargeDate}
        onChange={handlePatientInfoChange}
      />
    </div>
  </div>
  <div className="input-group full-width">
    <label htmlFor="address">Address:</label>
    <textarea
      id="address"
      name="address"
      value={patientInfo.address}
      onChange={handlePatientInfoChange}
    />
  </div>
 
  <div className="input-group full-width">
    <label htmlFor="diagnosis">Diagnosis:</label>
    <select
      id="diagnosis"
      name="diagnosis"
      value={patientInfo.diagnosis}
      onChange={handlePatientInfoChange}
    >
      <option value="">Select diagnosis</option>
      <option value="Prostatomegaly">Prostatomegaly</option>
      <option value="Right Renal Stone">Right Renal Stone</option>
      <option value="Left Renal Stone">Left Renal Stone</option>
      <option value="Right Upper ureteric stone">Right Upper ureteric stone</option>
      <option value="Left Upper ureteric stone">Left Upper ureteric stone</option>
      <option value="Right lower ureteric stone">Right lower ureteric stone</option>
      <option value="Left lower ureteric stone">Left lower ureteric stone</option>
      <option value="Prostatomegaly + Bladder stone">Prostatomegaly + Bladder stone</option>
      <option value="Gall bladder stone">Gall bladder stone</option>
      <option value="Right inguinal hernia">Right inguinal hernia</option>
      <option value="Left inguinal hernia">Left inguinal hernia</option>
      <option value="Bladder stone">Bladder stone</option>
      <option value="Urethral stricture">Urethral stricture</option>
      <option value="Incisional hernia">Incisional hernia</option>
      <option value="Right Pyeloureteric Obstruction">Right Pyeloureteric Obstruction</option>
      <option value="Left Pyeloureteric obstruction">Left Pyeloureteric obstruction</option>
      <option value="Hypospadia">Hypospadia</option>
      <option value="other">Other</option>
    </select>
    {patientInfo.diagnosis === "other" && (
      <textarea
        id="diagnosisOther"
        name="diagnosisOther"
        value={patientInfo.diagnosisOther || ""}
        onChange={handlePatientInfoChange}
        placeholder="Enter custom diagnosis"
      />
    )}
  </div>
  <div className="input-group full-width">
    <label htmlFor="clinicalSummary">Clinical Summary:</label>
    <textarea
      id="clinicalSummary"
      name="clinicalSummary"
      value={patientInfo.clinicalSummary}
      onChange={handlePatientInfoChange}
    />
  </div>
</div>

<div className="section investigations">
  <h2>Investigations</h2>

  <div className="subsection ultrasonography">
    <h3>Ultrasonography Whole Abdomen</h3>
    <div className="input-group">
      <label htmlFor="ultrasonographyDate">Date:</label>
      <input
        id="ultrasonographyDate"
        type="date"
        value={investigations.ultrasonography.date}
        onChange={(e) =>
          handleInvestigationsChange(
            "ultrasonography",
            "date",
            e.target.value
          )
        }
      />
    </div>
    <div className="input-group full-width">
      <label htmlFor="ultrasonographyReport">Report:</label>
      <textarea
        id="ultrasonographyReport"
        value={investigations.ultrasonography.report}
        onChange={(e) =>
          handleInvestigationsChange(
            "ultrasonography",
            "report",
            e.target.value
          )
        }
      />
    </div>
  </div>

  <div className="subsection ivp">
    <h3>IVP</h3>
    <div className="input-group">
      <label htmlFor="ivpDate">Date:</label>
      <input
        id="ivpDate"
        type="date"
        value={investigations.ivp.date}
        onChange={(e) =>
          handleInvestigationsChange("ivp", "date", e.target.value)
        }
      />
    </div>
    <div className="input-group full-width">
      <label htmlFor="ivpReport">Report:</label>
      <textarea
        id="ivpReport"
        value={investigations.ivp.report}
        onChange={(e) =>
          handleInvestigationsChange("ivp", "report", e.target.value)
        }
      />
    </div>
  </div>
  <div className="subsection ctkub">
    <h3>CT KUB</h3>
    <div className="input-group">
      <label htmlFor="ctkubDate">Date:</label>
      <input
        id="ctkub"
        type="date"
        value={investigations.ctkub.date}
        onChange={(e) =>
          handleInvestigationsChange("ctkub", "date", e.target.value)
        }
      />
    </div>
    <div className="input-group full-width">
      <label htmlFor="ctkub">Report:</label>
      <textarea
        id="ctkubreport"
        value={investigations.ctkub.report}
        onChange={(e) =>
          handleInvestigationsChange("ctkub", "report", e.target.value)
        }
      />
    </div>
  </div>
  <div className="subsection blood-work">
    <h3>Blood Report</h3>
    <div className="input-group">
      <label htmlFor="bloodWorkDate">Date:</label>
      <input
        id="bloodWorkDate"
        type="date"
        value={investigations.bloodWork.date}
        onChange={(e) =>
          handleInvestigationsChange("bloodWork", "date", e.target.value)
        }
      />
    </div>
    <div className="input-group">
      <label htmlFor="whiteBloodCell">White Blood Cell Count:</label>
      <input
        id="whiteBloodCell-value"
        type="text"
        value={investigations.bloodWork.whiteBloodCell.value}
        onChange={(e) =>
          handleInvestigationsChange(
            "bloodWork",
            "whiteBloodCell",
            e.target.value,
            null,
            "value"
          )
        }
      />
      <input
        id="whiteBloodCell-unit"
        type="text"
        value={investigations.bloodWork.whiteBloodCell.unit}
        onChange={(e) =>
          handleInvestigationsChange(
            "bloodWork",
            "whiteBloodCell",
            e.target.value,
            null,
            "unit"
          )
        }
        className="unit-input"
      />
    </div>
    <div className="wbc-components">
      {Object.entries(investigations.bloodWork.wbcComponents).map(
        ([key, { value, unit }]) => (
          <div className="input-group" key={key}>
            <label htmlFor={key}>
              {key
                .replace(/([A-Z0-9])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            <input
              id={`${key}-value`}
              type="text"
              value={value}
              onChange={(e) =>
                handleInvestigationsChange(
                  "bloodWork",
                  "wbcComponents",
                  e.target.value,
                  key,
                  "value"
                )
              }
            />
            <input
              id={`${key}-unit`}
              type="text"
              value={unit}
              onChange={(e) =>
                handleInvestigationsChange(
                  "bloodWork",
                  "wbcComponents",
                  e.target.value,
                  key,
                  "unit"
                )
              }
              className="unit-input"
            />
          </div>
        )
      )}
    </div>
    {Object.entries(investigations.bloodWork)
      .filter(
        ([key]) =>
          key !== "wbcComponents" &&
          key !== "whiteBloodCell" &&
          key !== "date"
      )
      .map(([key, { value, unit }]) => {
        if (
          [
            "elisaForHiv1And2",
            "elisaNonHcv",
            "australianAntigen",
            "rhFactor",
            "bloodGroup",
          ].includes(key)
        ) {
          const options =
            key !== "rhFactor" && key !== "bloodGroup"
              ? ["Reactive", "Non-Reactive"]
              : key === "rhFactor"
              ? ["Positive", "Negative"]
              : ["A", "B", "AB", "O"];
          return (
            <SelectWithOptions
              key={key}
              id={key}
              name={key
                .replace(/([A-Z0-9])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              value={value}
              options={options}
              onChange={handleInvestigationsChange}
            />
          );
        } else {
          return (
            <div className="input-group" key={key}>
              <label htmlFor={key}>
                {key
                  .replace(/([A-Z0-9])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </label>
              <input
                id={`${key}-value`}
                type="text"
                value={value}
                onChange={(e) =>
                  handleInvestigationsChange(
                    "bloodWork",
                    key,
                    e.target.value,
                    null,
                    "value"
                  )
                }
              />
              <input
                id={`${key}-unit`}
                type="text"
                value={unit}
                onChange={(e) =>
                  handleInvestigationsChange(
                    "bloodWork",
                    key,
                    e.target.value,
                    null,
                    "unit"
                  )
                }
                className="unit-input"
              />
            </div>
          );
        }
      })}

    {customBloodWork.map((param, index) => (
      <div key={index} className="custom-blood-work-row">
        <input
          type="text"
          placeholder="Parameter"
          value={param.parameter}
          onChange={(e) =>
            handleCustomBloodWorkChange(
              index,
              "parameter",
              e.target.value
            )
          }
        />
        <input
          type="text"
          placeholder="Value"
          className="customValue"
          value={param.value}
          onChange={(e) =>
            handleCustomBloodWorkChange(index, "value", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Unit"
          className="customUnit"
          value={param.unit}
          onChange={(e) =>
            handleCustomBloodWorkChange(index, "unit", e.target.value)
          }
        />
      </div>
    ))}
    <button
      onClick={addCustomBloodWorkField}
      className="add-parameter-btn"
    >
      + Add Blood Parameter
    </button>

    <div className="subsection dynamic-investigations">
      <h3>Additional Investigations</h3>
      {dynamicInvestigations.map((investigation, index) => (
        <div key={index} className="dynamic-investigation">
          <div className="input-group">
            <label htmlFor={`investigation-name-${index}`}>
              Investigation Name:
            </label>
            <input
              id={`investigation-name-${index}`}
              type="text"
              value={investigation.name}
              onChange={(e) =>
                handleDynamicInvestigationChange(
                  index,
                  "name",
                  e.target.value
                )
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor={`investigation-date-${index}`}>Date:</label>
            <input
              id={`investigation-date-${index}`}
              type="date"
              value={investigation.date}
              onChange={(e) =>
                handleDynamicInvestigationChange(
                  index,
                  "date",
                  e.target.value
                )
              }
            />
          </div>
          <div className="input-group full-width">
            <label htmlFor={`investigation-report-${index}`}>
              Report:
            </label>
            <textarea
              id={`investigation-report-${index}`}
              value={investigation.report}
              onChange={(e) =>
                handleDynamicInvestigationChange(
                  index,
                  "report",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      ))}
      <button
        onClick={addDynamicInvestigation}
        className="add-investigation-btn"
      >
        + Add Investigation Parameter
      </button>
    </div>
  </div>
</div>

<div className="section">
  <h2>Treatment/Surgery</h2>
  <div className="input-group treatmentgroup">
    <label>Date:</label>
    <input
      id="treatmentDate"
      type="date"
      value={treatment.date}
      onChange={(e) =>
        setTreatment({ ...treatment, date: e.target.value })
      }
    />
  </div>
  <div className="input-group">
    <label>Report:</label>
    <textarea
      id="treatmentReport"
      type="text"
      value={treatment.treatment}
      onChange={(e) =>
        setTreatment({
          ...treatment,
           treatment: e.target.value,
        })
      }
    />
  </div>
</div>
<div className="section">
  <h2>Advice</h2>
  {advice.map((item, index) => (
    <div key={index} className="advice-row">
      <div className="input-group medicine">
        <input
          type="text"
          placeholder="Medicine/Advice"
          value={item.medicine}
          onChange={(e) =>
            handleAdviceChange(index, "medicine", e.target.value)
          }
        />
      </div>
      <div className="input-group dosage">
        <input
          type="number"
          
          value={item.timesPerDay}
          onChange={(e) =>
            handleAdviceChange(index, "timesPerDay", e.target.value)
          }
        />
        <span>x</span>
        <input
          type="number"
         
          value={item.numDoses}
          onChange={(e) =>
            handleAdviceChange(index, "numDoses", e.target.value)
          }
        />
        <span>-</span>
        <input
          type="number"
         
          value={item.days}
          onChange={(e) =>
            handleAdviceChange(index, "days", e.target.value)
          }
        />
        <span>days</span>
      </div>
      
    </div>
  ))}
  <button onClick={addAdviceRow} className="add-advice-btn">
    + Add Advice
  </button>
</div>
<div className="button-container">
          <PDFDownloadLink
            document={
              <DischargeSummaryPDF 
                patientInfo={patientInfo}
                investigations={investigations}
                treatment={treatment}
                advice={advice}
                dynamicInvestigations={dynamicInvestigations}
                customBloodWork={customBloodWork}
              />
            }
            fileName="discharge_summary.pdf"
          >
            {({ blob, url, loading, error }) => 
              loading ? 'Loading document...' : 'Generate PDF'
            }
          </PDFDownloadLink>
          <button onClick={togglePdfViewer}>Preview PDF</button>
        </div>
      </div>
      

      {showPdfViewer && (
        <div className="pdf-viewer-container">
          <PDFViewer width="100%" height="100%">
            <DischargeSummaryPDF 
              patientInfo={patientInfo}
              investigations={investigations}
              treatment={treatment}
              advice={advice}
              dynamicInvestigations={dynamicInvestigations}
              customBloodWork={customBloodWork}
            />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

export default App;
