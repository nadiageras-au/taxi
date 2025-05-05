import express from "express";
import {setupApp} from "./setup-app";

export const app = express();
setupApp(app);
console.log("App setup complete");

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});