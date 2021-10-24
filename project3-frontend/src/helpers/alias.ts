import { useEffect, useState } from "react";

export function useAlias() {
  const [alias, setAlias] = useState(localStorage.getItem("alias"));

  function updateAlias(newAlias: string) {
    localStorage.setItem("alias", newAlias);
    setAlias(newAlias);
  }
  function logout() {
    console.log("logout");
    updateAlias("");
  }

  return { alias: alias || "", setAlias: updateAlias, logout };
}
