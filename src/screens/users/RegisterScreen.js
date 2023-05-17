import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { USER_REGISTER_RESET } from "../../redux/constants/userConstants";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setTimeout(function () {
        dispatch({ type: USER_REGISTER_RESET });
      }, 2000);
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("les mots de passe sont différents");
    } else {
      dispatch(register(name, email, password));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      document.getElementById("myForm").reset();
    }
  };

  return (
    <div>
      <form className="form" id="myForm" onSubmit={submitHandler}>
        <div>
          <h1>Ajouter Un Utilisateur</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {success && (
          <MessageBox variant="success">
            Ajouter Nouveau Utilisateur Avec Succée
          </MessageBox>
        )}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nom/Prènom</label>
          <input
            type="text"
            id="name"
            placeholder="Entrer Le Nom"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            placeholder="Entrer Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Mot De Passe</label>
          <input
            type="password"
            id="password"
            placeholder="Entrer Mot De Passe"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer Mot De Passe</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Entrer Confirmer Mot De Passe"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Ajouter
          </button>
        </div>
        <div>
          <label />
        </div>
      </form>
    </div>
  );
}
