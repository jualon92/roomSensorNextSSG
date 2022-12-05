import dayjs from "dayjs";
import Head from "next/head";
import dbConnect from "../lib/mongoose";
import Temperatura from "../models/Temperatura";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import { FixedSizeList as List } from "react-window";

import { TableVirtuoso } from "react-virtuoso";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Popover, Typography } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpIcon from '@mui/icons-material/Help';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import IconButton from '@mui/material/IconButton';
export default function Home({ temperaturas, buildTimestamp }: any) {
  const getCurrentHour = () => new Date().getHours().toLocaleString();
  const getLastReadingHour = () => temperaturas[0].timestamp.slice(0, 2);

  //if time registed on last reading does not correspond with the actual time, readings are outdated
  const areReadingsOnTime = () => getCurrentHour() === getLastReadingHour();

  const getAirQualityStatus = () => {
    if (temperaturas.airQuality < 33) {
      return "Excellent";
    }
    if (temperaturas.airQuality > 34 && temperaturas.airQuality < 66) {
      return "Very Good";
    }
    if (temperaturas.airQuality > 66 && temperaturas.airQuality < 100) {
      return "Fair";
    }
    if (temperaturas.airQuality > 100 && temperaturas.airQuality < 149) {
      return "Poor";
    }
  };

  const isInvalidAirQualityReading = (reading: number) => reading > 3000;


  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    //@ts-ignore
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
 


  return (
    <div>
      <Head>
        <title>Home Readings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>ESPDUINO32 Room Readings <IconButton    
         color="primary"  className={"BtnSpecs"}  aria-describedby={id}   onClick={handleClick}  >  <InfoSharpIcon fontSize="large" /> </IconButton>  </h1>

        <div>
      
      <Popover

        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2, maxWidth:"20rem"}}>
        <div> Board: ESPDUINO32 </div>
        <div> Temperature + Humidity:DHT11</div>
        <div> Air quality: MQ-135 </div> 
        <div> Timestamp: NTP  </div> 
        <div> Arduino Libraries: 

          Wifi.h, HTTPClient.h, ArduinoJson.h, NTPClient.h</div>
         </Typography>
      </Popover>
    </div>

        <div>
          {areReadingsOnTime() ? (
            <span> Readings are on schedule &#9989; </span>
          ) : (
            <span>
               Readings are not up to date &#10060;
              <div>
              Last reading was at {" "}
              {temperaturas[0].timestamp}  {" "}
              </div>
           
            </span>
          )}
        </div>
            
        <TableVirtuoso
          style={{ height: 400, maxWidth: 460 }}
          data={temperaturas}
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
              <TableCell style={{ background: "white" }}>
                Humidity +/-5%
              </TableCell>
              <TableCell style={{ background: "white" }}>
              Toxic Air Pollutants 
              </TableCell>
              <TableCell style={{ background: "white" }}>
              Smoke
              </TableCell>

              <TableCell style={{ background: "white" }}>Timestamp</TableCell>
            </TableRow>
          )}
          itemContent={(index, temp) => (
            <>
              <TableCell style={{ width: 150, background: "white" }}>
                {temp.temperatura}
              </TableCell>
              <TableCell style={{ width: 150, background: "white" }}>
                {temp.humidity}
              </TableCell>
              <TableCell style={{ width: 150, background: "white" }}>
                  {!temp.isAirClean ? "DETECTED" : "NOT DETECTED"}
              </TableCell>
              <TableCell style={{ background: "white", width: 100 }}>
                {!temp.isSmokeFree ? "NO SMOKE" : "SMOKE DETECTED"}
              </TableCell>
              <TableCell style={{ background: "white", width: 100 }}>
                {temp.timestamp}
              </TableCell>
             
            </>
          )}
        />
      </main>
    </div>
  );
}

export async function getStaticProps(context: any) {
  await dbConnect();
  const temperaturasMongo = await Temperatura.find().lean();
  // const temperatura  = temperaturasMongo.map( TempmongoDBEntry =>  TempmongoDBEntry.temperatura)
  const temperaturas = JSON.parse(JSON.stringify(temperaturasMongo)).reverse();

  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

  const buildTimestamp = dayjs().format("HH:mm - DD/MM/YYYY");

  return {
    props: { temperaturas, buildTimestamp }, // will be passed to the page component as props
  
  };
}
