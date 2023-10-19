import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Páginas */
import HomePage from "./Pages/HomePage/HomePage";
import Civil from "./Pages/Civil/Registro/Civil";
import NovoCivil from "./Pages/Civil/Registro/NovoCivil";
import VeiculoCivil from "./Pages/Civil/Veiculo/VeiculoCivil";
import NovoVeiculoCivil from "./Pages/Civil/Veiculo/NovoVeiculoCivil";
import EditarRegistroCivil from "./Pages/Civil/Registro/EditarCivil";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={HomePage} />

        <Route exact path="/civis/civil" Component={Civil} />
        <Route exact path="/civis/civil/novoRegistro" Component={NovoCivil} />
        <Route exact path="/civis/civil/editarRegistro/:id" Component={EditarRegistroCivil} />
        
        <Route exact path="/civis/veiculoCivil" Component={VeiculoCivil} />
        <Route exact path="/civis/veiculoCivil/novoRegistro" Component={NovoVeiculoCivil} />
      </Routes>
    </BrowserRouter>
  );
}