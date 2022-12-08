import dayjs from "dayjs";
import Head from "next/head";
import dbConnect from "../lib/mongoose";
import Temperatura from "../models/Temperatura";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

import { TableVirtuoso } from "react-virtuoso";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Popover, Typography } from "@mui/material"; 
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import IconButton from "@mui/material/IconButton"; 

interface Reading {
  temperatura: string;
  timestamp: string;
  humidity: string;
  isAirClean: boolean;
  isSmokeFree: boolean;
}

interface ReadingProps {
  readings: Reading[];
}
 
export default function Home({ readings }: ReadingProps) {
  
  
  const getCurrentHour = () => new Date().getHours().toLocaleString();
  const getLastReadingHour = () =>  parseInt(readings[0].timestamp.slice(0, 2))


  //if time registed on last reading does not correspond with the actual time, readings are outdated
  const areReadingsOnTime = () => getCurrentHour() === getLastReadingHour().toString()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    //@ts-ignore
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getTodayReading = () => {
    //get all readings starting at 00:00
    //get all temperatures with 00 hours.
    const getFirstTemperatures = readings.find(
      (temp: Reading) => temp.timestamp.slice(0, 2) === "24"
    );
  };

  const getDayOfReading = (date: string) => {
    const dateString = date.slice(11, 13);
    const dateWithoutZero = parseInt(dateString);
    return dateWithoutZero.toString();
  };
  const wasThereAnySmokeToday = () => {
    return readings.some(
      (reading) =>
        !reading.isSmokeFree &&
        getDayOfReading(reading.timestamp) === getToday()
    );
  };

  const wasThereAnyToxicGasToday = () => {
    return readings.some(
      (reading) =>
        !reading.isAirClean && getDayOfReading(reading.timestamp) === getToday()
    );
  };

  const getToday = () => {
    const today = new Date().getDate().toString().slice(0, 2);

    return today;
  };
  return (
    <div>
      <Head>
        <title>Home Readings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          ESPDUINO32 Room Readings{" "}
          <IconButton
            color="primary"
            className={"BtnSpecs"}
            aria-describedby={id}
            onClick={handleClick}
          >
            {" "}
            <InfoSharpIcon fontSize="large" />{" "}
          </IconButton>{" "}
        </h1>

        <div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2, maxWidth: "30rem" }}>
              <div> Board: ESPDUINO32 </div>
              <div> Temperature + Humidity:DHT11</div>
              <div> Toxic Air Pollutants: MQ-135 </div>
              <div> Smoke detection: MQ-2 </div>
              <div> Timestamp: NTP </div>
              <div>
                {" "}
                Arduino Libraries: Wifi.h, HTTPClient.h, ArduinoJson.h,
                NTPClient.h
              </div>
            </Typography>
          </Popover>
        </div>
        <div>
          <div>
            {" "}
            {wasThereAnySmokeToday() ? (
              <span>Smoke has been detected at some point &#10060;</span>
            ) : (
              <span>No smoke detected as of today &#9989;</span>
            )}{" "}
          </div>
          <div>
            {" "}
            {wasThereAnyToxicGasToday() ? (
              <span>
                Air Pollutants have been detected at some point &#10060;
              </span>
            ) : (
              <span>
                No Air Pollutant has been detected as of today &#9989;
              </span>
            )}{" "}
          </div>
          <div>
            {!areReadingsOnTime()  ? (
                <span>
                Readings are not up to date &#10060;
                 <div>
                  {getLastReadingHour()}
                  Last reading was at {readings[0].timestamp}
                  {" "}
                </div>
              </span>
            ) : (
            
              <span> Readings are on schedule &#9989; </span>
            )}
          </div>
        </div>

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
              <TableCell style={{ background: "white" }}>
                Humidity +/-5%
              </TableCell>
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
                {!reading.isAirClean
                  ? "Air Pollutants DETECTED"
                  : "NOT DETECTED"}
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
      </main>
    </div>
  );
}

export async function getStaticProps(context: any) {
  await dbConnect();
  const readingsMongo = await Temperatura.find().lean();
  // const temperatura  = temperaturasMongo.map( TempmongoDBEntry =>  TempmongoDBEntry.temperatura)
  const readings = JSON.parse(JSON.stringify(readingsMongo)).reverse();

  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

  const buildTimestamp = dayjs().format("HH:mm - DD/MM/YYYY");

  return {
    props: { readings, buildTimestamp }, // will be passed to the page component as props
  };
}
