import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    try {
        const userData = {
            email: data.email,
            password: data.password,
            nombre: data.nombre,
            apellido: data.apellido,
            role: data.role
          };
          console.log(userData)
      const result = await axios.post("http://localhost:5000/user/register", userData);
      console.log(result.data);
      localStorage.setItem("userId", result.data.data._id);
      navigate("/login");
    } catch (error) {
        if (error.response) {
            console.error("Error de respuesta del servidor:", error.response.data);
          } else if (error.request) {
            console.error("No se recibió respuesta del servidor:", error.request);
          } else {
            console.error(
              "Error durante la configuración de la solicitud:",
              error.message
            );
          }
        }
  };

  return (
    <div className="register-form-div">
    <div className="home-button-div">
    <Link className="link-home" to ='/' >
    <button className="button-home">
        <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
    </button>
    </Link>
    </div>
      <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <input
            placeholder="Email"
            type="text"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "El formato del correo electrónico no es válido",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
              pattern: {
                value: /[A-Za-z\d$@$!%*?&]{8,15}/,
                message: "El formato del correo electrónico no es válido",
              },
            })}
          />
          <input
            placeholder="Nombre"
             type="text"
            {...register("nombre", {
                 required: "El nombre es requerido",
                minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre debe tener como máximo 50 caracteres",
                },
            })}
            />
            {errors.nombre && <p>{errors.nombre.message}</p>}
          <input
            placeholder="Apellido"
            type="text"
            {...register("apellido", {
              required: "El apellido es requerido"
            })}
          />
            {/* <select {...register("role", { required: "Por favor, selecciona un rol" })}>
                <option value="">Selecciona un rol</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select> */}
            <input
            placeholder="Role"
            type="text"
            {...register("role", {
              required: "El rol es requerido"
            })}
          />
            {errors.role && <p>{errors.role.message}</p>}
        </div>
        <button className="button-register" type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;