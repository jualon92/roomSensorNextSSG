//@ts-nocheck
import dayjs from "dayjs";
import { Reading  } from "./Interfaces";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as duration from "dayjs/plugin/duration";
export const getCurrentHour = () => {
    // create Date object for current location
    var dateP = new Date();

    // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
    var utcTime = dateP.getTime() + dateP.getTimezoneOffset() * 60000;

    // time offset for New Zealand is +12
    var timeOffset = -3;

    // create new Date object for a different timezone using supplied its GMT offset.
    const dateA = new Date(utcTime + 3600000 * timeOffset);
    return dateA.getHours().toString();
  };

//@ts-ignore
export const getLastReadingHour = (readings:Reading[]) => parseInt(readings[0].timestamp.slice(0, 2));
//@ts-ignore
export const areReadingsOnTime = (readings:Reading[]) =>  getCurrentHour() == getLastReadingHour(readings).toString();



export const getHoursDifference = (readings:Reading[]) => {
    //@ts-ignore
    dayjs.extend(customParseFormat);
    //@ts-ignore
    dayjs.extend(duration);

    const initialDowntime = getDateOff(readings)?.timestamp;
    const initialReading = readings[0]?.timestamp;
    const downtimeDate = dayjs(initialDowntime, "hh:mm:ss - DD/MM/YY");
    const mostRecentReadingDate = dayjs(initialReading, "hh:mm:ss - DD/MM/YY");

    const difference = dayjs.duration(mostRecentReadingDate.diff(downtimeDate));

    return difference.format("HH:mm:ss");
  };

  
  const getDateOff = (readings:Reading[]) => {
    for (let index = 0; index < readings.length - 1; index++) {
      const initialReading = readings[index];
      const followUpReading = readings[index + 1];

      const initialHour = getReadingHour(initialReading);
      const initialMinutes = getReadingMinutes(initialReading);

      const followUpHour = getReadingHour(followUpReading);
      const followUpMinutes = getReadingMinutes(followUpReading);

      if (followUpMinutes >= 55) {
        if (getPreviousHour(initialHour) !== followUpHour) {
          return followUpReading;
        }
      } else {
        if (initialHour !== followUpHour) {
          return followUpReading;
        }
      }
    }

}

const getReadingHour = (reading: Reading) =>
parseInt(reading.timestamp.slice(0, 2));
const getReadingMinutes = (reading: Reading) =>
parseInt(reading.timestamp.substring(5, 3));
 
    
export const getPreviousHour = (hour: number) => {
      if (hour === 0) {
        return 23;
      }
      return hour - 1;
};
    