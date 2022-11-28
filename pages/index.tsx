import dayjs from "dayjs";
import Head from "next/head";
import dbConnect from "../lib/mongoose";
import Temperatura from "../models/Temperatura"; 
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import { FixedSizeList as List } from "react-window"; 
 
import { TableVirtuoso } from 'react-virtuoso' 
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'




export default function Home({ temperatura, buildTimestamp }: any) {
  const tempFirst = temperatura.at(-1);
  const COLUMNS = 2;
  const ROWS = temperatura.length;


  return (
    <div >
      <Head>
        <title>Home Readings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main >
        <h1>ESP32 + DHT11 temperature readings</h1>
       {/*  <h2>Time since last build: {buildTimestamp}</h2>  */}
       {/*  
        <div className="TableWrapper"> 
        <List
          innerElementType="ul"
          itemCount={temperatura.length}
          itemSize={80}
          height={800}
          width={400} 
          className="TemperaturasListBox"
        >
          {({ index, style }) => {
            return (
              <div  className="TableItem" > 
                <li   style={style}  className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
                  <div > {temperatura[index].temperatura} C  </div> 
                  <div> {temperatura[index].timestamp}  </div> 
                
                </li>
                 
                </div>
             
            );
          }}
        </List>
        </div>*/}
      
      
    <TableVirtuoso
      style={{ height: 400, maxWidth:460 }}
      data={temperatura}
      components={{
    
        // eslint-disable-next-line react/display-name
        Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref}  elevation={5} />),
      
        Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
        TableHead: TableHead,
        TableRow: TableRow,
        // eslint-disable-next-line react/display-name
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
      }}
      fixedHeaderContent={() => (
        <TableRow>
          <TableCell style={{ width: 150, background: 'white' }}>
            Temperature
          </TableCell>
          <TableCell style={{ background: 'white' }}>
            Humidity +/-5%
          </TableCell>
          <TableCell style={{ background: 'white' }}>
            Timestamp
          </TableCell>
           
        </TableRow>
      )}
    
      itemContent={(index, temp) => (
        <>
          <TableCell style={{ width: 150, background: 'white' }}>
            {temp.temperatura} °C
          </TableCell>
          <TableCell style={{ width: 150, background: 'white' }}>
            {temp.humidity} 
          </TableCell>
          <TableCell style={{ background: 'white', width: 100,  }}>
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
  const temperatura = JSON.parse(JSON.stringify(temperaturasMongo)).reverse();

  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

  const buildTimestamp = dayjs().format("HH:mm - DD/MM/YYYY");

  return {
    props: { temperatura, buildTimestamp }, // will be passed to the page component as props
  };
}
