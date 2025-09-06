import { fetchLocation, fetchWeather } from "@/api";
import { weatherImages } from "@/constants";
import { ForecastContext } from "@/context/context";
import { getData, storeData } from "@/util/asyncStorage";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Pulse } from "react-native-animated-spinkit";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const [showSearch, setShowSearch] = useState(false);
  const [locatiion, setLocation] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setselectedDay } = useContext(ForecastContext);

  const route = useRouter();
  const handleText = (text) => {
    if (text.length > 2)
      fetchLocation({ cityName: text }).then((data) => {
        setLocation(data);
      });
  };

  const handleWeather = (loc) => {
    setLoading(true);
    setLocation([]);
    fetchWeather({ cityName: loc?.name }).then((data) => {
      setWeather(data);
      storeData("city", loc.name);
      setShowSearch(false);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchDefaultForecast();
  }, []);
  const fetchDefaultForecast = async () => {
    const myCity = await getData("city");
    let cityName = "islamabad";
    if (myCity) cityName = myCity;
    fetchWeather({ cityName }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };
  const handleNavigation = (item, dayName) => {
    route.push({ pathname: "forecast", params: { dayName } });
    setselectedDay(item);
  };

  const handleDebounce = useCallback(debounce(handleText, 500), []);
  const { location, current } = weather;
  return (
    <View
      style={{
        flex: 1,
        height: hp(100),
        width: wp(100),
      }}
    >
      <StatusBar style="light" animated="true" />
      <Image
        source={require("../assets/images/Background.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
        blurRadius={70}
      />
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Pulse size={70} color="#FFF" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: wp(3) }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 30,
                borderCurve: "continuous",
                backgroundColor: showSearch
                  ? "rgba(255,255,255,0.2)"
                  : undefined,
                marginTop: hp(2),
                flexDirection: "row",
                justifyContent: "flex-end",
                borderColor: "transparent",
                height: 58,
              }}
            >
              {showSearch ? (
                <TextInput
                  placeholder="Search City"
                  placeholderTextColor={"white"}
                  onChangeText={handleDebounce}
                  style={{
                    color: "white",
                    flex: 1,
                    padding: 15,
                    paddingLeft: 25,
                    borderColor: "red",
                  }}
                />
              ) : null}

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 30,
                  paddingHorizontal: wp(1.5),
                  margin: 1,
                }}
                onPress={() => setShowSearch(!showSearch)}
              >
                <Feather
                  name="search"
                  size={26}
                  color={"white"}
                  style={{ padding: 9 }}
                />
              </TouchableOpacity>
            </View>
            {locatiion.length > 0 && showSearch ? (
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: hp(10),
                  width: "100%",
                  alignSelf: "center",
                  zIndex: 9999,
                }}
              >
                {locatiion.map((loc, index) => {
                  return (
                    <TouchableOpacity
                      key={loc.id}
                      style={{
                        padding: hp(2),
                        borderBottomWidth:
                          index !== locatiion.length - 1 ? 1 : undefined,
                        paddingLeft: wp(7),
                        borderBottomColor: "lightgray",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => handleWeather(loc)}
                    >
                      <Ionicons name="location" color={"gray"} size={16} />
                      <Text
                        style={{
                          color: "black",
                          paddingLeft: 10,
                          fontSize: hp(2.3),
                        }}
                      >
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              marginTop: hp(2),
              marginBottom: hp(3),
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: hp(4),
                fontWeight: "500",
              }}
            >
              {location?.name},
              <Text style={{ fontSize: hp(2.6), color: "white" }}>
                {" " + location?.country}
              </Text>
            </Text>
            <View style={{ alignItems: "center", marginTop: hp(4), flex: 0.7 }}>
              <Image
                source={weatherImages[current?.condition?.text]}
                style={{
                  width: Platform.OS === "web" ? 120 : wp(44),
                  height: Platform.OS === "web" ? 120 : hp(20),
                  aspectRatio: 1,
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: hp(4.5) }}>
              <Text
                style={{
                  color: "white",
                  fontSize: hp(6.5),
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {current?.temp_c}
                {"\u00B0"}C
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: hp(3),
                  fontWeight: "300",
                  letterSpacing: 1,
                  paddingTop: hp(1),
                  alignItems: "center",
                }}
              >
                {current?.condition?.text}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: hp(5),
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icons/wind.png")}
                  style={{ width: 22, height: 22 }}
                />
                <Text
                  style={{
                    color: "white",
                    paddingLeft: wp(1.5),
                    fontSize: hp(2),
                    fontWeight: "500",
                  }}
                >
                  {current?.wind_kph} Km
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icons/drop.png")}
                  style={{ width: 22, height: 22 }}
                />
                <Text
                  style={{
                    color: "white",
                    paddingLeft: wp(1.5),
                    fontSize: hp(2),
                    fontWeight: "500",
                  }}
                >
                  {current?.humidity}%
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icons/sun.png")}
                  style={{ width: 22, height: 22 }}
                />
                <Text
                  style={{
                    color: "white",
                    paddingLeft: wp(1.5),
                    fontSize: hp(2),
                    fontWeight: "500",
                  }}
                >
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: wp(5),
                paddingTop: hp(4),
                flex: 1,
              }}
            >
              <View style={{ gap: 15, flexDirection: "row" }}>
                <CalendarDaysIcon color={"white"} />
                <Text
                  style={{
                    color: "white",
                    fontSize: hp(2),
                    fontWeight: "500",
                  }}
                >
                  Daily Forecast
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 5, gap: 10 }}
                >
                  {weather?.forecast?.forecastday.map((item, index) => {
                    const date = new Date(item?.date);
                    const options = { weekday: "long" };
                    const dayName = date.toLocaleDateString("en-US", options);
                    return (
                      <TouchableOpacity
                        style={styles.tempTouchable}
                        key={index}
                        onPress={() => handleNavigation(item, dayName)}
                      >
                        <Image
                          source={{
                            uri: "https:" + item?.day?.condition?.icon,
                          }}
                          style={styles.tempImage}
                        />
                        <Text style={styles.tempText}>{dayName}</Text>
                        <Text style={styles.tempText}>
                          {item?.day?.avgtemp_c}
                          {"\u00B0"}C
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  tempText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "500",
  },
  tempImage: { width: 55, height: 55 },
  tempTouchable: {
    marginTop: hp(2.5),
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    // padding: 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: 100,
  },
});
