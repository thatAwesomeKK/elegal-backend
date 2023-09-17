import app from "./src/app.js";
import { connectToMongo } from "./src/config/db.js";


const PORT = process.env.PORT || 5000;

//serves the application at the defined port if Connected to MongoDB
connectToMongo()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log("Connected to MongoDB");
        console.log(`Server is running on : http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot Connect to Server");
    }
  })
  .catch((e) => {
    console.log("Error In Connecting to Server!");
  });
