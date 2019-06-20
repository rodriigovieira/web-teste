import React from "react"
import { Mutation, withApollo } from "react-apollo"

import styles from "./LoginPage.module.css"

import loginUserMutation from "../services/operations/loginUser"
import meQuery from "../services/operations/me"

const LoginPage = ({ history, client }) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [errorEmpty, setErrorEmpty] = React.useState(false)
  const [errorLength, setErrorLength] = React.useState(false)
  const [errorLogin, setErrorLogin] = React.useState(false)

  const [loadingQuery, setLoadingQuery] = React.useState(true)

  React.useEffect(() => {
    client.query({ query: meQuery })
      .then(({ data }) => {
        if (!data.me.id) return

        history.push("/home")

        setLoadingQuery(false)

        return
      })
      .catch(() => setLoadingQuery(false))
  }, [])

  const isError = errorEmpty || errorLength || errorLogin

  const getMessage = () => {
    if (errorEmpty) return "Você precisa preencher todos os campos."
    if (errorLength)
      return "Sua senha precisa de ao menos 8 caracteres."
    if (errorLogin) return "E-mail ou senha incorretos."

    return "Digite abaixo os seus dados de acesso."
  }

  const handleLogin = (loginFunction) => {
    setErrorEmpty(false)
    setErrorLength(false)
    setErrorLogin(false)

    if (!email || !password) {
      setErrorEmpty(true)

      return
    }

    if (password.length < 8) {
      setErrorLength(true)

      return
    }

    loginFunction({
      variables: { email: email.toLowerCase().trim(), password }
    })
      .then(({ data }) => {
        const { token } = data.loginUser

        if (!token) return

        localStorage.setItem("@token", token)

        history.push("/home")
      })
      .catch(() => setErrorLogin(true))
  }

  if (loadingQuery) {
    return (
      <div className={styles.loadingContainer}>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <Mutation mutation={loginUserMutation}>
      {(loginFunction, { loading }) => (
        <div className={styles.pageContainer}>
          <p
            className={styles.feedbackText}
            style={{
              color: isError ? "red" : "black"
            }}
          >
            {getMessage()}
          </p>

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

          <div className={styles.loginButtonContainer}>
            {loading ? (
              "Carregando..."
            ) : (
              <button
                onClick={() => handleLogin(loginFunction)}
                className={styles.loginButton}
              >
                Efetuar Login
              </button>
            )}
          </div>

          <div className={styles.createButtonContainer}>
            <button
              onClick={() => history.push("/cadastro")}
              className={styles.createButton}
            >
              Criar conta
            </button>
          </div>
        </div>
      )}
    </Mutation>
  )
}

export default withApollo(LoginPage)
