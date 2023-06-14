import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import MenuPage from "./pages/MenuPage";
import SignInPage from "./pages/SignInPage";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="main-container">
      <div className="content-container">
        {!loggedIn && <SignInPage></SignInPage>}
        {loggedIn && <MenuPage></MenuPage>}
      </div>
    </div>
  );
}

export default App;
