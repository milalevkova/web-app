import express from "express";

const router = express.Router();

let nekretnine = [
  {
    id: 1,
    naziv: "Stan u Puli",
    opis: "Dvosobni stan blizu centra grada.",
    cijena: 150000,
    lokacija: "Pula",
    brojSoba: 2,
    povrsina: 65,
  },
  {
    id: 2,
    naziv: "Kuća u Poreču",
    opis: "Obiteljska kuća s vrtom.",
    cijena: 280000,
    lokacija: "Poreč",
    brojSoba: 4,
    povrsina: 140,
  },
  {
    id: 3,
    naziv: "Stan u Rovinju",
    opis: "Stan s pogledom na more.",
    cijena: 220000,
    lokacija: "Rovinj",
    brojSoba: 3,
    povrsina: 85,
  },
];

// GET - sve nekretnine
router.get("/", (req, res) => {
  if (nekretnine.length === 0) {
    return res.status(404).json({
      message: "Nema dostupnih nekretnina",
    });
  }

  res.status(200).json(nekretnine);
});

// GET - nekretnine id
router.get("/:id", (req, res) => {
  let id_param = Number(req.params.id);

  let nekretnina = nekretnine.find((nekretnina) => nekretnina.id === id_param);

  if (!Number.isInteger(id_param) || id_param <= 0 || !nekretnina) {
    return res.status(404).json({
      message: "Nekretnina s tim ID-em ne postoji",
    });
  }

  res.status(200).json(nekretnina);
});

// POST - nove nekretnine
router.post("/", (req, res) => {
  let nova_nekretnina = req.body;

  if (
    !nova_nekretnina ||
    typeof nova_nekretnina !== "object" ||
    Array.isArray(nova_nekretnina) ||
    !nova_nekretnina.naziv ||
    !nova_nekretnina.opis ||
    nova_nekretnina.cijena === undefined ||
    !nova_nekretnina.lokacija ||
    nova_nekretnina.brojSoba === undefined ||
    nova_nekretnina.povrsina === undefined
  ) {
    return res.status(400).json({
      message: "Sva polja su obavezna",
    });
  }

  if (
    typeof nova_nekretnina.naziv !== "string" ||
    typeof nova_nekretnina.opis !== "string" ||
    typeof nova_nekretnina.lokacija !== "string" ||
    !nova_nekretnina.naziv.trim() ||
    !nova_nekretnina.opis.trim() ||
    !nova_nekretnina.lokacija.trim() ||
    typeof nova_nekretnina.cijena !== "number" ||
    !Number.isFinite(nova_nekretnina.cijena) ||
    nova_nekretnina.cijena < 0 ||
    !Number.isInteger(nova_nekretnina.brojSoba) ||
    nova_nekretnina.brojSoba < 0 ||
    typeof nova_nekretnina.povrsina !== "number" ||
    !Number.isFinite(nova_nekretnina.povrsina) ||
    nova_nekretnina.povrsina <= 0
  ) {
    return res.status(400).json({
      message: "Poslani podaci nisu ispravni",
    });
  }

  let novi_id = 1;

  if (nekretnine.length > 0) {
    novi_id = Math.max(...nekretnine.map((n) => n.id)) + 1;
  }

  let nekretnina_za_dodati = {
    id: novi_id,
    naziv: nova_nekretnina.naziv,
    opis: nova_nekretnina.opis,
    cijena: nova_nekretnina.cijena,
    lokacija: nova_nekretnina.lokacija,
    brojSoba: nova_nekretnina.brojSoba,
    povrsina: nova_nekretnina.povrsina,
  };

  nekretnine.push(nekretnina_za_dodati);

  return res.status(201).json({
    message: "Nekretnina je uspješno dodana",
    nekretnina: nekretnina_za_dodati,
  });
});

