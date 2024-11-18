import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import * as mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health ok" });
});

app.use("/api/my/user", myUserRoute);

// Start the server and store the instance in `server`
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown Handlers
const cleanup = async () => {
  console.log("Cleaning up resources...");
  await mongoose.connection.close(); // Close the DB connection
  server.close(() => {
    console.log("Server closed");
    process.exit(0); // Exit cleanly
  });
};

process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
