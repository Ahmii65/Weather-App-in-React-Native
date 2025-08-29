import { Image, StatusBar, TextInput, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("../assets/icons/bg.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
        blurRadius={100}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: widthPercentageToDP(1) }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 25,
              borderCurve: "continuous",
              padding: 11,
              backgroundColor: "rgba(255,255,255,0.4)",
              marginTop: hp(1),
              flexDirection: "row",
            }}
          >
            <TextInput
              placeholder="Search City"
              placeholderTextColor={"white"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
