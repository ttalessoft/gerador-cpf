import { useRef, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { cpf } from "cpf-cnpj-validator";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "./App.css";

function App() {
  const [qnt, setQnt] = useState<number>(1);
  const [cpfs, setCpfs] = useState<string[]>([]);

  const toast = useRef(v4());
  const showSuccess = () => {
    toast.current.show({
      severity: "info",
      summary: "Copiado",
      detail: "O cpf clicado foi copiado com sucesso!",
      life: 4000,
    });
  };

  const handleGenerateCpf = () => {
    let a: string[] = [];
    for (let i = 0; i < qnt; i++) {
      const c = cpf.generate();
      a.push(c);
    }
    setCpfs(a);
  };

  return (
    <div className="container">
      <Toast ref={toast} position="bottom-center" />
      <h1>Gerador de cpf</h1>
      <div>
        <h2>
          O gerador de cpf mais rápido prático e objetivo{" "}
          <i className="pi pi-check" style={{ color: "green" }}></i>
        </h2>
        <p>Feito de programador para programadores</p>
      </div>
      <div className="card">
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-6">
            <InputNumber
              name="qnt"
              value={qnt}
              onChange={(e) => setQnt(Number(e.value))}
              showButtons
              buttonLayout="horizontal"
              style={{ textAlign: "center" }}
              min={1}
              max={16}
              decrementButtonIcon="pi pi-minus"
              incrementButtonIcon="pi pi-plus"
            />
          </div>

          <div className="field col-12 md:col-6">
            <Button
              label="Gerar"
              onClick={() => handleGenerateCpf()}
              disabled={qnt < 1}
            />
          </div>
        </div>
        {cpfs.length > 0 &&
          cpfs.map((i) => (
            <p
              onClick={() => {
                window.navigator.clipboard.writeText(i);
                showSuccess();
              }}
              className="cursor-pointer"
            >
              {cpf.format(i)}
              <i className="pi pi-link ml-3"></i>
            </p>
          ))}
      </div>
      <p className="read-the-docs">
        Clique <a href="https://geradorcnpj.com.br">aqui</a> e conheça o gerador
        de cnpj
      </p>
    </div>
  );
}

export default App;
function v4(): any {
  throw new Error("Function not implemented.");
}
