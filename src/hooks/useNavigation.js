import { useState } from "react";

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const pages = {
    home: "Accueil",
    generate: "Générer",
    customize: "Personnaliser",
    history: "Historique",
  };

  return {
    currentPage,
    navigate,
    pages,
  };
};

export default useNavigation;
