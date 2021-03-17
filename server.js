// dependencies
const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});