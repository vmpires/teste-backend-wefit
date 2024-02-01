import express from "express";
import bodyParser from 'body-parser';
import registroRouter from './routes/registro';

const app = express();
const port = process.env.PORT || 4568;

app.use(bodyParser.json());

app.use(registroRouter);

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
