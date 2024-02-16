import app from "./app.js";
import { connectToMongo } from "./config/db.js";

const PORT = process.env.PORT || 5000;

//serves the application at the defined port if Connected to MongoDB
app.listen(PORT, () => {
  connectToMongo()
    .then(() => {
      try {
        console.log("Connected to MongoDB");
      } catch (error) {
        console.log("Cannot Connect to Server");
      }
    })
    .catch((e) => {
      console.log("Error In Connecting to Server!");
    });
  console.log(`Server is running on : http://localhost:${PORT}`);
});
