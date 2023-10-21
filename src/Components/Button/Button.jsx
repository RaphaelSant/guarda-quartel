import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

export function NovoRegistro(props) {
  return (
    <Link to={props.link} className="btn bnt-base btn-lg btn-registro">
      <i className="fa-solid fa-address-card me-2"></i>
      {props.titulo}
    </Link>
  );
}

export function PaginaInicial(props) {
  return (
    <Link to={props.link} className="btn bnt-base btn-lg paginaIncial  me-3">
      <i className="fa-solid fa-house me-2"></i>
      {props.titulo}
    </Link>
  );
}

export function Voltar(props) {
  return (
    <Link to={props.link} className="btn btn-danger btn-lg">
      Voltar
    </Link>
  );
}

export function Imprimir() {
  return (
    <button
      className="mt-2 btn btn-lg btn-primary d-print-none"
      onClick={() => window.print()}
    >
      <i className="fa-solid fa-print me-2"></i>Imprimir
    </button>
  );
}
