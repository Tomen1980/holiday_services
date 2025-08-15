import express from "express";
import holidayRoutes from "./routes/holiday/routes.js";
import { ApiResponse } from "./utils/api-response.js";


const app = express();
app.use(express.json());

app.use("/api/v1/holidays", holidayRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  return ApiResponse.error(res, err.message || "Internal Server Error", status, err.errors || null);
});

export default app;