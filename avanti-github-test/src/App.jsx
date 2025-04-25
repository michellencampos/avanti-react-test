import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGitHubUser = async () => {
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("Usuário não encontrado");
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(
        "Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* <h1><i className="fab fa-github"></i> Perfil <span className="github-text">GitHub</span></h1> */}
      <h1 className="title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="36px"
          height="36px"
        >
          <path d="M12 0C5.372 0 0 5.373 0 12a11.998 11.998 0 0 0 8.207 11.386c.6.11.793-.261.793-.577v-2.17c-3.338.726-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.204.084 1.837 1.237 1.837 1.237 1.07 1.834 2.807 1.304 3.492.997.109-.775.418-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.507 11.507 0 0 1 12 6.844c1.02.004 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.92.43.371.823 1.1.823 2.219v3.293c0 .319.191.694.8.576A12.004 12.004 0 0 0 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
        <span className="text-light">Perfil</span>
        <span className="text-bold">GitHub</span>
      </h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Digite um usuário do Github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchGitHubUser}>🔍</button>
      </div>

      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-light text-danger fw-semibold p-3 rounded mt-3">
          {error}
        </div>
      )}

      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt="avatar" />
          <div className="user-info">
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;