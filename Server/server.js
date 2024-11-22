import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import env from "dotenv";

env.config();
const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());

const db=new pg.Client({
    user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.post("/details", async (req, res) => {
    try{  
        await db.query("INSERT INTO details (name,age,email,file) VALUES ($1,$2,$3,$4)",[req.body.text,req.body.number,req.body.email,req.body.file]);
        res.sendStatus(200);    
        }catch (err) {
          console.log(err);
        }
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});