import mongoose from 'mongoose'; 
 
export interface ITemperatura extends mongoose.Document {
  temperatura: number;
  timestamp?: String;
  humidity: number;
  isAirClean: Boolean;
}

const TemperaturaSchema = new mongoose.Schema({
    temperatura:Number,
    timestamp:  String,
    humidity: Number,
    isAirClean: Boolean,
});



export default mongoose.models.Temperaturae || //create a new document
  mongoose.model<ITemperatura>('Temperaturae', TemperaturaSchema); //or use an already created document
