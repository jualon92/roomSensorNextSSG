import { fetcher } from "../utils/utils";

import useSWR, { SWRConfig, unstable_serialize } from "swr"
import  Dashboard  from "./Dashboard"
import ReadingsTable from "./ReadingsTable";
import { useMediaQuery } from 'react-responsive'
import DashboardMobile from "./DashboardMobile";
import { ReadingProps } from "../utils/Interfaces";

const DataDisplay = (readings:ReadingProps) => {
 

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1124px)' })


    return ( 
        <>  
        
        {isTabletOrMobile ? <DashboardMobile {...readings}/> :  <Dashboard {...readings}/>}
        <ReadingsTable  {...readings}/>
        </>
     );
}
 
export default DataDisplay;