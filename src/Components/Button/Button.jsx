import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

export function NovoRegistro(props) {
    return <Link to={props.link} className="btn bnt-base btn-lg btn-registro me-3">{props.titulo}</Link>
}

export function PaginaInicial(props) {
    return <Link to={props.link} className="btn bnt-base btn-lg paginaIncial">{props.titulo}</Link>
}

export function Salvar(props) {
    return <Link to={props.link} className="btn bnt-base salvar">{props.titulo}</Link>
}