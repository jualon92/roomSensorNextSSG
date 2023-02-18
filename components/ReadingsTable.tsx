import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import React  from "react";
import { TableVirtuoso } from "react-virtuoso";  
import { Reading, ReadingProps } from "../utils/Interfaces"; 

 
const ReadingsTable = ({readings}:ReadingProps) => {
  
  const isItPair = (index:number) =>   index % 2 === 0

  return (
   
       
     <div className="MainTable"> 
    <TableVirtuoso
     
      style={{ height: 470 }}
      data={readings}
      components={{
        // eslint-disable-next-line react/display-name
        Scroller: React.forwardRef((props, ref) => (
          <TableContainer
            component={Paper}
            {...props}
            ref={ref}
            elevation={5}
          />
        )),

        Table: (props:any) => (
          <Table {...props} style={{ borderCollapse: "separate" }} />
        ),
        TableHead: TableHead,
        TableRow: TableRow,
        // eslint-disable-next-line react/display-name
        TableBody: React.forwardRef((props, ref) => (
          <TableBody {...props} ref={ref} />
        )),
      }}
      fixedHeaderContent={() => (
      
        <TableRow>
      
          <TableCell style={{ width: 170, background: "white", height:100  }}>
            Temperature (°C)
          </TableCell>
          <TableCell style={{ background: "white", width:170}}>Humidity +/-5%</TableCell>
          <TableCell style={{ background: "white" }}>
            Toxic Air Pollutants
          </TableCell>
          <TableCell style={{ background: "white" }}>Smoke</TableCell>
          
          <TableCell style={{ background: "white" }}>Sound Pollution</TableCell>

          <TableCell style={{ background: "white" }}>Timestamp</TableCell>
           
        </TableRow> 
        
      )}
      itemContent={(index:number, reading:Reading) => (
        <>
          <TableCell style={{ width: 150, background: isItPair(index) ? "#F5F6F7" : "white", }}>
            {reading.temperatura}
          </TableCell>
          <TableCell style={{ width: 150, background: isItPair(index) ? "#F5F6F7" : "white",  }}>
            {reading.humidity}
          </TableCell>
          <TableCell style={{ width: 240, background: isItPair(index) ? "#F5F6F7" : "white", }}>
            {!reading.isAirClean ? "Air Pollutants DETECTED" : "NOT DETECTED"}
          </TableCell>
          <TableCell style={{ background: isItPair(index) ? "#F5F6F7" : "white",  width: 200 }}>
            {!reading.isSmokeFree ? "SMOKE DETECTED" : "NO SMOKE"}
          </TableCell>
          <TableCell style={{ background: isItPair(index) ? "#F5F6F7" : "white",  width: 200 }}>
            {!reading.isSoundOk? "Harmful noise level detected " : "Safe db level"}
          </TableCell>
          <TableCell style={{  background: isItPair(index) ? "#F5F6F7" : "white",  width: 100 }}>
            {reading.timestamp}
          </TableCell>
        </>
      )}
    />
    </div>
  );
};

export default ReadingsTable;
 

