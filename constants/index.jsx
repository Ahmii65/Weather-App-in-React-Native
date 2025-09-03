export const weatherImages = {
  "Partly cloudy": require("../assets/icons/partlycloudy.png"),
  "Moderate rain": require("../assets/icons/moderaterain.png"),
  "Patchy rain possible": require("../assets/icons/moderaterain.png"),
  "Sunny": require("../assets/icons/sun.png"),
  "Clear": require("../assets/icons/sun.png"),
 "Overcast": require("../assets/icons/cloud.png"),
  "Cloudy": require("../assets/icons/cloud.png"),
  "Light rain": require("../assets/icons/moderaterain.png"),
  "Moderate rain at times": require("../assets/icons/moderaterain.png"),
  "Heavy rain": require("../assets/icons/heavyrain.png"),
  "Heavy rain at times": require("../assets/icons/heavyrain.png"),
  "Moderate or heavy freezing rain": require("../assets/icons/heavyrain.png"),
  "Moderate or heavy rain shower": require("../assets/icons/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/icons/heavyrain.png"),
  "Torrential rain shower": require("../assets/icons/heavyrain.png"),
  "Light sleet showers": require("../assets/icons/heavyrain.png"),
  "Patchy rain nearby": require("../assets/icons/heavyrain.png"),
  "Mist": require("../assets/icons/emptyStar.png"),
  "other": require("../assets/icons/moderaterain.png"),
};

export const getUVLabel = (uv) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
};
