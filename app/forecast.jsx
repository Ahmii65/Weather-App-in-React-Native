import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUVLabel } from "../constants/index";

const forecast = () => {
  const {
    avgtemp_c,
    text,
    icon,
    maxtemp_c,
    mintemp_c,
    rainy,
    dayName,
    maxwind_kph,
    avghumidity,
    sunrise,
    sunset,
    uv,
    moonrise,
    hour,
  } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/Background.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
        blurRadius={100}
      />
      <SafeAreaView style={{ flex: 1, paddingHorizontal: wp(3) }}>
        <View style={{ alignItems: "center", paddingTop: hp(2) }}>
          <Text style={{ color: "white", fontSize: hp(5), fontWeight: "700" }}>
            {dayName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: hp(2),
            flexWrap: "wrap",
          }}
        >
          <Image
            source={{ uri: "https:" + icon }}
            style={{ width: 55, height: 55 }}
          />
          <Text
            style={{ color: "white", fontWeight: "500", fontSize: hp(3.5) }}
          >
            {avgtemp_c}
            {"\u00B0"}C
            <Text style={{ fontSize: hp(2.5), fontWeight: "300" }}>
              {"  "}
              {text}
            </Text>
          </Text>
        </View>
        <View style={styles.tempContainer}>
          <MaterialCommunityIcons
            name="thermometer-high"
            size={30}
            color="red"
          />
          <Text style={styles.textone}>
            {maxtemp_c}
            {"\u00B0"}C
            <Text style={styles.textsecond}>{"  "}Max Temprature</Text>
          </Text>
        </View>
        <View style={[styles.tempContainer, { paddingTop: hp(1.8) }]}>
          <MaterialCommunityIcons
            name="thermometer-low"
            size={30}
            color="lightyellow"
          />
          <Text style={styles.textone}>
            {mintemp_c}
            {"\u00B0"}C
            <Text style={styles.textsecond}>{"  "}Min Temprature</Text>
          </Text>
        </View>
        <View style={[styles.tempContainer, { paddingTop: hp(1.8) }]}>
          <Ionicons name="rainy" size={30} color="white" />
          <Text style={styles.textone}>
            {rainy}%<Text style={styles.textsecond}>{"  "}Chance of Rain</Text>
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
            <Text style={styles.uvViewText}>{maxwind_kph} Km</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/icons/drop.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.uvViewText}>{avghumidity}%</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/icons/sun.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.uvViewText}>{sunrise}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: hp(3),
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="weather-sunset"
              size={30}
              color="white"
            />
            <Text style={styles.uvViewText}>{sunset}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="weather-sunny-alert"
              size={30}
              color="white"
            />
            <Text style={styles.uvViewText}>
              {uv} {getUVLabel(uv)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="weather-sunny-alert"
              size={30}
              color="white"
            />
            <Text style={styles.uvViewText}>{moonrise}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default forecast;
const styles = StyleSheet.create({
  textone: {
    color: "white",
    fontWeight: "400",
    fontSize: hp(2.8),
  },
  tempContainer: {
    flexDirection: "row",
    gap: 6,
    paddingTop: hp(3.5),
    paddingHorizontal: wp(4),
    alignItems: "center",
  },
  textsecond: { fontSize: hp(2), fontWeight: "300" },
  uvViewText: {
    color: "white",
    paddingLeft: wp(1.5),
    fontSize: hp(2),
    fontWeight: "500",
  },
});
