import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true 
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb",extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// Import Routes
import authRoutes from './routes/Auth.route.js';   
import doctorRoutes from './routes/Doctor.route.js';
import patientRoutes from './routes/Patient.route.js'; 

// Define Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/patients', patientRoutes);

export {app};