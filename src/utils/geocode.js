var request = require("request");

const geocode = (location, cb) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1Ijoia3VuYWx2aXNobm9pIiwiYSI6ImNrOGhtM3Z2NTAxc3YzZXBnZGE0dHQ3eXIifQ.R9CIaAO0Hyn0kTj4f6GbFg&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      cb("Poor connection");
    } else if (response.body.features.length === 0) {
      cb('"Location not found!!"');
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      const place = response.body.features[0].place_name;

      const data = {
        latitude,
        longitude,
        place,
      };
      cb(undefined, data);
    }
  });
};

module.exports = geocode;
