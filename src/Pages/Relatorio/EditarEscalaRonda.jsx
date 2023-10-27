import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import { Voltar } from "../../Components/Button/Button";
import Navbar from "../../Components/Navbar/Navbar";

import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";

export default function EditarEscalaRonda() {

    // Variaveis locais para alteração no banco de dados.
    const [alteracoes, setAlteracoes] = useState("");

    // Função para obter os dados do ID do registro e adiciona-los às constantes.
    useEffect(() => {
        async function getAlteracao() {
            iniciarFirestoreDb();
            const db = getFirestore();
            try {
                // Documento de referência passando como parametro o BD, tabela e ID do campo que será alterado.
                const docRef = doc(db, "roteiroDaGuarda", "vzN8Fr3wm3Ky5Zdl9LKS");
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                // Os dados serão "setados" nas variaveis locais.
                setAlteracoes(data.alteracoes);
            } catch (error) {
                // Mostrar um alerta de erro
                window.alert("Algo deu errado: " + error.message);
            }
        }
        getAlteracao();
    }, []);

    // Função para ação update do botão ATUALZIAR
    const atualizarMilitar = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const docRef = doc(db, "roteiroDaGuarda", "vzN8Fr3wm3Ky5Zdl9LKS");

        try {
            await updateDoc(docRef, {
                alteracoes: alteracoes,
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro atualizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/relatorio/escalaDeRonda";
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
                Relatório &gt; Escala de Ronda &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Editar Alterações</strong>
            </h5>
            <p className="text-center d-print-none">ESCALA DE RONDA</p>

            <div className="container">
                <form
                    className={`row g-3 needs-validation`}
                    id="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <div className="col-md-12 form-floating">
                        <textarea
                            className="form-control"
                            placeholder="Atualizar alterações."
                            id="alteracao"
                            value={alteracoes}
                            onChange={(e) => setAlteracoes(e.target.value)}
                            style={{ height: 100 + '%' }}></textarea>
                        <label for="alteracao">Atualizar alterações.</label>

                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>

                    <button type="submit" className="btn btn-lg btn-success">
                        Atualizar Registro
                    </button>
                    <Voltar link="/relatorio/escalaDeRonda" />
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
