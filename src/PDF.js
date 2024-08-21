import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import tinos from "./fonts/Tinos-Regular.ttf";
// Create styles
Font.register({
  family: "Tinos",
  src: tinos,
  fontWeight: "normal",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  header: {
    marginBottom: 2,
    borderBottom: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
  },
  clinicName: {
    fontSize: 26,
    fontWeight: "bolder",
    textAlign: "center",
    marginBottom: 5,

    color: "#1a5f7a",
  },
  clinicInfo: {
    fontSize: 10,
    textAlign: "center",

    color: "#333333",
  },
  doctorInfo: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    letterSpacing: 2,
    color: "#1a5f7a",
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    letterSpacing: 2,
    padding: 2,
  },
  section: {
    padding: 3,
    marginLeft: 10,
  },
  sectionContent: {
    marginLeft: 5, // Indent the content
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bolder",
  },
  text: {
    fontFamily: "Tinos",
    fontSize: 11,

    marginBottom: 3,
  },
  patientInfoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  patientInfoItem: {
    width: "33%",
    marginBottom: 5,
  },

  subsection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  summary: {
    display: "flex",
    flexDirection: "row",
    columnGap: 60,
  },
  reportText: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
  },
  investigationSubsection: {
    display: "flex",
    flexDirection: "row",
    columnGap: 65,
    marginBottom: 5,
    marginLeft: 10,
    borderBottom: "1 solid #cccccc",
  },
  bloodSection: {
    marginLeft: 10,
    borderBottom: "1 solid #cccccc",
    marginBottom: 10,
  },
  investigationTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textDecoration: "underline",
  },
  investigationItem: {
    display: "flex",
    flexDirection: "row",

    // justifyContent: "space-between",
    marginBottom: 2,
    marginLeft: 130,
    border: 1,
    borderColor: "black",
  },
  investigationLabel: {
    fontSize: 10,
    fontFamily: "Tinos",
    flex: 1,
  },
  investigationBelow: {
    marginBottom: 10,
  },
  investigationValue: {
    fontSize: 10,
    flex: 1,
    textAlign: "right",
  },
});

