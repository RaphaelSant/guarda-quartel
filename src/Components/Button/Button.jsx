import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

export function NovoRegistro(props) {
  return (
    <Link to={props.link} className="btn bnt-base btn-md btn-registro">
      <i className="fa-solid fa-address-card me-2"></i>
      {props.titulo}
    </Link>
  );
}

export function PaginaInicial(props) {
  return (
    <Link to="/homePage" className={`btn bnt-base btn-md paginaIncial me-2 ${props.estilo}`}>
      <i className="fa-solid fa-house me-2"></i>
      {props.titulo}
    </Link>
  );
}

export function Voltar(props) {
  return (
    <Link to={props.link} className="btn btn-secondary btn-md">
      <i className="fa-solid fa-arrow-left"></i> Voltar
    </Link>
  );
}

export function Cancelar(props) {
  return (
    <Link to={props.link} className="btn btn-success w-100 mt-2">
      Cancelar
    </Link>
  );
}

export function Imprimir(props) {
  const tipo = props.impressao;
  function teste(tipo) {
    if (tipo === 'paisagem') {
      return (
        <div className="alert alert-primary mt-2 d-print-none" role="alert">
          Recomenda-se imprimir esta pagina em paisagem.
        </div>
      );
    } else {
      return (
      <div className="alert alert-primary mt-2 d-print-none" role="alert">
        Recomenda-se imprimir esta pagina em retrato.
      </div>);
    }
  }

  return (
    <>
      <button
        className={`btn btn-md btn-primary d-print-none ${props.classe}`}
        onClick={() => window.print()}
      >
        <i className="fa-solid fa-print me-2"></i>Imprimir
      </button>
      {teste(tipo)}
    </>

  );
}
