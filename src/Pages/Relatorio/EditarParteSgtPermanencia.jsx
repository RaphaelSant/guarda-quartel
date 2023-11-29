import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import { Voltar } from "../../Components/Button/Button";
import Navbar from "../../Components/Navbar/Navbar";

import iniciarFirestoreDb from "../FirestoreConfig/firestoreConfig";

export default function EditarParteSgtPemanencia() {
    // Variaveis locais para alteração no banco de dados.
    const [paradaDiaria, setParadaDiaria] = useState("");
    const [recebimentoServico, setRecebimentoServico] = useState("");
    const [pessoalServico, setPessoalServico] = useState("");
    const [conForaPontaAnterior, setConForaPontaAnterior] = useState("");
    const [conForaPontaAtual, setConForaPontaAtual] = useState("");
    const [consPontaAnterior, setConsPontaAnterior] = useState("");
    const [consPontaAtual, setConsPontaAtual] = useState("");
    const [rancho, setRancho] = useState("");
    const [lixeiras, setLixeiras] = useState("");
    const [dependencias, setDependencias] = useState("");
    const [claviculario, setClaviculario] = useState("");
    const [bombaAgua, setBombaAgua] = useState("");
    const [revistaRecolher, setRevistaRecolher] = useState("");
    const [cameras, setCameras] = useState("");
    const [materialCarga, setMaterialCarga] = useState("");
    const [ocorrencias, setOcorrencias] = useState("");
    const [correspondencias, setCorrespondencias] = useState("");
    const [viaturas, setViaturas] = useState("");
    const [passagemServico, setPassagemServico] = useState("");
    const [armtoMunicao, setArmtoMunicao] = useState("");
    const [radios, setRadios] = useState("");

    // Adicione um estado para controlar se os campos estão editáveis
    const [edicaoHabilitada, setEdicaoHabilitada] = useState(false);

    // Função para alternar a habilitação dos campos
    const alternarEdicao = () => {
        setEdicaoHabilitada(!edicaoHabilitada);
    };

    // Função para obter os dados do ID do registro e adiciona-los às constantes.
    useEffect(() => {
        async function getParteSgt() {
            iniciarFirestoreDb();
            const db = getFirestore();
            try {
                // Documento de referência passando como parametro o BD, tabela e ID do campo que será alterado.
                const docRef = doc(db, "parte-sgt-permanencia", "tSpnj7fUF3dCeOxIGo1b");
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                // Os dados serão "setados" nas variaveis locais.
                setParadaDiaria(data.paradaDiaria);
                setRecebimentoServico(data.recebimentoServico);
                setPessoalServico(data.pessoalServico);
                setConForaPontaAnterior(data.conForaPontaAnterior);
                setConForaPontaAtual(data.conForaPontaAtual);
                setConsPontaAnterior(data.consPontaAnterior);
                setConsPontaAtual(data.consPontaAtual);
                setRancho(data.rancho);
                setLixeiras(data.lixeiras);
                setDependencias(data.dependencias);
                setClaviculario(data.claviculario);
                setBombaAgua(data.bombaAgua);
                setRevistaRecolher(data.revistaRecolher);
                setCameras(data.cameras);
                setMaterialCarga(data.materialCarga);
                setOcorrencias(data.ocorrencias);
                setCorrespondencias(data.correspondencias);
                setViaturas(data.viaturas);
                setPassagemServico(data.passagemServico);
                setArmtoMunicao(data.armtoMunicao);
                setRadios(data.radios);
            } catch (error) {
                // Mostrar um alerta de erro
                window.alert("Algo deu errado: " + error.message);
            }
        }
        getParteSgt();
    }, []);

    // Função para ação update do botão ATUALZIAR

    const atualizarParteSgtPerm = async () => {
        iniciarFirestoreDb();
        const db = getFirestore();
        const docRef = doc(db, "parte-sgt-permanencia", "tSpnj7fUF3dCeOxIGo1b");

        try {
            await updateDoc(docRef, {
                paradaDiaria: paradaDiaria,
                recebimentoServico: recebimentoServico,
                pessoalServico: pessoalServico,
                conForaPontaAnterior: conForaPontaAnterior,
                conForaPontaAtual: conForaPontaAtual,
                consPontaAnterior: consPontaAnterior,
                consPontaAtual: consPontaAtual,
                rancho: rancho,
                lixeiras: lixeiras,
                dependencias: dependencias,
                claviculario: claviculario,
                bombaAgua: bombaAgua,
                revistaRecolher: revistaRecolher,
                cameras: cameras,
                materialCarga: materialCarga,
                ocorrencias: ocorrencias,
                correspondencias: correspondencias,
                viaturas: viaturas,
                passagemServico: passagemServico,
                armtoMunicao: armtoMunicao,
                radios: radios
            });
            // Mostrar um alerta de sucesso
            window.alert("Cadastro atualizado com sucesso.");
            // Redirecionar para outra página
            window.location.href = "/relatorio/parteSargentoPermanencia";
        } catch (error) {
            // Mostrar um alerta de erro
            window.alert("Erro ao atualizar: " + error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            atualizarParteSgtPerm();
        }

        form.classList.add("was-validated");
    };
    return (
        <>
            <Navbar />
            <h5 className="mt-4 mb-0 text-center">
                Relatório &gt; Parte do Sargento Pemanência &gt;{" "}
                <strong style={{ color: "#008BD2" }}>Editar Parte</strong>
            </h5>
            <p className="text-center d-print-none">ENTRADA E SAÍDA DE MILITARES DURANTE HORÁRIO DE EXPEDIENTE</p>

            <div className="container">
                <form
                    className={`row g-3 needs-validation ${edicaoHabilitada ? "editavel" : ""}`}
                    id="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="col-md-3">
                        <label htmlFor="parada-diaria" className="form-label">
                            01 - Parada Diária
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="01 - Parada Diária"
                            id="parada-diaria"
                            value={paradaDiaria}
                            onChange={(e) => setParadaDiaria(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="recebimento-servico" className="form-label">
                            02 - Recebimento do Serviço
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="02 - Recebimento do Serviço"
                            id="recebimento-servico"
                            value={recebimentoServico}
                            onChange={(e) => setRecebimentoServico(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="pessoal-servico" className="form-label">
                            03 – Pessoal de Serviço
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="03 – Pessoal de Serviço"
                            id="pessoal-servico"
                            value={pessoalServico}
                            onChange={(e) => setPessoalServico(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <h5>04 - Energia Elétrica: Consumo</h5>
                    <div className="col-md-3">
                        <label htmlFor="consumo-ponta-atual" className="form-label">
                            Ponta (4) - Atual
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Consumo de ponta (4) - Atual"
                            id="consumo-ponta-atual"
                            value={consPontaAtual}
                            onChange={(e) => setConsPontaAtual(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="consumo-ponta-anterior" className="form-label">
                            Ponta (4) - Anterior
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Consumo de ponta (4) - Anterior"
                            id="consumo-ponta-anterior"
                            value={consPontaAnterior}
                            onChange={(e) => setConsPontaAnterior(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="consumo-fora-ponta-atual" className="form-label">
                            Fora de ponta (8) - Atual
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Consumo de fora de ponta (8) - Atual"
                            id="consumo-fora-ponta-atual"
                            value={conForaPontaAtual}
                            onChange={(e) => setConForaPontaAtual(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="consumo-fora-ponta-anterior" className="form-label">
                            Fora de ponta (8) - Anterior
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Consumo de fora de ponta (8) - anterior"
                            id="consumo-fora-ponta-anterior"
                            value={conForaPontaAnterior}
                            onChange={(e) => setConForaPontaAnterior(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="rancho" className="form-label">
                            05 – Rancho
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="05 – Rancho"
                            id="rancho"
                            value={rancho}
                            onChange={(e) => setRancho(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="lixeiras" className="form-label">
                            06 – Lixeiras
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="06 – Lixeiras"
                            id="lixeiras"
                            value={lixeiras}
                            onChange={(e) => setLixeiras(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="armto-municao" className="form-label">
                            07 - Armamento e munição
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="07 - Armamento e munição"
                            id="armto-municao"
                            value={armtoMunicao}
                            onChange={(e) => setArmtoMunicao(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="dependencias" className="form-label">
                            08 – Dependências
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="08 – Dependências"
                            id="dependencias"
                            value={dependencias}
                            onChange={(e) => setDependencias(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="claviculario" className="form-label">
                            09 – Claviculário
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="09 – Claviculário"
                            id="claviculario"
                            value={claviculario}
                            onChange={(e) => setClaviculario(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="bombaAgua" className="form-label">
                            10 – Bomba d'água:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="10 – Bomba d'água:"
                            id="bombaAgua"
                            value={bombaAgua}
                            onChange={(e) => setBombaAgua(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="revistaRecolher" className="form-label">
                            11 – Revista do recolher
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="11 – Revista do recolher"
                            id="revistaRecolher"
                            value={revistaRecolher}
                            onChange={(e) => setRevistaRecolher(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="radios" className="form-label">
                            12 – Rádios
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="12 – Rádios"
                            id="radios"
                            value={radios}
                            onChange={(e) => setRevistaRecolher(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cameras" className="form-label">
                            13 – Câmeras
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="13 – Câmeras"
                            id="cameras"
                            value={cameras}
                            onChange={(e) => setCameras(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="material-carga" className="form-label">
                            14 – Material Carga
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="14 – Material Carga"
                            id="material-carga"
                            value={materialCarga}
                            onChange={(e) => setMaterialCarga(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="ocorrencias" className="form-label">
                            16 – Ocorrências
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="16 – Ocorrências"
                            id="ocorrencias"
                            value={ocorrencias}
                            onChange={(e) => setOcorrencias(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="correspondencias" className="form-label">
                            17 – Correspondências
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="17 – Correspondências"
                            id="correspondencias"
                            value={correspondencias}
                            onChange={(e) => setCorrespondencias(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="viaturas" className="form-label">
                            18 – Viaturas
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="18 – Viaturas"
                            id="viaturas"
                            value={viaturas}
                            onChange={(e) => setViaturas(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="passagem-servico" className="form-label">
                            19 – Passagem do serviço
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="19 – Passagem do serviço"
                            id="passagem-servico"
                            value={passagemServico}
                            onChange={(e) => setPassagemServico(e.target.value)}
                            disabled={!edicaoHabilitada}
                        />
                        <div className="valid-feedback">OK!</div>
                        <div className="invalid-feedback">Campo obrigatório.</div>
                    </div>




                    <button type="submit" className="btn btn-md btn-success">
                        Atualizar Registro
                    </button>
                    <Voltar link="/relatorio/parteSargentoPermanencia" />
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
