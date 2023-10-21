import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Páginas */
import HomePage from "./Pages/HomePage/HomePage";
import Civil from "./Pages/Civil/Registro/Civil";
import NovoCivil from "./Pages/Civil/Registro/NovoCivil";
import VeiculoCivil from "./Pages/Civil/Veiculo/VeiculoCivil";
import NovoVeiculoCivil from "./Pages/Civil/Veiculo/NovoVeiculoCivil";
import EditarRegistroCivil from "./Pages/Civil/Registro/EditarCivil";
import EditarVeiculoCivil from "./Pages/Civil/Veiculo/EditarVeiculoCivil";
import DuranteExpediente from "./Pages/Militares/MilitaresOM/DuarenteExpediente/DuranteExpediente";
import NovoDuranteExpediente from "./Pages/Militares/MilitaresOM/DuarenteExpediente/NovoDuranteExpediente";
import EditarDuranteExpediente from "./Pages/Militares/MilitaresOM/DuarenteExpediente/EditarDuranteExpediente";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={HomePage} />

        {/* CAMPOS CIVIL */}
        <Route exact path="/civis/civil" Component={Civil} />
        <Route exact path="/civis/civil/novoRegistro" Component={NovoCivil} />
        <Route exact path="/civis/civil/editarRegistro/:id" Component={EditarRegistroCivil} />
        
        <Route exact path="/civis/veiculoCivil" Component={VeiculoCivil} />
        <Route exact path="/civis/veiculoCivil/novoRegistro" Component={NovoVeiculoCivil} />
        <Route exact path="/civis/veiculoCivil/editarRegistro/:id" Component={EditarVeiculoCivil} />

        {/* CAMPOS MILITARES DA OM */}
        <Route exact path="/militares/duranteExpediente" Component={DuranteExpediente} />
        <Route exact path="/militares/duranteExpediente/novoRegistro" Component={NovoDuranteExpediente} />
        <Route exact path="/militares/duranteExpediente/editarRegistro/:id" Component={EditarDuranteExpediente} />
      </Routes>
    </BrowserRouter>
  );
}