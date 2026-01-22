"use client";
import { createContext, useContext, useState } from "react";
export const ReservationContext = createContext();
const intialState = {
  range: { from: null, to: null },
  numGuests: null,
  observations: "",
};
export function ReservationProvider({ children }) {
  const [range, setRange] = useState(intialState.range);
  // const [numGuests, setNumGuests] = useState(intialState.numGuests);
  // const [observations, setObservations] = useState(intialState.observations);
  function resetRange() {
    setRange({ from: null, to: null });
  }

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        // numGuests,
        // setNumGuests,
        // observations,
        // setObservations,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}
