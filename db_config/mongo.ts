import mongoose from 'mongoose';
import config from './index';

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`;

// // DB Connection function
// const connectDB = async (): Promise<void> => {
//     try {
//       await mongoose.connect(CONNECTION_URL);
//       console.log('MongoDB successfully connected');
//     } catch (err : any) {
//       console.error(err.message);
//       process.exit(1);
//     }
//   };
  
//   // Running connection
//   connectDB();

mongoose.connect(CONNECTION_URL);

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
});

mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
});

mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
});
