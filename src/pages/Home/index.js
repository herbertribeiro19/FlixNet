import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper";
import "swiper/css";
import "./home.css";
//https://api.themoviedb.org/3/movie/now_playing?api_key=02b5bfa195025d9b25c4abe3f4ef54e8&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "02b5bfa195025d9b25c4abe3f4ef54e8",
          language: "pt-BR",
          page: "1",
        },
      });
      //   console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0, 5));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <>
      <h1 className="titleBox">Últimos lançamentos</h1>

      <div className="containerGeral">
        <Swiper
          // modules={[Autoplay]}
          Autoplay={{ delay: 1000 }}
          className="swiper-container"
        >
          <SwiperSlide className="swiper-item">
            <div className="lista-filmes">
              {filmes.map((filme) => {
                return (
                  <article key={filme.id}>
                    <h2>{filme.title}</h2>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                      alt={filme.title}
                    />
                    <Link className="link" to={`/filme/${filme.id}`}>
                      Acessar
                    </Link>
                  </article>
                );
              })}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default Home;
