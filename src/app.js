const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const viewPaths = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");
var geocode = require("./utils/geocode.js");
var weather = require("./utils/forecast.js");

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.set("views", viewPaths);
hbs.registerPartials(partialPaths);
app.get("/", (req, res) => {
  res.render("index", { name: "Kunal", title: "Weather" });
});
app.get("/about", (req, res) => {
  res.render("about", { name: "Kunal", title: "About Me" });
});
app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "No location provided",
    });
  }

  geocode(req.query.location, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error: error });
    } else {
      weather(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error: error });
        } else {
          res.send({
            location: req.query.location,
            forecast: data,
          });
        }
      });
    }
  });
});
app.get("*", (req, res) => {
  res.render("notfound", { name: "Kunal", title: "About Me" });
});

app.listen(3000, () => {
  console.log("app is running");
});
