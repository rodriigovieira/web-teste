import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ApolloProvider } from "react-apollo"

import client from "./services/apolloClient"

import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/HomePage"

const Router = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/cadastro" component={SignUpPage} />

          <Route path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default Router
