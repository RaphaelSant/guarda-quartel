import React from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./homepage.css";
import { CardCivis, CardMilitares, CardOutrasOm, CardRelatorio } from "../../Components/Card/Card.jsx";

export default function HomePage() {
    return <>
        <Navbar />
        <div className="container mt-2">
            <h1 className="text-center">Registro de entrada e saida!</h1>
            <hr />
            <h3>Civis</h3>
            <div className="card-home mt-2">
                <CardCivis link="/civis/civil" titulo="Registro" />
                <CardCivis link="/civis/veiculoCivil" titulo="Veículo" />
            </div>
            <hr />
            <h3>Militares</h3>
            <div className="card-home mt-2">
                <CardMilitares link="/militares/duranteExpediente" titulo="Durante o expediente" />
                <CardMilitares link="/militares/foraExpediente" titulo="Fora de expediente" />
                <CardMilitares link="/militares/viaturasDoPelotao" titulo="Viatura do pelotão" />
            </div>
            <hr />
            <h3>Outras Organizações Militares</h3>
            <div className="card-home mt-2">
                <CardOutrasOm link="/militares/viaturasDeOutrasOms" titulo="Viatura" />
            </div>
            <hr />
            <h3>Relatório</h3>
            <div className="card-home mt-2">
                <CardRelatorio link="www.google.com" titulo="Escala de Ronda" />
                <CardRelatorio link="www.google.com" titulo="Roteiro da Guarda" />
                <CardRelatorio link="www.google.com" titulo="Armazenar Serviço" />
                <CardRelatorio link="www.google.com" titulo="Serviço Anterior" />
            </div>
        </div>
    </>
}