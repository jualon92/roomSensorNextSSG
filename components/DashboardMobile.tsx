

import { Reading, ReadingProps } from "../utils/Interfaces";
import { areReadingsOnTime, getHoursDifference } from "../utils/timeUtils";
 
const DashboardMobile = ({ readings }: ReadingProps) => {


 
  const areReadingsUpdated = areReadingsOnTime(readings);
 

  const wasThereAnySmokeToday = () => {
    return readings.some(
      (reading: Reading) =>
        !reading.isSmokeFree &&
        getDayOfReading(reading.timestamp) === getToday()
    );
  };

  const wasThereAnyToxicGasToday = () => {
    return readings.some(
      (reading: Reading) =>
        !reading.isAirClean && getDayOfReading(reading.timestamp) === getToday()
    );
  };

  const getToday = () => {
    const today = new Date().getDate().toString().slice(0, 2);

    return today;
  };

  const getDayOfReading = (date: string) => {
    const dateString = date.slice(11, 13);
    const dateWithoutZero = parseInt(dateString);
    return dateWithoutZero.toString();
  };

  return (
    <div className="Dashboard">
      {areReadingsUpdated ? (
        <div>Board Uptime {getHoursDifference(readings)}</div>
      ) : (
        <div> Sensors are not available&#10060; </div>
      )}
      <div>
        {" "}
        {wasThereAnySmokeToday() ? (
          <span>Smoke detected today &#10060;</span>
        ) : (
          <span>No smoke detected today &#9989;</span>
        )}{" "}
      </div>
      <div>
        {" "}
        {wasThereAnyToxicGasToday() ? (
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
