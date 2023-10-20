import React from "react";

export default function ImpressaoFooter() {
    // Capturando a data do sistema
    const dataHoje = new Date(Date.now()).toLocaleString().split(',')[0];

    return (
        <div className="d-none d-print-block text-center">
            <p>Quartel em Porto Velho - RO, {dataHoje}.</p>
            <div className="underline mt-5"></div>
            <p>Permanência 17º Pel Com Sl</p>
        </div>
    );
}