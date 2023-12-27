import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../App";
import './Login.css'

const Login = () => {
  const { register, handleSubmit,  formState: { errors },} = useForm();
  const navigate = useNavigate();
  const { setToken, actualRole, setActualRole } = useContext(Context);

  const log = async (data) => {
    
    try {
      const result = await axios.post("http://localhost:5000/user/login", data);
      setToken(result.data.token);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("role", result.data.userInfo.role)
      setActualRole(result.data.userInfo.role)
      console.log(actualRole)
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-form-div">
    <div className="home-button-div">
    <Link className="link-home" to ='/' >
    <button className="button-home">
        <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
    </button>
    </Link>
    </div>
      <form onSubmit={handleSubmit(log)}>
        <div className="inputs">
          <input
            placeholder="email"
            type="text"
            {...register("email", {
              required: "El email no puede estar vacío",
              pattern: {
                message: "El email no tiene formato correcto",
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
            })}
          />
          {errors.email && (
            <>
              {errors.email.type === "required" && (
                <p>{errors.email.message}</p>
              )}
              {errors.email.type === "pattern" && <p>{errors.email.message}</p>}
            </>
          )}
          <input
            placeholder="password"
            type="password"
            {...register("password", {
              required: "La contraseña no puede estar vacía",
              pattern: {
                message: "La contraseña debe contener entre 8 y 15 caracteres, y se permiten mayúsculas, minúsculas, números y símbolos ",
                value: /[A-Za-z\d$@$!%*?&]{8,15}/,
              },
            })}
          />
          {errors.password && (
            <>
              {errors.password.type === "required" && (
                <p>{errors.password.message}</p>
              )}
              {errors.password.type === "pattern" && (
                <p>{errors.password.message}</p>
              )}
            </>
          )}
        </div>
        <button className="button-login" type="submit">Iniciar sesión</button>
        <p className="text-register">¿No tienes usuario?
        <Link to={'/register'}>
            Regístrate aquí 
        </Link>
        </p>
      </form>
      
    </div>
  );
};

export default Login;