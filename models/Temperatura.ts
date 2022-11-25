import mongoose from 'mongoose'; 
 
export interface ITemperatura extends mongoose.Document {
  temperatura: number;
}

const TemperaturaSchema = new mongoose.Schema({
    temperatura:Number
});



export default mongoose.models.Temperaturae || //create a new document
  mongoose.model<ITemperatura>('Temperaturae', TemperaturaSchema); //or use an already created document
