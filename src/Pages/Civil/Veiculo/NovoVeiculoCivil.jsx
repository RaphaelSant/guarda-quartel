import React from "react";
import { PaginaInicial, Salvar } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";


export default function NovoVeiculoCivil() {
    return <>
        <Navbar />
        <h5 className="mt-4 mb-4 text-center">Civil &gt; Veículo &gt; <strong style={{ color: '#008BD2' }}>Novo Registro</strong></h5>

        <div className="container">
            <div className="row">
                <div class="mb-3 col-12">
                    <label for="nome-completo" class="form-label">Nome Completo</label>
                    <input type="text" placeholder="Nome Completo" class="form-control" id="nome-completo" />
                </div>
                <div class="mb-3 col-6">
                    <label for="cnh" class="form-label">CNH</label>
                    <input type="text" placeholder="CNH" class="form-control" id="cnh" />
                </div>
                <div class="mb-3 col-6">
                    <label for="placa" class="form-label">Placa</label>
                    <input type="text" placeholder="Placa" class="form-control" id="placa" />
                </div>
                <div class="mb-3 col-6">
                    <label for="hora-entrada" class="form-label">Horário de Entrada</label>
                    <input type="text" placeholder="Horário de Entrada" class="form-control" id="hora-entrada" />
                </div>
                <div class="mb-3 col-6">
                    <label for="hora-saida" class="form-label">Horário de Saída</label>
                    <input type="text" placeholder="Horário de Saída" class="form-control" id="hora-saida" />
                </div>
                <div class="mb-3 col-12">
                    <label for="hora-saida" class="form-label">Destino</label>
                    <input type="text" placeholder="Destino" class="form-control" id="hora-saida" />
                </div>
            </div>
        </div>

        <div className="d-flex justify-content-center gap-4 text-center mb-4">
            <div>
                <PaginaInicial link="/civis/veiculoCivil" titulo="Cancelar" />
            </div>
            <div>
                <Salvar link="www.google.com" titulo="Salvar" />
            </div>
        </div>

    </>
}