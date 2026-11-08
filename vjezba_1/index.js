// type = module
// const express = require("express");
import express, { request, response } from "express";
const app = express();

//naglasavamo da ce server obradivat json logoku u zahtjevima koji dolaze
app.use(express.json());
let PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server justo dela na ${PORT}`);
});

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
// pizze mnozina ovaj endpoint uvijek vraca polje
app.get("/pizze", (req, res) => {
  console.log("Pozvana je GET metoda na /pizze endpointu");
  res.json(pizze);
});
// Klijent -> Server (GET)

app.get("/pizze/:naziv", (req, res) => {
  let naziv_param = req.params.naziv;

  //bad request (400): korisnik salje podatke u krivom formatu
  if (!isNaN(naziv_param)) {
    res.status(400).json({ message: "Naziv mora biti string" });
  }

  let pizza = pizze.find(
    (p) => p.naziv.toLowerCase() === naziv_param.toLowerCase(),
  );

  if (!pizza) {
    res.status(404).json({ message: "Trazena pizza ne postoji" });
  }
  res.status(200).json(pizza);
});

//REST API GUIDELINES/PRINCIPI
//NEMA GLAGOLA, nema znakova

// radnju naglasava HTTP metoda
// POST = izradi/dodaj

app.post("/pizze", (req, res) => {
  let nova_pizza = req.body;

  let pizza_postoji = pizze.find(
    (pizza) => pizza.naziv.toLowerCase() === nova_pizza.naziv.toLowerCase(),
  );

  if (pizza_postoji) {
    return res.status(409).json({
      message: "Pizza s tim nazivom vec postoji",
    });
  }

  let novi_id = pizze.at(-1).id + 1;
  nova_pizza.id = novi_id;

  pizze.push(nova_pizza);

  return res.status(201).json({
    message: "Pizza je dodana!",
    pizze: pizze,
  });
});

//Get narudzbe, ako je polje prazno vrati 404
//get narudzbe/:id, ako id ne postoji vrati 404
//post marudzbe, ako korisnik proba narucit pizzu koja ne postoji 400

// {
//   id:1
//   ime:radola
//   adresa:teslina 5
//   pizza objekt 5
// }

let narudzbe = [];

app.get("/narudzbe", (req, res) => {
  if (!narudzbe) {
    return res.status(404).json({ message: "Polje je prazno" });
  }
  res.json(narudzbe);
});

app.get("/narudzbe/:id", (req, res) => {
  let id_param = req.params.id;

  let narudzba = narudzbe.find((narudzba) => narudzba.id === id_param);

  if (!narudzba) {
    return res.status(404).json({
      message: "Narudzba s tim id ne postoji",
    });
  }

  res.status(200).json(narudzba);
});

app.post("/narudzbe", (req, res) => {
  let nova_narudzba = req.body;

  let pizza_postoji = pizze.find(
    (pizza) => pizza.id === nova_narudzba.pizza.id,
  );

  if (!pizza_postoji) {
    return res.status(400).json({
      message: "Pizza ne postoji",
    });
  }

  let novi_id = 1;

  if (narudzbe.length > 0) {
    novi_id = narudzbe[narudzbe.length - 1].id + 1;
  }

  nova_narudzba.id = novi_id;

  narudzbe.push(nova_narudzba);

  return res.status(201).json({
    message: "Narudzba je uspjesno dodana",
    narudzba: nova_narudzba,
  });
});

// #1 Zadatak !!!!!

// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// let korisnici = [
//   { id: 1, ime: "Mila", prezime: "Levkova" },
//   { id: 2, ime: "Rea", prezime: "Rage" },
//   { id: 3, ime: "Nikolinka", prezime: "Vlk" },
// ];

// // HOME
// app.get("/", (req, res) => {
//   console.log("Pozvana je GET metoda na defaultnom endpointu");
//   res.sendFile(__dirname + "/public/index.html");
// });

// // ABOUT
// app.get("/about", (req, res) => {
//   console.log("Pozvana je GET metoda na /about endpointu");
//   res.sendFile(__dirname + "/public/about.html");
// });

// // USERS
// app.get("/users", (req, res) => {
//   console.log("Pozvana je GET metoda na /users endpointu");
//   res.json(korisnici);
// });

// // app.get("/bezveze", req, res) => {
// //   res.sendFile(__dirname + "/bezveze")
// // }
