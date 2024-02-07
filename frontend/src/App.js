import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Propos from "./reseau/page/Propos";
import Profil from "./reseau/page/Profil";

import Acc from "./reseau/page/Acc";
import Amis from "./reseau/page/amis";
import Notif from "./reseau/page/Notif";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reseau/page/Acc" element={<Acc />} />
          <Route path="/reseau/page/Propos" element={<Propos />} />
          <Route path="/reseau/page/Profil" element={<Profil />} />
          <Route path="/reseau/page/Amis" element={<Amis />} />
          <Route path="/reseau/page/Notif" element={<Notif />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