// PUT - potpuna izmjena
router.put("/:id", (req, res) => {
  let id_param = Number(req.params.id);

  let indeks = nekretnine.findIndex((nekretnina) => nekretnina.id === id_param);

  if (!Number.isInteger(id_param) || id_param <= 0 || indeks === -1) {
    return res.status(404).json({
      message: "Nekretnina s tim ID-em ne postoji",
    });
  }

  let izmijenjena_nekretnina = req.body;

  if (
    !izmijenjena_nekretnina ||
    typeof izmijenjena_nekretnina !== "object" ||
    Array.isArray(izmijenjena_nekretnina) ||
    !izmijenjena_nekretnina.naziv ||
    !izmijenjena_nekretnina.opis ||
    izmijenjena_nekretnina.cijena === undefined ||
    !izmijenjena_nekretnina.lokacija ||
    izmijenjena_nekretnina.brojSoba === undefined ||
    izmijenjena_nekretnina.povrsina === undefined
  ) {
    return res.status(400).json({
      message: "Za potpunu izmjenu potrebna su sva polja",
    });
  }

  if (
    typeof izmijenjena_nekretnina.naziv !== "string" ||
    typeof izmijenjena_nekretnina.opis !== "string" ||
    typeof izmijenjena_nekretnina.lokacija !== "string" ||
    !izmijenjena_nekretnina.naziv.trim() ||
    !izmijenjena_nekretnina.opis.trim() ||
    !izmijenjena_nekretnina.lokacija.trim() ||
    typeof izmijenjena_nekretnina.cijena !== "number" ||
    !Number.isFinite(izmijenjena_nekretnina.cijena) ||
    izmijenjena_nekretnina.cijena < 0 ||
    !Number.isInteger(izmijenjena_nekretnina.brojSoba) ||
    izmijenjena_nekretnina.brojSoba < 0 ||
    typeof izmijenjena_nekretnina.povrsina !== "number" ||
    !Number.isFinite(izmijenjena_nekretnina.povrsina) ||
    izmijenjena_nekretnina.povrsina <= 0
  ) {
    return res.status(400).json({
      message: "Poslani podaci nisu ispravni",
    });
  }

  let nova_verzija = {
    id: id_param,
    naziv: izmijenjena_nekretnina.naziv,
    opis: izmijenjena_nekretnina.opis,
    cijena: izmijenjena_nekretnina.cijena,
    lokacija: izmijenjena_nekretnina.lokacija,
    brojSoba: izmijenjena_nekretnina.brojSoba,
    povrsina: izmijenjena_nekretnina.povrsina,
  };

  nekretnine[indeks] = nova_verzija;

  return res.status(200).json({
    message: "Nekretnina je uspješno izmijenjena",
    nekretnina: nekretnine[indeks],
  });
});

// PATCH - djelomična izmjena
router.patch("/:id", (req, res) => {
  let id_param = Number(req.params.id);

  let indeks = nekretnine.findIndex((nekretnina) => nekretnina.id === id_param);

  if (!Number.isInteger(id_param) || id_param <= 0 || indeks === -1) {
    return res.status(404).json({
      message: "Nekretnina s tim ID-em ne postoji",
    });
  }

  let izmjena = req.body;

  if (
    !izmjena ||
    typeof izmjena !== "object" ||
    Array.isArray(izmjena) ||
    Object.keys(izmjena).length === 0
  ) {
    return res.status(400).json({
      message: "Potrebno je poslati podatke za izmjenu",
    });
  }

  let dozvoljena_polja = [
    "naziv",
    "opis",
    "cijena",
    "lokacija",
    "brojSoba",
    "povrsina",
  ];

  let polja = Object.keys(izmjena);

  let nedozvoljeno_polje = polja.find(
    (polje) => !dozvoljena_polja.includes(polje),
  );

  if (nedozvoljeno_polje) {
    return res.status(400).json({
      message: "Poslano je nedozvoljeno polje",
    });
  }

  if (
    ("naziv" in izmjena &&
      (typeof izmjena.naziv !== "string" || !izmjena.naziv.trim())) ||
    ("opis" in izmjena &&
      (typeof izmjena.opis !== "string" || !izmjena.opis.trim())) ||
    ("lokacija" in izmjena &&
      (typeof izmjena.lokacija !== "string" || !izmjena.lokacija.trim()))
  ) {
    return res.status(400).json({
      message: "Tekstualna polja moraju biti ispravno popunjena",
    });
  }

  if (
    "cijena" in izmjena &&
    (typeof izmjena.cijena !== "number" ||
      !Number.isFinite(izmjena.cijena) ||
      izmjena.cijena < 0)
  ) {
    return res.status(400).json({
      message: "Cijena mora biti broj i ne smije biti negativna",
    });
  }

  if (
    "brojSoba" in izmjena &&
    (!Number.isInteger(izmjena.brojSoba) || izmjena.brojSoba < 0)
  ) {
    return res.status(400).json({
      message: "Broj soba mora biti cijeli broj i ne smije biti negativan",
    });
  }

  if (
    "povrsina" in izmjena &&
    (typeof izmjena.povrsina !== "number" ||
      !Number.isFinite(izmjena.povrsina) ||
      izmjena.povrsina <= 0)
  ) {
    return res.status(400).json({
      message: "Površina mora biti broj veći od nule",
    });
  }

  nekretnine[indeks] = {
    ...nekretnine[indeks],
    ...izmjena,
  };

  return res.status(200).json({
    message: "Nekretnina je uspješno djelomično izmijenjena",
    nekretnina: nekretnine[indeks],
  });
});

// DELETE - brisanje nekretnine
router.delete("/:id", (req, res) => {
  let id_param = Number(req.params.id);

  let indeks = nekretnine.findIndex((nekretnina) => nekretnina.id === id_param);

  if (!Number.isInteger(id_param) || id_param <= 0 || indeks === -1) {
    return res.status(404).json({
      message: "Nekretnina s tim ID-em ne postoji",
    });
  }

  let obrisana_nekretnina = nekretnine.splice(indeks, 1);

  return res.status(200).json({
    message: "Nekretnina je uspješno obrisana",
    nekretnina: obrisana_nekretnina[0],
  });
});

export { nekretnine };

export default router;
