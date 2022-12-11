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
import { ReadingProps } from "../utils/Interfaces"; 

 
const ReadingsTable = ({readings}:ReadingProps) => {
  
 

  return (
   
       
    
    <TableVirtuoso
      style={{ height: 400, maxWidth: 660 }}
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

        Table: (props) => (
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
          <TableCell style={{ width: 150, background: "white" }}>
            Temperature (°C)
          </TableCell>
          <TableCell style={{ background: "white" }}>Humidity +/-5%</TableCell>
          <TableCell style={{ background: "white" }}>
            Toxic Air Pollutants
          </TableCell>
          <TableCell style={{ background: "white" }}>Smoke</TableCell>

          <TableCell style={{ background: "white" }}>Timestamp</TableCell>
        </TableRow>
      )}
      itemContent={(index, reading) => (
        <>
          <TableCell style={{ width: 150, background: "white" }}>
            {reading.temperatura}
          </TableCell>
          <TableCell style={{ width: 150, background: "white" }}>
            {reading.humidity}
          </TableCell>
          <TableCell style={{ width: 150, background: "white" }}>
            {!reading.isAirClean ? "Air Pollutants DETECTED" : "NOT DETECTED"}
          </TableCell>
          <TableCell style={{ background: "white", width: 100 }}>
            {!reading.isSmokeFree ? "SMOKE DETECTED" : "NO SMOKE"}
          </TableCell>
          <TableCell style={{ background: "white", width: 100 }}>
            {reading.timestamp}
          </TableCell>
        </>
      )}
    />
   
  );
};

export default ReadingsTable;
 

