import { createContext, useState } from "react";

export const ForecastContext = createContext(null);

export const ForecastProvider = ({ children }) => {
  const [selectedDay, setselectedDay] = useState(null);

  return (
    <ForecastContext.Provider value={{ setselectedDay, selectedDay }}>
      {children}
    </ForecastContext.Provider>
  );
};
