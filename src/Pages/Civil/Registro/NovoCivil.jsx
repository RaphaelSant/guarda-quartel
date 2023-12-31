import React, { useState } from "react";
import { Voltar } from "../../../Components/Button/Button";
import Navbar from "../../../Components/Navbar/Navbar";

import { addDoc, collection, getFirestore } from "firebase/firestore";

import { capturaData, capturaHora } from "../../Assets/capturaDate";
import iniciarFirestoreDb from "../../FirestoreConfig/firestoreConfig";

export default function RegistroCivil() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataEntrada, setDataEntrada] = useState(capturaData);
  const [horarioEntrada, setHorarioEntrada] = useState(capturaHora);
  const [horarioSaida] = useState("OM");
  const [destino, setDestino] = useState("");

  async function cadastrarCivil() {
    iniciarFirestoreDb();
    const db = getFirestore();
    const civisCollectionRef = collection(db, "es_civis");

    try {
      await addDoc(civisCollectionRef, {
        nome,
        cpf,
        dataEntrada,
        horarioSaida,
        horarioEntrada,
        destino,
      });
      // Mostrar um alerta de sucesso
      window.alert("Cadastro realizado com sucesso.");
      // Redirecionar para outra página
      //window.location.replace("civil/civis");
      window.location.href = "/civis/civil";
    } catch (error) {
      // Mostrar um alerta de erro
      window.alert("Erro ao cadastrar: " + error.message);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity()) {
      cadastrarCivil();
    }

    form.classList.add("was-validated");
  };

  return (
    <>
      <Navbar />
      <h5 className="mt-4 mb-0 text-center">
        Civil &gt; Registro &gt;{" "}
        <strong style={{ color: "#008BD2" }}>Novo Registro</strong>
      </h5>
      <p className="text-center d-print-none">Entrada e Saída de Civis</p>

      <div className="container">
        <form
          className="row g-3 needs-validation"
          id="needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="col-md-6">
            <label htmlFor="nome-completo" className="form-label">
              Nome Completo
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Insira o nome completo"
              id="nome-completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <div className="valid-feedback">OK!</div>
            <div className="invalid-feedback">Campo obrigatório.</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input
              type="text"
              className="form-control"
              id="cpf"
              value={cpf}
              placeholder="Insira o CPF"
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <div className="valid-feedback">OK!</div>
            <div className="invalid-feedback">Campo obrigatório.</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="data-entrada" className="form-label">
              Data de Entrada
            </label>
            <input
              type="text"
              className="form-control"
              id="data-entrada"
              value={dataEntrada}
              placeholder="Insira a data de entrada"
              onChange={(e) => setDataEntrada(e.target.value)}
              required
            />
            <div className="valid-feedback">OK!</div>
            <div className="invalid-feedback">Campo obrigatório.</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="hora-entrada" className="form-label">
              Horário de Entrada
            </label>
            <input
              type="text"
              className="form-control"
              id="hora-entrada"
              value={horarioEntrada}
              placeholder="Insira o horário de entrada"
              onChange={(e) => setHorarioEntrada(e.target.value)}
              required
            />
            <div className="valid-feedback">OK!</div>
            <div className="invalid-feedback">Campo obrigatório.</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="destino" className="form-label">
              Destino
            </label>
            <input
              type="text"
              className="form-control"
              id="destino"
              value={destino}
              placeholder="Insira o destino"
              onChange={(e) => setDestino(e.target.value)}
              required
            />
            <div className="valid-feedback">OK!</div>
            <div className="invalid-feedback">Campo obrigatório.</div>
          </div>
          <button type="submit" className="btn btn-md btn-success">
            Registrar Civil
          </button>
          <Voltar link="/civis/civil" />
          <div className="col-md-6"></div>
        </form>
      </div>

      <script>
        {
          // Example starter JavaScript for disabling form submissions if there are invalid fields
          (() => {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.getElementsByClassName("needs-validation");

            // Loop over them and prevent submission
            Array.from(forms).forEach((form) => {
              form.addEventListener(
                "submit",
                (event) => {
                  if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                  } else {
                    event.preventDefault();
                  }
                  form.classList.add("was-validated");
                },
                false
              );
            });
          })()
        }
      </script>
    </>
  );
}
