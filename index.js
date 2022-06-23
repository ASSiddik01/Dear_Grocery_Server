const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Use Middleware
app.use(cors());
app.use(express.json());

// Connect DB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oxc89.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// API
async function run() {
  try {
    await client.connect();
    const productCollection = client.db("dearGrocery").collection("products");
    //   get all products
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Wellcome to Dear grocery server");
});

app.listen(port, () => {
  console.log(`Dear grocery on ${port} port`);
});
