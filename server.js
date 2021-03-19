// dependencies
const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// session
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const tenMinutes = 600000;

const sess = {
    secret: process.env.SECRET,
    cookie: {
        expires: new Date(Date.now() + tenMinutes),
        maxAge: tenMinutes
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// handlebars engine
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers")
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});