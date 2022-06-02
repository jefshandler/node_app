
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const express = require("express");

const app = express();
app.use(express.json());
const contatos = ["Noah", "Helia", "Jeferson", "Julio"];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  return res.json(contatos);
});

app.get("/contato/:id", (req, res) => {
  const { id } = req.params;
  return res.json({
    nome: contatos[id],
  });
});
app.post("/contato/", (req, res) => {
  const {nome} = req.body;
  contatos.push(nome);
  return res.json(contatos);

})

app.get("/settings", (req, res) => {
  res.send("Configurações");
});

app.get("/terms", (req, res) => {
  return res.json({
    message: "Termos de serviços...",
  });
  
});


app.listen(5000, () => {
  console.log("Servidor iniciado ");
});
