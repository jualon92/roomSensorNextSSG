import { fetcher } from "../utils/utils";

import useSWR, { SWRConfig, unstable_serialize } from "swr"
import  Dashboard  from "./Dashboard"
import ReadingsTable from "./ReadingsTable";

const DataDisplay = () => {
    const {data, isLoading, error} = useSWR('/api/temperaturas', fetcher )

    return ( 
        <> 
        <Dashboard readings={data}/>
        <ReadingsTable  readings={data}/>
        </>
     );
}
 
export default DataDisplay;