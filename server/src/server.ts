import { app } from "./app";
import { config } from "dotenv";
import { connectDB } from "./config/db";

// initializing env
config();

const PORT = process.env.PORT || 5000;

// create server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  connectDB();
});
