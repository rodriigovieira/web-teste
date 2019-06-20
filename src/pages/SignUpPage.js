import React from "react"
import { Mutation } from "react-apollo"

import styles from "./SignUpPage.module.css"

import createUserMutation from "../services/operations/createUser"

const SignUpPage = ({ history }) => {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")

  const [errorEmpty, setErrorEmpty] = React.useState(false)
  const [errorLength, setErrorLength] = React.useState(false)
  const [errorLogin, setErrorLogin] = React.useState(false)
  const [errorConfirm, setErrorConfirm] = React.useState(false)

  const isError =
    errorEmpty || errorLength || errorLogin || errorConfirm

  const getMessage = () => {
    if (errorEmpty) return "Você precisa preencher todos os campos."
    if (errorLength)
      return "Sua senha precisa de ao menos 8 caracteres."
    if (errorLogin) return "E-mail ou senha incorretos."
    if (errorConfirm) return "Suas senhas devem ser iguais."

    return "Digite abaixo os dados para se cadastrar."
  }

  const handleCreate = (createFunction) => {
    setErrorEmpty(false)
    setErrorLength(false)
    setErrorLogin(false)
    setErrorConfirm(false)

    if (!email || !password) {
      setErrorEmpty(true)

      return
    }

    if (password.length < 8) {
      setErrorLength(true)

      return
    }

    if (password !== passwordConfirm) {
      setErrorConfirm(true)

      return
    }

    createFunction({
      variables: {
        email: email.toLowerCase().trim(),
        password,
        name: name.trim()
      }
    })
      .then(({ data }) => {
        const { token } = data.createUser

        if (!token) return

        localStorage.setItem("@token", token)

        history.push("/home")
      })
      .catch(() => setErrorLogin(true))
  }

  return (
    <Mutation mutation={createUserMutation}>
      {(createFunction, { loading }) => (
        <div className={styles.pageContainer}>
          <p
            className={styles.feedbackText}
            style={{
              color: isError ? "red" : "black"
            }}
          >
            {getMessage()}
          </p>

          <div className={styles.nameContainer}>
            <input
              className={styles.nameInput}
              placeholder="Nome"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              type="text"
            />
          </div>

          <div className={styles.loginContainer}>
            <input
              className={styles.loginInput}
              placeholder="E-mail"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              type="email"
            />
          </div>

          <div className={styles.passwordContainer}>
            <input
              className={styles.passwordInput}
              placeholder="Senha"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              type="password"
            />
          </div>

          <div className={styles.passwordConfirmContainer}>
            <input
              className={styles.passwordConfirmInput}
              placeholder="Confirmação de Senha"
              value={passwordConfirm}
              onChange={({ target: { value } }) =>
                setPasswordConfirm(value)
              }
              type="password"
            />
          </div>

          <div className={styles.loginButtonContainer}>
            {loading ? (
              "Carregando..."
            ) : (
              <button
                onClick={() => handleCreate(createFunction)}
                className={styles.loginButton}
              >
                Criar Conta
              </button>
            )}
          </div>

          <div className={styles.createButtonContainer}>
            <button
              onClick={() => history.push("/")}
              className={styles.createButton}
            >
              Efetuar login
            </button>
          </div>
        </div>
      )}
    </Mutation>
  )
}

export default SignUpPage
