const express = require("express");
const urlRoute = require("./routes/url");
const app = express();
const { redirectShortURL } = require("./controllers/url");
const connect = require("./connection");
const PORT = 3000;

connect('mongodb+srv://Chenthur:xLgZ5CavCUmEsYpb@cluster0.krcej5q.mongodb.net/shorturl').then(() => console.log("MongoDB connected"))
app.use(express.json());
app.use('/url', urlRoute);
app.get("/:shortId", redirectShortURL);

app.listen(PORT, () => console.log("Server started at PORT"+PORT))