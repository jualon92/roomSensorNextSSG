

import { Reading, ReadingProps } from "../utils/Interfaces";
import { wasThereAnySmokeToday, wasThereAnyToxicGasToday } from "../utils/readingsUtils";
import { areReadingsOnTime, getHoursDifference } from "../utils/timeUtils";

const Dashboard = ({ readings }: ReadingProps) => {


 
  const areReadingsUpdated = areReadingsOnTime(readings);


  
 

  return (
    <div className="Dashboard">
      {areReadingsUpdated ? (
        <div>Board Uptime {getHoursDifference(readings)}</div>
      ) : (
        <div> Sensors are not available at the moment &#10060; </div>
      )}
      <div>
        {" "}
        {wasThereAnySmokeToday(readings) ? (
          <span>Smoke has been detected at some point today &#10060;</span>
        ) : (
          <span>No smoke detected as of today &#9989;</span>
        )}{" "}
      </div>
      <div>
        {" "}
        {wasThereAnyToxicGasToday(readings) ? (
          <span>Air Pollutants have been detected at some point today &#10060;</span>
        ) : (
          <span>Air Pollutants have not been detected as of today &#9989;</span>
        )}{" "}
      </div>
      <div>
        {areReadingsUpdated ? (
          <span> Readings are on schedule &#9989; </span>
        ) : (
          <span>
            Readings are not up to date &#10060;
            <div>Last reading was at {readings[0].timestamp} </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
