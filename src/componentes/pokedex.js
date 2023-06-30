import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./pokedex.css";

function Pokedex() {
  const [pesquica, setPesquica] = useState("");
  const [data, setData] = useState();
  const [foto, setFoto] = useState();
  const [type, setType] = useState();
  const [ability1, setAbility1] = useState();
  const [ability2, setAbility2] = useState();
  const [stats,setStats]=useState();

  useEffect(() => {
    pesquisar();
  }, [pesquica]);

  async function pesquisar() {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pesquica}`)
      .then((response) => {
        
        if (response) {
          setData(response.data);
          setAbility1(data.abilities[0].ability.name);
          setAbility2(data.abilities[1].ability.name);
          setStats(data.stats[0].base_stat)
          pesquisarFoto(response.data.forms[0].url);
          setType(data.types[0].type.name);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function pesquisarFoto(url) {
    Axios.get(url)
      .then((response) => {
        if (response) {
          setFoto(response.data.sprites.front_default);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const mudar = () => {
    pesquisar();
  };
  const handleKeyDown = (evento) => {
    if (evento.key === "Enter") {
      setTimeout(() => {
        mudar();
      }, "500");
    }
  };

  return (
    <div className="cont2">
      <div className="buscar">
        <input
          type="text"
          id="pokemonNameInput"
          placeholder="Digite o nome do Pokémon"
          value={pesquica}
          onChange={(e) => {
            setPesquica(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        ></input>

        <button
          id="searchButton"
          onClick={() => {
            setTimeout(() => {
              mudar();
            }, "500");
          }}
          onKeyDown={handleKeyDown}
        >
          Pesquisar
        </button>
      </div>
      <div className="mainbox">
        {data && (
          <>
            <div className="caixa">
              <div className="fila1">
                <div className="name">
                  <h1>{data.name}</h1>
                </div>
                <div className="foto">{foto && <img src={foto}></img>}</div>
              </div>
              <div className="fila2">
                <div className="numerotype">
                  <div className="numero">
                    <h1>{data.id}</h1>
                  </div>

                  <div className="type">{data.types && <h1>{type}</h1>}</div>
                </div>
                <div className="medidas">
                  <div className="tamanho">
                    {data.height && <h2>{data.height}0 cm</h2>}
                  </div>
                  <div className="peso">
                    {data.weight && <h2>{data.weight}00 g</h2>}
                  </div>
                </div>
                <div className="abilities">
                  <div className="abilitynum1">
                  {ability1 && <h1>Abilities:</h1>}
                    {ability1 && <h2 style={{
                      marginTop:"-25px"
                    }}>{ability1}</h2>}
                    {ability2 && <h2 style={{
                      marginTop:"-25px",
                      marginBottom:"130px"
                    }}>{ability2}</h2>}
                  </div>
                  <div className="abilitynum2">
                      {stats && (
                    <h1>
                      Base hp: {stats}

                    </h1>
                      )}

                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Pokedex;
