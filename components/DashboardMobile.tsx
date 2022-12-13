

import { Reading, ReadingProps } from "../utils/Interfaces";
import { wasThereAnySmokeToday, wasThereAnyToxicGasToday } from "../utils/readingsUtils";
import { areReadingsOnTime, getHoursDifference } from "../utils/timeUtils";
 
const DashboardMobile = ({ readings }: ReadingProps) => {


 
  const areReadingsUpdated = areReadingsOnTime(readings);
 
 

  return (
    <div className="Dashboard">
      {areReadingsUpdated ? (
        <div>Board Uptime {getHoursDifference(readings)}</div>
      ) : (
        <div> Sensors are not available&#10060; </div>
      )}
      <div>
        {" "}
        {wasThereAnySmokeToday(readings) ? (
          <span>Smoke detected today &#10060;</span>
        ) : (
          <span>No smoke detected today &#9989;</span>
        )}{" "}
      </div>
      <div>
        {" "}
        {wasThereAnyToxicGasToday(readings) ? (
          <span>Air pollutants were detected today &#10060;</span>
        ) : (
          <span>No Air Pollutants detected today &#9989;</span>
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

export default DashboardMobile;
