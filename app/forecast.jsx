import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatTime, getUVLabel } from "../constants/index";
import { ForecastContext } from "../context/context";

const forecast = () => {
  const { dayName } = useLocalSearchParams();
  const { selectedDay } = useContext(ForecastContext);
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/Background.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
        blurRadius={70}
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
            source={{ uri: "https:" + selectedDay?.day?.condition?.icon }}
            style={{ width: 55, height: 55 }}
          />
          <Text
            style={{ color: "white", fontWeight: "500", fontSize: hp(3.5) }}
          >
            {selectedDay?.day?.avgtemp_c}
            {"\u00B0"}C
            <Text style={{ fontSize: hp(2.5), fontWeight: "300" }}>
              {"  "}
              {selectedDay?.day?.condition?.text}
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
            {selectedDay?.day?.maxtemp_c}
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
            {selectedDay?.day?.mintemp_c}
            {"\u00B0"}C
            <Text style={styles.textsecond}>{"  "}Min Temprature</Text>
          </Text>
        </View>
        <View style={[styles.tempContainer, { paddingTop: hp(1.8) }]}>
          <Ionicons name="rainy" size={30} color="white" />
          <Text style={styles.textone}>
            {selectedDay?.day?.daily_chance_of_rain}%
            <Text style={styles.textsecond}>{"  "}Chance of Rain</Text>
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
            <Text style={styles.uvViewText}>
              {selectedDay?.day?.maxwind_kph} Km
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/icons/drop.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.uvViewText}>
              {selectedDay?.day?.avghumidity}%
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/icons/sun.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.uvViewText}>{selectedDay?.astro?.sunrise}</Text>
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
            <Text style={styles.uvViewText}>{selectedDay?.astro?.sunset}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="weather-sunny-alert"
              size={30}
              color="white"
            />
            <Text style={styles.uvViewText}>
              {selectedDay?.day?.uv} {getUVLabel(selectedDay?.day?.uv)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="brightness-2"
              size={30}
              color="white"
            />
            <Text style={styles.uvViewText}>
              {selectedDay?.astro?.moonrise}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: hp(3) }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 5, gap: 10 }}
          >
            {selectedDay?.hour.map((item, index) => {
              const dayTime = item?.time;
              const timeOnly = dayTime.split(" ")[1];
              return (
                <View style={styles.tempTouchable} key={index}>
                  <Image
                    source={{
                      uri: "https:" + item?.condition?.icon,
                    }}
                    style={styles.tempImage}
                  />
                  <Text style={styles.tempText}>{formatTime(timeOnly)}</Text>
                  <Text style={styles.tempText}>
                    {item?.temp_c}
                    {"\u00B0"}C
                  </Text>
                </View>
              );
            })}
          </ScrollView>
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
    height: hp(20),
  },
});
