import mongoose from 'mongoose';

let isConnected = false;

const DB = {
  connect(uri: string, name: string) {
    if (isConnected) return;

    mongoose.connect(uri, {
      dbName: name,
    })
      .then(() => {
        console.log("Connecting to the DB seccussfully", name);
        isConnected = true;
      })
      .catch(err => {
        console.log("Error while connecting to the db", err);
      });
  },
  disconnect() {
    mongoose.disconnect();
  }
};

export default DB;
