 
#  Next.js static site

## What is this for?
Checking from any device the conditions at home when you are at work. 


## How is data loaded? 
At n minute intervals, arduino will check if a sensor has been triggered. 
If it did, it will push data to the db and send an api request to rebuild the site with the new data.


## How do sensors work?
They are tuned to my home conditions. A sound above the normal threshold will trigger the sensor s input.   



