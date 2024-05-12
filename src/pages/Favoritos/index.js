import "./favoritos.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@flixnet");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@flixnet", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="boxFavoritos">
      <h1>Meus Filmes</h1>
      {filmes.length === 0 && (
        <span className="dontHave">Você não possui nenhum filme salvo!</span>
      )}
      <div>
        <ul>
          {filmes.map((item) => {
            return (
              <li className="details" key={item.id}>
                <span>{item.title}</span>
                <div>
                  <Link className="link2" to={`/filme/${item.id}`}>
                    Ver detalhes
                  </Link>
                  <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Favoritos;
