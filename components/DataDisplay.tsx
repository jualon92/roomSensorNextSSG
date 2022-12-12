import { fetcher } from "../utils/utils";

import useSWR, { SWRConfig, unstable_serialize } from "swr"
import  Dashboard  from "./Dashboard"
import ReadingsTable from "./ReadingsTable";
import { useMediaQuery } from 'react-responsive'
import DashboardMobile from "./DashboardMobile";

const DataDisplay = () => {
    const {data, isLoading, error} = useSWR('/api/temperaturas', fetcher ) 
 

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1124px)' })


    return ( 
        <> 
        {isTabletOrMobile ? <DashboardMobile readings={data}/> :  <Dashboard readings={data}/>}
        <ReadingsTable  readings={data}/>
        </>
     );
}
 
export default DataDisplay;