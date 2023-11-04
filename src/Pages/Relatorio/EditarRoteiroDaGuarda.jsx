import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import { Voltar } from "../../Components/Button/Button";
import Navbar from "../../Components/Navbar/Navbar";

import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";

export default function EditarRoteiroGuarda() {
    // Variaveis locais para alteração no banco de dados.
    const [sgtNomeGuerra, setSgtNomeGuera] = useState("");
    const [sgtNrArmto, setSgtNrArmto] = useState("");
    const [sgtQtdMun, setSgtQtdMun] = useState("");
    const [sgtTipoArmto, setSgtTipoArmto] = useState("");
    const [cbNomeGuerra, setCbNomeGuera] = useState("");
    const [cbNrArmto, setCbNrArmto] = useState("");
    const [cbTipoArmto, setCbTipoArmto] = useState("");
    const [cbQtdMun, setCbQtdMun] = useState("");
    const [sdNomeGuerra, setSdNomeGuera] = useState("");
    const [sdNrArmto, setSdNrArmto] = useState("");
    const [sdTipoArmto, setSdTipoArmto] = useState("");
    const [sdQtdMun, setSdQtdMun] = useState("");

    const [primeiroHorario, setPrimeiroHorairo] = useState("");
    const [segundoHorario, setSegundoHorairo] = useState("");
    const [terceiroHorario, setTerceiroHorairo] = useState("");

    // Adicione um estado para controlar se os campos estão editáveis
    const [edicaoHabilitada, setEdicaoHabilitada] = useState(false);

    // Função para alternar a habilitação dos campos
    const alternarEdicao = () => {
        setEdicaoHabilitada(!edicaoHabilitada);
    };

    // Função para obter os dados do ID do registro e adiciona-los às constantes.
    useEffect(() => {
        async function getMilitares() {
            iniciarFirestoreDb();
            const db = getFirestore();
            try {
                // Documento de referência passando como parametro o BD, tabela e ID do campo que será alterado.
                const docRef = doc(db, "roteiroDaGuarda", "vzN8Fr3wm3Ky5Zdl9LKS");
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                // Os dados serão "setados" nas variaveis locais.
                setSgtNomeGuera(data.sgtNomeGuerra);
                setSgtNrArmto(data.sgtNrArmto);
                setSgtQtdMun(data.sgtQtdMun);
                setSgtTipoArmto(data.sgtTipoArmto);

                setCbNomeGuera(data.cbNomeGuerra);
                setCbNrArmto(data.cbNrArmto);
                setCbQtdMun(data.cbQtdMun);
                setCbTipoArmto(data.cbTipoArmto);

                setSdNomeGuera(data.sdNomeGuerra);
                setSdNrArmto(data.sdNrArmto);
                setSdQtdMun(data.sdQtdMun);
                setSdTipoArmto(data.sdTipoArmto);

                setPrimeiroHorairo(data.primeiroHorario);
                setSegundoHorairo(data.segundoHorario);
                setTerceiroHorairo(data.terceiroHorario);

            } catch (error) {
                // Mostrar um alerta de erro
                window.alert("Algo deu errado: " + error.message);
            }
        }
        getMilitares();
    }, []);

    // Função para ação update do botão ATUALZIAR

    const atualizarMilitar = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const docRef = doc(db, "roteiroDaGuarda", "vzN8Fr3wm3Ky5Zdl9LKS");

        try {
            await updateDoc(docRef, {
                sgtNomeGuerra: sgtNomeGuerra,
                sgtNrArmto: sgtNrArmto,
                sgtQtdMun: sgtQtdMun,
                sgtTipoArmto: sgtTipoArmto,
                cbNomeGuerra: cbNomeGuerra,
                cbNrArmto: cbNrArmto,
                cbQtdMun: cbQtdMun,
                cbTipoArmto: cbTipoArmto,
                sdNomeGuerra: sdNomeGuerra,
                sdNrArmto: sdNrArmto,
                sdQtdMun: sdQtdMun,
                sdTipoArmto: sdTipoArmto,
                primeiroHorario: primeiroHorario,
                segundoHorario: segundoHorario,
                terceiroHorario: terceiroHorario
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro atualizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/relatorio/roteiroDaGuarda";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao atualizar: " + error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            atualizarMilitar();
        }

        form.classList.add("was-validated");
    };
    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center">
                Relatório &gt; Roteiro da Guarda &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Editar Registros</strong>
            </h5>
            <p className="text-center d-print-none">ROTEIRO DA GUARDA</p>

            <div className="container">
                <form
                    className={`row g-3 needs-validation ${edicaoHabilitada ? "editavel" : ""}`}
                    id="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <h4>Comandate da Guarda</h4>
                    <div className="col-md-3">
                        <label htmlFor="sgt-nome-guerra" className="form-label">
                            Nome de Guerra
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o nome de guerra"
                            id="sgt-nome-guerra"
                            value={sgtNomeGuerra}
                            onChange={(e) => setSgtNomeGuera(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sgt-tipo-armto" className="form-label">
                            Tipo do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o tipo de armamento"
                            id="sgt-tipo-armto"
                            value={sgtTipoArmto}
                            onChange={(e) => setSgtTipoArmto(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sgt-nr-armto" className="form-label">
                            Número do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o número do armamento"
                            id="sgt-nr-armto"
                            value={sgtNrArmto}
                            onChange={(e) => setSgtNrArmto(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sgt-qtd-municao" className="form-label">
                            Quantidade de munição
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira a qtd de munição"
                            id="sgt-qtd-municao"
                            value={sgtQtdMun}
                            onChange={(e) => setSgtQtdMun(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>

                    <h4>Cabo da Guarda</h4>
                    <div className="col-md-3">
                        <label htmlFor="cb-nome-guerra" className="form-label">
                            Nome de Guerra
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o nome de guerra"
                            id="cb-nome-guerra"
                            value={cbNomeGuerra}
                            onChange={(e) => setCbNomeGuera(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cb-tipo-armto" className="form-label">
                            Tipo do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o tipo de armamento"
                            id="cb-tipo-armto"
                            value={cbTipoArmto}
                            onChange={(e) => setCbTipoArmto(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cb-nr-armto" className="form-label">
                            Número do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o número do armamento"
                            id="cb-nr-armto"
                            value={cbNrArmto}
                            onChange={(e) => setCbNrArmto(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cb-qtd-municao" className="form-label">
                            Quantidade de munição
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira a qtd de munição"
                            id="cb-qtd-municao"
                            value={cbQtdMun}
                            onChange={(e) => setCbQtdMun(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>

                    <h4>Motorista</h4>
                    <div className="col-md-3">
                        <label htmlFor="sd-nome-guerra" className="form-label">
                            Nome de Guerra
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o nome de guerra"
                            id="sd-nome-guerra"
                            value={sdNomeGuerra}
                            onChange={(e) => setSdNomeGuera(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sd-tipo-armto" className="form-label">
                            Tipo do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o tipo de armamento"
                            id="sd-tipo-armto"
                            value={sdTipoArmto}
                            onChange={(e) => setSdTipoArmto(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sd-nr-armto" className="form-label">
                            Número do armamento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira o número do armamento"
                            id="sd-nr-armto"
                            value={sdNrArmto}
                            onChange={(e) => setSdNrArmto(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sd-qtd-municao" className="form-label">
                            Quantidade de munição
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insira a qtd de munição"
                            id="sd-qtd-municao"
                            value={sdQtdMun}
                            onChange={(e) => setSdQtdMun(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>

                    <h4>Plantões</h4>
                    <div className="col-md-4">
                        <label htmlFor="primeiroHorario" className="form-label">
                            Primeiro Horário    
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="1º Horário"
                            id="primeiroHorario"
                            value={primeiroHorario}
                            onChange={(e) => setPrimeiroHorairo(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="segundoHorario" className="form-label">
                            Segundo Horário    
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="2º Horário"
                            id="segundoHorario"
                            value={segundoHorario}
                            onChange={(e) => setSegundoHorairo(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="terceiroHorario" className="form-label">
                            Terceiro Horário    
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="3º Horário"
                            id="terceiroHorario"
                            value={terceiroHorario}
                            onChange={(e) => setTerceiroHorairo(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>


                    <button type="submit" className="btn btn-lg btn-success">
                        Atualizar Registro
                    </button>
                    <Voltar link="/relatorio/roteiroDaGuarda" />
                    <button type="button" className="btn btn-lg btn-secondary" onClick={alternarEdicao}>
                        {edicaoHabilitada ? "Bloquear Campos" : "Editar Campos"}
                    </button>
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