const renderBloodReport = (bloodWorkArray, customBloodWork) => {
  let one = [];
  let two = [];
  console.log(bloodWorkArray);
  bloodWorkArray.forEach(([key, value]) => {
    if (key === "wbcComponents") {
      Object.entries(value).forEach(([wbcComponents, wbcComponentsValue]) => {
        if (wbcComponentsValue.value !== "") {
          one.push([wbcComponents, wbcComponentsValue]);
        }
      });
    } else {
      if(value.value !== "") {
        if (one.length < 9) {
          one.push([key, value]);
        } else {
          two.push([key, value]);
        }
      }
    }
  });
  customBloodWork.forEach((customBloods) => {
    if(two.length !== 0) {
      two.push([customBloods.parameter, {value: customBloods.value, unit: customBloods.unit}]);
    } else {
      one.push([customBloods.parameter, {value: customBloods.value, unit: customBloods.unit}]);
    }
  });
  
  if (two.length !== 0) {
    return (
      <View style={{display:'flex',flexDirection:"row",columnGap:50,marginLeft:10}}>
      <View style={{width:'50%'}}>{one.map(([key, value]) => ( value.value!=="" &&
          <View key={key} style={{display:"flex",flexDirection:"row",justifyContent:"space-between",}}>
            <View style={{flex:1}}>
              <Text style={{fontSize:10,fontFamily:"Tinos"}}>{key==="srPsa"?"Sr PSA":key
                .replace(/([A-Z0-9])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}</Text>
            </View>
            
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{fontSize:10,fontFamily:"Tinos",textIndent:5}}>{value.value}</Text>
              <Text style={{fontSize:10,fontFamily:"Tinos",}}>
                 {value.unit}
              </Text>
            </View>
          </View>
        ))}</View> 
        <View style={{width:'50%'}}>
        {two.map(([key, value]) => ( value.value!=="" &&
           <View key={key} style={{display:"flex",flexDirection:"row",justifyContent:"space-between",}}>
           <View style={{flex:1}}>
             <Text style={{fontSize:10,fontFamily:"Tinos"}}>{ key==="srPsa"?"Sr PSA":key
               .replace(/([A-Z0-9])/g, " $1")
               .replace(/^./, (str) => str.toUpperCase())}</Text>
           </View>
           
           <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
             <Text style={{fontSize:10,fontFamily:"Tinos",textIndent:5}}>{value.value}</Text>
             <Text style={{fontSize:10,fontFamily:"Tinos",}}>
                {value.unit}
             </Text>
           </View>
         </View>
        ))}
        </View>
       
      </View>
    );
  } else {
    return (
      <View>
        {one.map(([key, value]) => (
         <View key={key} style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:130}}>
         <View style={{flex:1}}>
           <Text style={{fontSize:10,fontFamily:"Tinos"}}>{key==="srPsa"?"Sr PSA":key
             .replace(/([A-Z0-9])/g, " $1")
             .replace(/^./, (str) => str.toUpperCase())}</Text>
         </View>
         
         <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
           <Text style={{fontSize:10,fontFamily:"Tinos",textIndent:5}}>{value.value}</Text>
           <Text style={{fontSize:10,fontFamily:"Tinos",}}>
              {value.unit}
           </Text>
         </View>
       </View>
        ))}
       
      </View>
    );
  }
};
const renderInvestigationSection = (report, date, label) => {
  console.log(report);
  if (!report) return null;

  const formattedDate = date ? date.split("-").reverse().join("-") : null;
  const styleWithDate = {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
    marginLeft: 10,
    borderBottom: "1 solid #cccccc",
  };

  const styleWithoutDate = {
    display: "flex",
    flexDirection: "row",

    marginBottom: 5,
    marginLeft: 10,
    borderBottom: "1 solid #cccccc",
  };

  return (
    <View style={formattedDate ? styleWithDate : styleWithoutDate}>
      <View style={[styles.text, styles.boldText, { width: 130 }]}>
        <Text>
          {label} {formattedDate && `(${formattedDate})`}:
        </Text>
      </View>

      <View style={styles.reportText}>
        <Text style={styles.text}>{report}</Text>
      </View>
    </View>
  );
};
// Create Document Component
const DischargeSummaryPDF = ({
  patientInfo,
  investigations,
  treatment,
  advice,
  dynamicInvestigations,
  customBloodWork
}) => {
  console.log(patientInfo)
  console.log(advice)
  const formatDiagnosis = () => {
    const mainDiagnoses = patientInfo.diagnosis.filter(d => d !== 'other');
    const otherDiagnosis = patientInfo.diagnosisOther ? [patientInfo.diagnosisOther] : [];
    const allDiagnoses = [...mainDiagnoses, ...otherDiagnosis];
    
    if (allDiagnoses.length === 0) return '';
    if (allDiagnoses.length === 1) return allDiagnoses[0];
    if (allDiagnoses.length === 2) return allDiagnoses.join(' and ');
    return allDiagnoses.slice(0, -1).join(', ') + ', and ' + allDiagnoses.slice(-1);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.clinicName}>KIDNEY STONE & UROLOGY CLINIC</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ marginLeft: 50 }}>
              <Image
                src={require("./Capture2.png")}
                style={{ width: 70 }}
              ></Image>
            </View>
            <View style={{ position: "absolute", width: "100%" }}>
              {" "}
              <Text style={styles.clinicInfo}>
                Jail Road, Near Mahindra Showroom, Tilkamanjhi, Bhagalpur
              </Text>
              <Text style={styles.doctorInfo}>DR. RAJAN KUMAR SINHA</Text>
              <Text style={styles.clinicInfo}>
                M.B.B.S(Ranchi), MS(Gen.Surgery), MCh(Urology), Kolkata
              </Text>
              <Text style={styles.clinicInfo}>Consultant Urologist</Text>
              <Text style={styles.clinicInfo}>Mob : 9709993104</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>DISCHARGE SUMMARY</Text>

        <View style={{ marginLeft: 10, paddingLeft: 3 }}>
          <View style={styles.patientInfoGrid}>
            <View style={styles.patientInfoItem}>
              <Text style={styles.text}>Name: {patientInfo.name}</Text>
            </View>
            <View style={styles.patientInfoItem}>
              <Text style={styles.text}>
                Age/Sex: {patientInfo.age} yrs /{patientInfo.gender}
              </Text>
            </View>
            <View style={styles.patientInfoItem}>
              <Text style={styles.text}>
                DOA: {patientInfo.admitDate.split("-").reverse().join("-")}
              </Text>
            </View>
            <View style={styles.patientInfoItem}>
              <Text style={styles.text}>
                DOD: {patientInfo.dischargeDate.split("-").reverse().join("-")}
              </Text>
            </View>
            <View style={styles.patientInfoItem}>
              <Text style={styles.text}>
                Reg. No.: {patientInfo.registrationNo}
              </Text>
            </View>
            <View style={styles.patientInfoItem}>
              <Text style={styles.text}>Room No: {patientInfo.roomNo}</Text>
            </View>
            <View style={styles.patientInfoItem}>
              <Text style={styles.text}>Address: {patientInfo.address}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 10, paddingLeft: 3 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: 145 }}>
              <Text style={styles.sectionTitle}>DIAGNOSIS:</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {formatDiagnosis()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: 145 }}>
              {" "}
              <Text style={styles.sectionTitle}>CLINICAL SUMMARY:</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {patientInfo.clinicalSummary}
                {patientInfo.comorbidities.length > 0 && (
                  `, ${patientInfo.comorbidities.filter((value)=>value!=="Other").join(", ")}${
                    patientInfo.comorbidities.includes("Other") ? `, ${patientInfo.comorbidityOther}` : ""
                  }`
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
            INVESTIGATION:
          </Text>
          <View style={styles.sectionContent}>
            {renderInvestigationSection(
              investigations.ultrasonography.report,
              investigations.ultrasonography.date,
              "USG WA"
            )}
            {renderInvestigationSection(
              investigations.ivp.report,
              investigations.ivp.date,
              "IVP"
            )}
            {renderInvestigationSection(
              investigations.ctkub.report,
              investigations.ctkub.date,
              "CT KUB"
            )}

            <View style={styles.bloodSection}>
              <Text style={[styles.text, styles.boldText]}>
                BLOOD REPORT (
                {investigations.bloodWork.date.split("-").reverse().join("-")}):
              </Text>
              {renderBloodReport(
                Object.entries(investigations.bloodWork).filter(
                  ([key]) => key !== "date"
                ),customBloodWork
              )}
            </View>
            {dynamicInvestigations.map((dinvestigations) =>
              renderInvestigationSection(
                dinvestigations.report,
                dinvestigations.date,
                dinvestigations.name
              )
            )}
          </View>
        </View>

        <View style={[styles.section, { display: "flex", flexDirection: "row" }]}>
          <View style={{ width: 145 }}>
            <Text style={styles.sectionTitle}>TREATMENT:</Text>
            <Text style={styles.text}>
              ({treatment.date.split("-").reverse().join("-")})
            </Text>
          </View>

          <View style={styles.reportText}>
            <Text style={styles.text}>{treatment.treatment}</Text>
          </View>
        </View>

        <View style={[styles.section, { display: "flex", flexDirection: "row" }]}>
          <View style={{ width: 145 }}>
            <Text style={styles.sectionTitle}>ADVICE:</Text>
          </View>
          <View style={[styles.reportText]}>
            {advice.map(
              (item, index) =>
                item.medicine !== "" && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text key={index} style={styles.text}>
                        {index + 1}. {item.medicine} 
                      </Text>
                    
                    </View>
                    {(item.timesPerDay && item.numDoses && item.days)&& <View>
                        <Text style={styles.text}  key={index}>
                          {item.timesPerDay} x {item.numDoses}- {item.days} days
                        </Text>
                      </View>}
                      
                  </View>
                )
            )}
          </View>
        </View>
        <View style={{ width: "100%", textAlign: "right", marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "hairline" }}>
            Doctor's Signature
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DischargeSummaryPDF;
