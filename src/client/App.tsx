// import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./pages/layoutMobile/Layout";
import { LoginPage } from "./pages/Login/Login";
import AuthLayout from "./pages/layoutMobile/AuthLayout";
import RequireAuth from "./pages/layoutMobile/RequireAuth";
import PlayGame from "./pages/PlayGame/PlayGame";
import CreateAccount from "./components/CreateAccout/CreateAccount";
import HomeMobile from "./pages/homeMobile/HomeMobile";
import Marketplace from "./pages/marketplace/Marketplace";
import Document from "./pages/document/Document";
import DailyTask from "./pages/DailyTask/DailyTask";
import GoogleCallbackPage from "./pages/GoogleCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/playGame" element={<PlayGame />} />
            <Route path="/task" element={<DailyTask />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/docs" element={<Document />} />
            <Route path="/" element={<HomeMobile />} />
          </Route>
        </Route>
        <Route path="/googlecallback" element={<GoogleCallbackPage/>}/>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
