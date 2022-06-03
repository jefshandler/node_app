
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const express = require("express");

const app = express();
app.use(express.json());
const contatos = ["Noah", "Helia", "Jeferson", "Julio"];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/*app.use((req, res, next) => {
    console.log("Acessou o Middlewares!");
    next();
})*/
//nosso middleware
function valContato(req, res, next) {
    if (!req.body.nome) {
        return res.status(400).json({
            error: "Necessário enviar o nome!"
        })
    }
    return next();
}
function valPosContato(req, res, next) {
  if (!contatos[req.params.id]) {
    return res.status(400).json({
      error: "Contato não encontado!",
    });
  }
  return next();
}

app.get("/", (req, res) => {
  return res.json(contatos);
});

app.get("/contato/:id", valPosContato, (req, res) => {
  const { id } = req.params;
  return res.json({
    nome: contatos[id],
  });
});
app.post("/contato", valContato, (req, res) => {
  const { nome } = req.body;

  contatos.push(nome);

  return res.json(contatos);
});
app.put("/contato/:id", valPosContato, valContato, (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  contatos[id] = nome;

  return res.json(contatos);
});

app.delete("/contato/:id", valPosContato, (req, res) => {
  const { id } = req.params;

  contatos.splice(id, 1);

  return res.json(contatos);
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
  console.log("Servidor iniciado :  http://localhost:5000/ ");
});
