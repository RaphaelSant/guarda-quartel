import React from "react";
import { NovoRegistro, PaginaInicial } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";


export default function VeiculoCivil() {
    return <>
        <Navbar />
        <h5 className="mt-4 mb-4 text-center">Civil &gt; <strong style={{ color: '#008BD2' }}>Veículo</strong></h5>
        <div className="text-center mb-4">
            <NovoRegistro link="/civis/veiculoCivil/novoRegistro" titulo="Novo Registro" />
            <PaginaInicial link="/" titulo="Página Inicial" />
        </div>
        <div className="container">
            <table class="table text-center table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CNH</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Saida</th>
                        <th scope="col">Destino</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>João Maria</td>
                        <td>999.999.999-00</td>
                        <td>NKV 8888</td>
                        <td>08:30</td>
                        <td>09:20</td>
                        <td>PRM</td>
                        <td>
                            <a href="www.google.com"><i class="fa-solid fa-pen-to-square fa-lg text-warning me-4"></i></a>
                            <a href="www.google.com"><i class="fa-solid fa-trash fa-lg text-danger"></i></a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div >
    </>
}