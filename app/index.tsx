import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
export default function Index() {
  const [Search, setSearch] = useState<boolean>(false);
  const [location, setLocation] = useState([1, 2, 3]);
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../assets/icons/bg.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
        blurRadius={70}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: wp(3) }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 30,
              borderCurve: "continuous",
              backgroundColor: Search ? "rgba(255,255,255,0.4)" : undefined,
              marginTop: hp(2),
              flexDirection: "row",
              justifyContent: "flex-end",
              borderColor: "transparent",
              height: 50,
            }}
          >
            {Search ? (
              <TextInput
                placeholder="Search City"
                placeholderTextColor={"lightgray"}
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
                backgroundColor: "rgba(255,255,255,0.4)",
                borderRadius: 30,
                paddingHorizontal: wp(1.5),
                margin: 1,
              }}
              onPress={() => setSearch(!Search)}
            >
              <Feather
                name="search"
                size={26}
                color={"white"}
                style={{ padding: 9 }}
              />
            </TouchableOpacity>
          </View>
          {location && Search ? (
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
              {location.map((loc, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      padding: hp(2),
                      borderBottomWidth:
                        index !== location.length - 1 ? 1 : undefined,
                      paddingLeft: wp(7),
                      borderBottomColor: "lightgray",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="location" color={"black"} size={16} />
                    <Text
                      style={{
                        color: "black",
                        paddingLeft: 10,
                        fontSize: hp(2.3),
                      }}
                    >
                      London, United Kingdom
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
            paddingBottom: bottom,
          }}
        >
          <Text
            style={{
              color: "lightgray",
              textAlign: "center",
              fontSize: hp(4),
              fontWeight: "500",
            }}
          >
            London,
            <Text style={{ fontSize: hp(2.6), color: "gray" }}>
              United Kingdom
            </Text>
          </Text>
          <View style={{ alignItems: "center", marginTop: hp(6) }}>
            <Image
              source={require("../assets/icons/partlycloudy.png")}
              style={{ width: 140, height: 140 }}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: hp(4) }}>
            <Text
              style={{
                color: "lightgray",
                fontSize: hp(6.5),
                fontWeight: "700",
              }}
            >
              23{"\u00B0"}C
            </Text>
            <Text
              style={{
                color: "lightgray",
                fontSize: hp(3),
                fontWeight: "300",
                letterSpacing: 1,
                paddingTop: hp(1),
              }}
            >
              Partly Cloudy
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
                  color: "lightgray",
                  paddingLeft: wp(1.5),
                  fontSize: hp(2),
                  fontWeight: "400",
                }}
              >
                22 Km
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/icons/drop.png")}
                style={{ width: 22, height: 22 }}
              />
              <Text
                style={{
                  color: "lightgray",
                  paddingLeft: wp(1.5),
                  fontSize: hp(2),
                  fontWeight: "400",
                }}
              >
                23%
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/icons/sun.png")}
                style={{ width: 22, height: 22 }}
              />
              <Text
                style={{
                  color: "lightgray",
                  paddingLeft: wp(1.5),
                  fontSize: hp(2),
                  fontWeight: "400",
                }}
              >
                6:05 AM
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
            <View style={{ flex: 1 }}>
              <View style={{ gap: 15, flexDirection: "row" }}>
                <CalendarDaysIcon color={"white"} />
                <Text style={{ color: "white", fontSize: hp(2) }}>
                  Daily Forecast
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5, gap: 10 }}
              >
                <View
                  style={{
                    marginTop: hp(2.5),
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 20,
                    padding: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <Image
                    source={require("../assets/icons/heavyrain.png")}
                    style={{ width: 55, height: 55 }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    Monday
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    13{"\u00B0"}C
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: hp(2.5),
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 20,
                    padding: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    paddingRight: 20,
                  }}
                >
                  <Image
                    source={require("../assets/icons/heavyrain.png")}
                    style={{ width: 55, height: 55 }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    Monday
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    13{"\u00B0"}C
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: hp(2.5),
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 20,
                    padding: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <Image
                    source={require("../assets/icons/heavyrain.png")}
                    style={{ width: 55, height: 55 }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    Monday
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    13{"\u00B0"}C
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: hp(2.5),
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 20,
                    padding: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    paddingRight: 20,
                  }}
                >
                  <Image
                    source={require("../assets/icons/heavyrain.png")}
                    style={{ width: 55, height: 55 }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    Monday
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "400",
                    }}
                  >
                    13{"\u00B0"}C
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
