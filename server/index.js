require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");
const PORT = process.env.PORT || 6010;

app.use(cors({
  origin: [""],
  methods: ["POST", "GET"],
  credential: true
}));
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use("/files", express.static("./public/files"));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server start at port no ${PORT}`);
});
