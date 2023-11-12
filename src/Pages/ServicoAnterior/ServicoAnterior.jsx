import React from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { capturaAno, capturaDia, capturaMes } from "../Assets/capturaDate.jsx";
import { Link } from "react-router-dom";
import { PaginaInicial } from "../../Components/Button/Button.jsx";

export default function ServicoAnterior() {
    return <>
        <Navbar />
        <div className="container mt-2">
            <h1 className="text-center">Serviço Anterior</h1>
            <hr />
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Consultar serviço do dia: {`${capturaDia() - 1} de ${capturaMes()} de ${capturaAno()}`}</h5>
                    <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="true" data-bs-toggle="tab" href="#civis">Civis</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#militarOm">Militares da OM</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#outraOm">Outra OM</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#parteSgtPerm">Parte do sargento pemanência</a>
                        </li>
                    </ul>
                </div>
                <form className="card-body tab-content">
                    <div className="tab-pane active" id="civis">
                        <p className="card-text">Controle de entrada e saída de civis</p>
                        <Link to={"/relatorio/servicoAnterior/civilRegistro"} style={{ textDecoration: 'none' }}><button className="btn btn-danger d-block w-100 mb-2">Registro</button></Link>
                        <Link to={"/relatorio/servicoAnterior/veiculoCivil"} style={{ textDecoration: 'none' }}><button className="btn btn-danger d-block w-100 mb-2">Veículo</button></Link>
                    </div>
                    <div className="tab-pane" id="militarOm">
                        <p className="card-text">Controle de entrada e saída dos militares do pelotão</p>
                        <Link to={"/relatorio/servicoAnterior/militaresDuranteExpediente"} style={{ textDecoration: 'none' }}><button className="btn btn-primary d-block w-100 mb-2">Durante o expediente</button></Link>
                        <Link to={"/relatorio/servicoAnterior/militaresForaExpediente"} style={{ textDecoration: 'none' }}><button className="btn btn-primary d-block w-100 mb-2">Fora de expediente</button></Link>
                        <Link to={"/relatorio/servicoAnterior/viaturasDoPelotao"} style={{ textDecoration: 'none' }}><button className="btn btn-primary d-block w-100 mb-2">Viaturas do pelotão</button></Link>
                    </div>
                    <div className="tab-pane" id="outraOm">
                        <p className="card-text">Controle de entrada e saída de viatura de outras OM</p>
                        <Link to={"/relatorio/servicoAnterior/viaturasDeOutrasOms"} style={{ textDecoration: 'none' }}><button className="btn btn-success d-block w-100 mb-2">Viaturas</button></Link>
                    </div>
                    <div className="tab-pane" id="parteSgtPerm">
                        <p className="card-text">Controle do sargento permanência</p>
                        <Link to={"/relatorio/servicoAnterior/roteiroDaGuarda"} style={{ textDecoration: 'none' }}><button className="btn btn-warning d-block w-100 mb-2">Roteiro da Guarda</button></Link>
                        <Link to={"/relatorio/servicoAnterior/escalaDeRonda"} style={{ textDecoration: 'none' }}><button className="btn btn-warning d-block w-100 mb-2">Escala de Ronda</button></Link>
                        <Link to={"/relatorio/servicoAnterior/parteSargentoPermanencia"} style={{ textDecoration: 'none' }}><button className="btn btn-warning d-block w-100 mb-2">Parte do sargento permanência</button></Link>
                    </div>
                </form>
            </div>
            <PaginaInicial link="/" titulo="Página Inicial" estilo="mt-2 ms-2 d-block" />
        </div>
    </>
}