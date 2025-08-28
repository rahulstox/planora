import React, { createContext, useContext, useState } from 'react';

const DashboardDataContext = createContext();

export const useDashboardData = () => useContext(DashboardDataContext);

export const DashboardDataProvider = ({ children }) => {
  const [tripCount, setTripCount] = useState(0);
  const [placeCount, setPlaceCount] = useState(0);
  const [countryCount, setCountryCount] = useState(0);

  return (
    <DashboardDataContext.Provider value={{
      tripCount,
      setTripCount,
      placeCount,
      setPlaceCount,
      countryCount,
      setCountryCount
    }}>
      {children}
    </DashboardDataContext.Provider>
  );
};
