// type = module
// const express = require("express");
import express, { request, response } from "express";
const app = express();

let PORT = 8000;

//RUTA ="/" (root ruta, defaultni endpoint)
//prvi param = http request req (zahtjev)
//drugi param = http response res (odgovor)
app.get("/", (request, response) => {
  console.log("Pozvana je GET metoda na defaultnom endpointu");
  response.send("Pozdrav iz Express.js servera");
});

// ovo je u stvarnosti spremljamo u DB skoro nikad na serveru
// ovo je na memory data
let pizze = [
  { id: 1, naziv: "Margherita", cijena: 35 },
  { id: 2, naziv: "Capricciosa", cijena: 45 },
  { id: 3, naziv: "Quattro Formaggi", cijena: 50 },
];
// HTTP HTTP klijent (web preglednik)  salje na HTTP GET zahtjev na express.js posluzitelj GET /pizze
app.get("/pizze", (req, res) => {
  console.log("Pozvana je GET metoda na /pizze endpointu");
  res.json(pizze);
});

app.listen(PORT, () => {
  console.log(`Server justo dela na ${PORT}`);
});
