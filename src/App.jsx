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
import DuranteExpediente from "./Pages/Militares/MilitaresOM/DuranteExpediente/DuranteExpediente";
import NovoDuranteExpediente from "./Pages/Militares/MilitaresOM/DuranteExpediente/NovoDuranteExpediente";
import EditarDuranteExpediente from "./Pages/Militares/MilitaresOM/DuranteExpediente/EditarDuranteExpediente";
import ForaExpediente from "./Pages/Militares/MilitaresOM/ForaExpediente/ForaExpediente";
import NovoForaExpediente from "./Pages/Militares/MilitaresOM/ForaExpediente/NovoForaExpediente";
import EditarForaExpediente from "./Pages/Militares/MilitaresOM/ForaExpediente/EditarForaExpediente";
import ViaturasDoPelotao from "./Pages/Militares/MilitaresOM/ViaturasDoPelotao/ViaturasPelotao";
import NovoViaturasPelotao from "./Pages/Militares/MilitaresOM/ViaturasDoPelotao/NovoViaturasPelotao";
import EditarViaturasPelotao from "./Pages/Militares/MilitaresOM/ViaturasDoPelotao/EditarViaturasPelotao";


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

        <Route exact path="/militares/foraExpediente" Component={ForaExpediente} />
        <Route exact path="/militares/foraExpediente/novoRegistro" Component={NovoForaExpediente} />
        <Route exact path="/militares/foraExpediente/editarRegistro/:id" Component={EditarForaExpediente} />

        <Route exact path="/militares/viaturasDoPelotao" Component={ViaturasDoPelotao} />
        <Route exact path="/militares/viaturasDoPelotao/novoRegistro" Component={NovoViaturasPelotao} />
        <Route exact path="/militares/viaturasDoPelotao/editarRegistro/:id" Component={EditarViaturasPelotao} />
      </Routes>
    </BrowserRouter>
  );
}