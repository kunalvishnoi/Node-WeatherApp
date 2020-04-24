console.log("something console");

const myFunc = () => {
  const value = document.getElementById("value").value;
  fetch("/weather?location=" + value).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        document.getElementById("error").innerHTML = data.error;
      } else {
        document.getElementById("forecast").innerHTML =
          "Forecast: " + data.forecast;
        document.getElementById("location").innerHTML =
          "Location: " + data.location;
      }
    });
  });
};
