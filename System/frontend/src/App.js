import React from "react";

import Announcement from "@components/Announcement";
import Agreement from "@components/Agreement";
import Diary from "@components/Diary";
import Navbar from "@components/Navbar";
import "./styles/globals.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Agreement />
    </>
  );
};

export default App;
