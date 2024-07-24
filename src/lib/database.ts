import mongoose from "mongoose";

// mongoose.connect()
const connectionString : string = 
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
          console.log('Connected to Database');
     })
     .catch(err => console.error(err));