import mongoose from 'mongoose'; 
 
export interface ITemperatura extends mongoose.Document {
  temperatura: number;
  timestamp?: string;
  humidity: number;
  isAirClean: boolean;
  isSmokeFree: boolean;
  isSoundOk:boolean;
}

const TemperaturaSchema = new mongoose.Schema({
    temperatura:Number,
    timestamp:  String,
    humidity: Number,
    isAirClean: Boolean,
    isSmokeFree: Boolean,
    isSoundOk:Boolean,
});



export default mongoose.models.Temperaturae || //create a new document
  mongoose.model<ITemperatura>('Temperaturae', TemperaturaSchema); //or use an already created document
