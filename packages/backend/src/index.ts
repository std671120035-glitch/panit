import express from "express";
import authRoutes from "./routes/auth";
import apiRoutes from "./routes/api";
import taskRoutes from "./routes/task";
import { verifyToken, requireRole } from "./middleware/auth";
import { AuthRequest } from "./types/auth";
import { routeRegistry } from "./utils/routeRegistry";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Body parser middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Register routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
});
routeRegistry.register("GET", "/", "Health check endpoint");

// API documentation routes
app.use("/", apiRoutes);
routeRegistry.register("GET", "/apis", "List all available API endpoints");

app.use("/api", verifyToken, taskRoutes);
routeRegistry.register("GET", "/api/task", "Task endpoint");

// Auth routes (routes registered in auth.ts module)
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`API documentation available at http://localhost:${port}/apis`);
});
