import { Reading } from "./Interfaces";



export const wasThereAnySmokeToday = (readings:any) => {
    return readings.some(
      (reading: Reading) =>
        !reading.isSmokeFree &&
        getDayOfReading(reading.timestamp) === getToday()
    );
  };

  export const wasThereAnyToxicGasToday = (readings:any) => {
    return readings.some(
      (reading: Reading) =>
        !reading.isAirClean && getDayOfReading(reading.timestamp) === getToday()
    );
  };


  export const getDayOfReading = (date: string) => {
    const dateString = date.slice(11, 13);
    const dateWithoutZero = parseInt(dateString);
    return dateWithoutZero.toString();
  };


  export const getToday = () => {
    const today = new Date().getDate().toString().slice(0, 2);

    return today;
  };