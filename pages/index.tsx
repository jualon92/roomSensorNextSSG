import dayjs from "dayjs";
import Head from "next/head";
import dbConnect from "../lib/mongoose";
import Temperatura from "../models/Temperatura";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

import React from "react";
import Title from "../components/Title";
import useSWR, { SWRConfig } from "swr";
import DataDisplay from "../components/DataDisplay";

 
export default function Home({ fallback }:any) {
  
  return (
    <div>
      <Head>
        <title>Room Readings</title>
        <meta name="description" content="espduino32 room readings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title />
        
        {/*fallback wrapper */}
        <SWRConfig value={{ fallback }}>  
          <DataDisplay /> 
        </SWRConfig>
      </main>
    </div>
  );
}

export async function getStaticProps(context: any) {
  await dbConnect();
  const readingsMongo = await Temperatura.find().lean();

  //get readings from last two days, any more and json payload will be too big as initial load.(blocking operation)
  const readings = JSON.parse(JSON.stringify(readingsMongo))
    .reverse()
    .slice(0, 288);

  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

  const buildTimestamp = dayjs().format("HH:mm - DD/MM/YYYY");

  return {
    props: {
       
      fallback: {
        "/api/temperaturas": readings,
      },
    }, // will be passed to the page component as props
  };
}
