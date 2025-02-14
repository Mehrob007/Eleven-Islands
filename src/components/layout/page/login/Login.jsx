import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../../utils/api";
import axios from "axios";

export default function Login({ onHash = false }) {
  const { hash } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    source: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
  });

  const loginFunction = async (e) => {
    e.preventDefault();
    let errors = {};
    const token = localStorage.getItem("token");

    if (!formState.source) {
      errors.emailError = "Поле не должно быть пустым!";
    } else if (
      !/^\S+@\S+\.\S+$/.test(formState.source) &&
      !/^\d{9,15}$/.test(formState.source)
    ) {
      errors.emailError = "Введите корректный email или телефон!";
    } else {
      errors.emailError = "";
    }

    if (!formState.password) {
      errors.passwordError = "Поле не должно быть пустым!";
    } else if (formState.password.length < 4) {
      errors.passwordError = "Пароль должен содержать не менее 4 символов!";
    } else {
      errors.passwordError = "";
    }

    setErrorState(errors);

    if (!errors.emailError && !errors.passwordError) {
      try {
        const res = await apiClient.post("/auth", formState);
        const data = res.data.data;
        console.log("res", data);
        if (data.role === "User") {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        } else if (data.role === "Admin") {
          // document.cookie = `refreshToken=${data.refreshToken}; path=/; domain=localhost; Secure; SameSite=None`;
          const encodedToken = encodeURIComponent(data.refreshToken);
          document.location.href =
            import.meta.env.VITE_ENV_URL_REDIRECT + `token/${encodedToken}`;
        }
      } catch (e) {
        console.error(e);
        setErrorState({
          emailError: "Неправильный логин или пароль.",
        });
      }
    }
  };

  const onChange = (key, value) => {
    setFormState((prevFormState) => ({ ...prevFormState, [key]: value }));
  };

  const chackingRegistration = async (hash) => {
    setLoading(false);
    try {
      const res = apiClient.post(`${hash}`);
      console.log("res", res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (onHash) {
      chackingRegistration(hash);
    }
  }, []);

  return (
    <div className="login-box">
      {loading ? (
        <div className="loading-login">
          <h1>Идет подтверждение E-mail, пожалуйста, подождите!</h1>
        </div>
      ) : (
        <div className="box-login">
          <h2>Вход</h2>
          <form onSubmit={loginFunction} className="input-login">
            <div className="login-inputs">
              <label htmlFor="input-source-and-tell">Email или телефон</label>
              <input
                onChange={(e) => onChange("source", e.target.value)}
                type="text"
                id="input-source-and-tell"
              />
              {errorState.emailError && (
                <p
                  style={{
                    bottom: "-17px",
                    position: "absolute",
                    color: "red",
                  }}
                >
                  {errorState.emailError}
                </p>
              )}
            </div>
            <div className="login-inputs">
              <label htmlFor="input-password">Пароль</label>
              <input
                onChange={(e) => onChange("password", e.target.value)}
                type="password"
                id="input-password"
              />
              {errorState.passwordError && (
                <p
                  style={{
                    bottom: "-17px",
                    position: "absolute",
                    color: "red",
                  }}
                >
                  {errorState.passwordError}
                </p>
              )}
            </div>
            <div className="dop-options-login">
              <p>
                <Link to="/create-password">Забыли пароль?</Link>
              </p>
              <p>
                <Link to="/registration">Регистрация</Link>
              </p>
            </div>
            <button type="submit" className="button-login">
              Войти
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
