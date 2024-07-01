import React, { useEffect } from "react";
import ReportAlert from "./ReportAlert";
import AppointmentAlert from "./AppointmentAlert";

function Alert({userState}) {
  console.log("alert");
  if (userState == "manager") {
    return (
      <>
        <ReportAlert />
        <AppointmentAlert />
      </>
    );
  }
  if (userState == "client") {
    return (<>       
     <AppointmentAlert />
    </>)
  }
}

export default Alert;
