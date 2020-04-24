var request = require("request");

const weather = (a, b, cb) => {
  const url =
    "https://api.darksky.net/forecast/1d6b0f8ab6df20d97b03a26217cbb061/" +
    a +
    "," +
    b +
    "?unit=si";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      cb("No netwrok connection");
    } else if (body.error) {
      cb(response.body.error);
    } else {
      const { temperature } = body.currently;
      const { precipProbability } = body.currently;
      cb(
        undefined,
        `It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. `
      );
    }
  });
};

module.exports = weather;
