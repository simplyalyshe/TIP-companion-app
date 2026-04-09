import React, { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [homeCampusKey, setHomeCampusKey] = useState("qc");
  const [activeCampusKey, setActiveCampusKey] = useState("qc");
  const [isCrossEnrollee, setIsCrossEnrollee] = useState(false);
  const [studentId, setStudentId] = useState("");

  const value = useMemo(
    () => ({
      homeCampusKey,
      setHomeCampusKey,
      activeCampusKey,
      setActiveCampusKey,
      isCrossEnrollee,
      setIsCrossEnrollee,
      studentId,
      setStudentId,
    }),
    [homeCampusKey, activeCampusKey, isCrossEnrollee, studentId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  return useContext(AppContext);
}
