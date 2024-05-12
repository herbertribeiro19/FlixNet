import { Link } from "react-router-dom";

import "./erro.css";
function Erro() {
  return (
    <div className="boxError">
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link className="linkText" to="/">Veja todos os filmes</Link>
    </div>
  );
}

export default Erro;
