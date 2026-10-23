// type = module
// const express = require("express");
import express from "express";
const app = express();

let PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server justo dela na ${PORT}`);
});
