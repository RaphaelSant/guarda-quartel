import React, { useEffect, useState } from "react";
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
import ViaturasOutraOm from "./Pages/Militares/MilitaresOOM/ViaturasOutraOm";
import NovoViaturasOutraOm from "./Pages/Militares/MilitaresOOM/NovoViaturasOutraOm";
import EditarViaturasOutraOm from "./Pages/Militares/MilitaresOOM/EditarViaturasOutraOm";
import RoteiroDaGuarda from "./Pages/Relatorio/RoteiroDaGuarda";
import EscalaDeRonda from "./Pages/Relatorio/EscalaDeRonda";
import EditarEscalaRonda from "./Pages/Relatorio/EditarEscalaRonda";
import EditarRoteiroGuarda from "./Pages/Relatorio/EditarRoteiroDaGuarda";
import ParteSargentoPermanencia from "./Pages/Relatorio/ParteSgtPermanencia";
import EditarParteSgtPemanencia from "./Pages/Relatorio/EditarParteSgtPermanencia";
import ArmazenarServico from "./Pages/ArmazenarServico/ArmazenarServico";
import ServicoAnterior from "./Pages/ServicoAnterior/ServicoAnterior";
import BkCivilRegistro from "./Pages/ServicoAnterior/Pages/BkCivilRegistro";
import BkVeiculoCivil from "./Pages/ServicoAnterior/Pages/BkVeiculoCivil";
import BkDuranteExpediente from "./Pages/ServicoAnterior/Pages/BkDuranteExpediente";
import BkForaExpediente from "./Pages/ServicoAnterior/Pages/BkForaExpediente";
import BkViaturasPelotao from "./Pages/ServicoAnterior/Pages/BkViaturasPelotao";
import BkViaturasOutraOm from "./Pages/ServicoAnterior/Pages/BkViaturasOutraOm";
import BkRoteiroDaGuarda from "./Pages/ServicoAnterior/Pages/BkRoteiroDaGuarda";
import BkEscalaDeRonda from "./Pages/ServicoAnterior/Pages/BkEscalaDeRonda";
import BkParteSgtPermanencia from "./Pages/ServicoAnterior/Pages/BkParteSgtPermanencia";
import Login from "./Pages/Login/Login";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import iniciarFirestoreDb from "./Pages/FirestoreConfig/firestoreConfig.jsx";

export default function App() {

  useEffect(() => {
    const app = iniciarFirestoreDb(); // Inicie o Firestore
    const auth = getAuth(app); // Obtenha a instância de autenticação
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Define o usuário no estado conforme o estado de autenticação muda
    });
    
    return () => unsubscribe(); // Para de ouvir as mudanças no estado de autenticação quando o componente é desmontado
  }, []);
  
  const [user, setUser] = useState(true);

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Login} />

        {/* Exibir a página Home somente se o usuário estiver autenticado */}
        {user ? (
          <Route exact path="/homePage" Component={HomePage} />
        ) : (
          // Redirecionar para a página de Login se o usuário não estiver autenticado
          <Route path="/homePage" Component={Login} />
        )}

        

        {user && (
          <>
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

            {/* CAMPOS MILITARES DE OUTRAS OMs */}
            <Route exact path="/militares/viaturasDeOutrasOms" Component={ViaturasOutraOm} />
            <Route exact path="/militares/viaturasDeOutrasOms/novoRegistro" Component={NovoViaturasOutraOm} />
            <Route exact path="/militares/viaturasDeOutrasOms/editarRegistro/:id" Component={EditarViaturasOutraOm} />

            {/* CAMPOS DE RELATÓRIO DA OM */}
            <Route exact path="/relatorio/roteiroDaGuarda" Component={RoteiroDaGuarda} />
            <Route exact path="/relatorio/roteiroDaGuarda/editarRoteiroGuarda/:id" Component={EditarRoteiroGuarda} />
            <Route exact path="/relatorio/escalaDeRonda" Component={EscalaDeRonda} />
            <Route exact path="/relatorio/escalaDeRonda/editarEscalaRonda/:id" Component={EditarEscalaRonda} />
            <Route exact path="/relatorio/parteSargentoPermanencia" Component={ParteSargentoPermanencia} />
            <Route exact path="/relatorio/parteSargentoPermanencia/editarParte/:id" Component={EditarParteSgtPemanencia} />

            {/* CAMPO ARMAZENAGEM DE SERVIÇO */}
            <Route exact path="/relatorio/armazenarServico" Component={ArmazenarServico} />

            {/* CAMPO SERVIÇO ANTERIOR */}
            <Route exact path="/relatorio/servicoAnterior" Component={ServicoAnterior} />
            <Route exact path="/relatorio/servicoAnterior/civilRegistro" Component={BkCivilRegistro} />
            <Route exact path="/relatorio/servicoAnterior/veiculoCivil" Component={BkVeiculoCivil} />
            <Route exact path="/relatorio/servicoAnterior/militaresDuranteExpediente" Component={BkDuranteExpediente} />
            <Route exact path="/relatorio/servicoAnterior/militaresForaExpediente" Component={BkForaExpediente} />
            <Route exact path="/relatorio/servicoAnterior/viaturasDoPelotao" Component={BkViaturasPelotao} />
            <Route exact path="/relatorio/servicoAnterior/viaturasDeOutrasOms" Component={BkViaturasOutraOm} />
            <Route exact path="/relatorio/servicoAnterior/roteiroDaGuarda" Component={BkRoteiroDaGuarda} />
            <Route exact path="/relatorio/servicoAnterior/escalaDeRonda" Component={BkEscalaDeRonda} />
            <Route exact path="/relatorio/servicoAnterior/parteSargentoPermanencia" Component={BkParteSgtPermanencia} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}