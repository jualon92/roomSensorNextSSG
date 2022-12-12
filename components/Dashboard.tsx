

import { Reading, ReadingProps } from "../utils/Interfaces";
import { areReadingsOnTime, getHoursDifference } from "../utils/timeUtils";

import { useMediaQuery } from 'react-responsive'
const Dashboard = ({ readings }: ReadingProps) => {




  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1124px)' })


  const areReadingsUpdated = areReadingsOnTime(readings);



  const smoke = {
    PCmessages:
    {
      affirmative: "Smoke has been detected at some point today",
      negative: "No smoke detected as of today"
    },
    mobileDetectedMessage: { affirmative: "Smoke detected today", negative: "No smoke detected today &#9989" },

  }

  const airPollutants = {
    PCmessages:
    {
      affirmative: "Air Pollutants have been detected at some point today",
      negative: "Air Pollutants have not been detected as of today"
    },
    mobileDetectedMessage: { affirmative: "Air pollutants were detected today", negative: "No Air Pollutants detected today"}

  }

  const getDisplayMessage = (obj: any) => {
    if (isTabletOrMobile) { //return answer depending on viewport 
      return obj.mobileMessages
    }
    return obj.PCmessages
  }

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
        <div> Sensors are not available at the moment &#10060; </div>
      )}
      <div>
        {" "}
        {wasThereAnySmokeToday() ? (
          <span> {getDisplayMessage(smoke).affirmative} &#10060;</span>
        ) : (
          <span>{getDisplayMessage(smoke).negative} &#9989;</span>
        )}{" "}
      </div>
      <div>
        {" "}
        {wasThereAnyToxicGasToday() ? (
          <span>{getDisplayMessage(airPollutants).affirmative} &#10060;</span>
        ) : (
          <span>{getDisplayMessage(airPollutants).negative} &#9989;</span>
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
