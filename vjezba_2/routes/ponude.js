import express from "express";
import { nekretnine } from "./nekretnine.js";

const router = express.Router();

// Podaci o ponudama
let ponude = [];

// POST - slanje ponude za nekretninu
router.post("/", (req, res) => {
  let nova_ponuda = req.body;

  if (
    !nova_ponuda ||
    typeof nova_ponuda !== "object" ||
    Array.isArray(nova_ponuda) ||
    nova_ponuda.nekretninaId === undefined ||
    !nova_ponuda.ime ||
    !nova_ponuda.prezime ||
    nova_ponuda.ponudenaCijena === undefined ||
    !nova_ponuda.telefon
  ) {
    return res.status(400).json({
      message: "Sva polja su obavezna",
    });
  }

  // Provjera postoji li nekretnina
  let nekretnina_postoji = nekretnine.find(
    (nekretnina) => nekretnina.id === nova_ponuda.nekretninaId,
  );

  if (!nekretnina_postoji) {
    return res.status(400).json({
      message: "Nekretnina za koju šaljete ponudu ne postoji",
    });
  }

  // Provjera podataka korisnika
  if (
    typeof nova_ponuda.ime !== "string" ||
    typeof nova_ponuda.prezime !== "string" ||
    typeof nova_ponuda.telefon !== "string" ||
    !nova_ponuda.ime.trim() ||
    !nova_ponuda.prezime.trim()
  ) {
    return res.status(400).json({
      message: "Ime, prezime i telefon moraju biti ispravno uneseni",
    });
  }

  // Provjera ponuđene cijene
  if (
    typeof nova_ponuda.ponudenaCijena !== "number" ||
    !Number.isFinite(nova_ponuda.ponudenaCijena) ||
    nova_ponuda.ponudenaCijena <= 0
  ) {
    return res.status(400).json({
      message: "Ponuđena cijena mora biti broj veći od nule",
    });
  }

  // Provjera telefonskog broja
  if (!/^\+?[0-9\s-]{6,20}$/.test(nova_ponuda.telefon)) {
    return res.status(400).json({
      message: "Telefonski broj nije ispravan",
    });
  }

  let novi_id = 1;

  if (ponude.length > 0) {
    novi_id = ponude[ponude.length - 1].id + 1;
  }

  nova_ponuda.id = novi_id;

  ponude.push(nova_ponuda);

  return res.status(201).json({
    message: "Ponuda je uspješno dodana",
    ponuda: nova_ponuda,
  });
});

export default router;
