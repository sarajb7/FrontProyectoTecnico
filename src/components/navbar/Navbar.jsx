import "./navbar.css"
import logo from "../../assets/logo.png";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../App";


export default function Navbar(){
    const { actualRole} = useContext(Context);

    const createGame = async (event) => {
        event.preventDefault(); 
        const form = event.target; 
    
        
        const nombreJuego = form.elements.nombreJuego.value;
        const urlImagen = form.elements.urlImagen.value;
        const categoriaJuego = form.elements.categoriaJuego.value;
    
        try {
          
          const result = await axios.post("http://localhost:5000/juegos", {
            nombre: nombreJuego,
            imagen: urlImagen,
            categoria: categoriaJuego,
          });
    
          console.log(result.data); 
          form.reset();
        } catch (error) {
          console.error("Error:", error);
        }
      };

        const addGame = function() {
            const hideDiv = document.querySelector('.admin-div');
            hideDiv.classList.remove('hidden');


        }


    return <div className="navbar-main">
        <div className="first-div">
          <img src={logo} className="logoFerrimas2" alt="logo" />
        </div>

        {actualRole === 'admin' && <div className="edit-div"><button className="edit-button" onClick={addGame}>Añadir juego</button></div>}
        <div className="admin-div hidden">
        <form className="create-form" onSubmit={createGame}>
          <input className="inputs-form" name="nombreJuego" placeholder="Nombre del juego" />
          <input className="inputs-form" name="urlImagen" placeholder="URL imagen" />
          <input className="inputs-form" name="categoriaJuego" placeholder="Categoría del juego" />
          <button className="inputs-form button-create" type="submit">Crear juego</button>
        </form>
        </div>

        <div className="second-div">
            <div className="link">
              <Link  to="/login">
                <button className="login-register-buttons">Login</button>
              </Link>
            </div>
            <div className="link">
              <Link  to="/register">
                <button className="login-register-buttons">Register</button>
              </Link>
            </div>
        </div>
    </div>
}