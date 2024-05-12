import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme.css";
import { toast } from "react-toastify";
import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  // const [desmontar, setDesmontar] = useState(false);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "02b5bfa195025d9b25c4abe3f4ef54e8",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      console.log("Desmontado");
      // setDesmontar(true);
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@flixnet");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Este filme já está na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@flixnet", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso");
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <strong>Avaliação: {filme.vote_average}/10</strong>
      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>

      <div className="area-btn">
        <button onClick={salvarFilme}>Salvar</button>
        <a
          rel="external"
          target="blank"
          href={`https://youtube.com/results?search_query=${filme.title} trailer`}
        >
          <button>Assistir o Trailer</button>
        </a>
      </div>
    </div>
  );
}

export default Filme;
