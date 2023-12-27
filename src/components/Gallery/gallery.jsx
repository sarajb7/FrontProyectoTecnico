import './gallery.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from "../../App";

export default function CharacterGallery({ data }) {
  const [games, setGames] = useState([]);
  const { actualRole } = useContext(Context);
  const [selectedGame, setSelectedGame] = useState(null);

  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`http://localhost:5000/juegos/${gameId}`);
      const updatedGames = games.filter((game) => game._id !== gameId);
      setGames(updatedGames);
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  const editGame = async (gameId) => {
    try {
      const updatedGame = await axios.get(`http://localhost:5000/juegos/${gameId}`);
      setSelectedGame(updatedGame.data);
    } catch (error) {
      console.error("Error al cargar el juego para editar:", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/juegos/${selectedGame._id}`, selectedGame);
      // Actualizar la lista de juegos después de la edición si es necesario
      const updatedGames = games.map((game) =>
        game._id === selectedGame._id ? selectedGame : game
      );
      setGames(updatedGames);
      setSelectedGame(null); // Cerrar el formulario de edición
    } catch (error) {
      console.error("Error al editar el juego:", error);
    }
  };

  useEffect(() => {
    console.log(data);
    const getGames = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/juegos");
        setGames(data);
      } catch (error) {
        console.error("Error al obtener juegos:", error);
      }
    };
    getGames();
  }, [data]);

  return (
    <div className="all-images">
      {data.map((item, index) => (
        <div className="imagen-div" key={index}>
            <img className="image-character" src={item.imagen} alt="images" />
          <div className="div-name">
            <p className='text-game'>{item.nombre}</p>
          </div>
          <div className="category-div">
            <p className='text-game'>{item.categoria}</p>
          </div>
          {actualRole === "admin" && (
            <div className='div-buttons'>
              <button className='buttons' onClick={() => deleteGame(item._id)}>Eliminar</button>
              <button className='buttons' onClick={() => editGame(item._id)}>Editar</button>
            </div>
          )}
        </div>
      ))}
      {selectedGame && (
        <div className="edit-game-form">
          <h2>Editar Juego</h2>
          <form onSubmit={handleEdit}>
            <input
                placeholder="Nombre del juego"
                type="text"
                value={selectedGame.nombre}
                onChange={(e) => setSelectedGame({ ...selectedGame, nombre: e.target.value })}
            />
            <input
                placeholder="Url de la imagen"
                type="text"
                value={selectedGame.imagen}
                onChange={(e) => setSelectedGame({ ...selectedGame, imagen: e.target.value })}
            />
            <input
                placeholder="Categoria del juego"
                type="text"
                value={selectedGame.categoria}
                onChange={(e) => setSelectedGame({ ...selectedGame, categoria: e.target.value })}
            />
            <button className='submit-edit-button' type="submit">Guardar Cambios</button>
          </form>
        </div>
      )}
    </div>
  );
}
