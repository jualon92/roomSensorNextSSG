export interface Reading {
    temperatura: string;
    timestamp: string;
    humidity: string;
    isAirClean: boolean;
    isSmokeFree: boolean;
    isSoundOk: boolean;
  }
  
export interface ReadingProps {
    readings: Reading[];
  }
  