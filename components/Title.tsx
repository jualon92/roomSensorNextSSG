import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { Popover, Typography } from "@mui/material";

const Title = () => {
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

  return (
    <>
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
            <div> Sound sensor:  KY-038 </div>
            <div> Timestamp: NTP </div>
            <div>
              {" "}
              Arduino Libraries: Wifi.h, HTTPClient.h, ArduinoJson.h,
              NTPClient.h
            </div>
          </Typography>
        </Popover>
      </div>
    </>
  );
};

export default Title;
