import express from "express";

import nekretnineRouter from "./routes/nekretnine.js";
import ponudeRouter from "./routes/ponude.js";

const app = express();
let PORT = 3000;

app.use(express.json());

app.use("/nekretnine", nekretnineRouter);
app.use("/ponude", ponudeRouter);

app.get("/", (req, res) => {
  res.send("API agencije za nekretnine radi!");
});

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
