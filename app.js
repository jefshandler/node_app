const express = require("express");  

const app = express();

app.get("/", (req, res) => {
    res.send("Olá mundo");
});

app.get("/contato", (req, res) => {
  res.send("Lista de Contato");
});
app.get("/settings", (req, res) => {
  res.send("Configurações");
});

app.listen(5000, () => {
console.log("Servidor iniciado ")
});