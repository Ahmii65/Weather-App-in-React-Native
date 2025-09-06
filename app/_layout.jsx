import { ForecastProvider } from "@/context/context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ForecastProvider>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen
          name="forecast"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
      </Stack>
    </ForecastProvider>
  );
}
