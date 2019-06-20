import React from "react"
import { withApollo } from "react-apollo"

import meQuery from "../services/operations/me"

import styles from "./HomePage.module.css"

import Card from "../components/Card"

import api from "../services/api"

const HomePage = ({ client, history }) => {
  const [searchValue, setSearchValue] = React.useState("")
  const [searchType, setSearchType] = React.useState("all")
  const [searchTypeText, setSearchTypeText] = React.useState(
    "Buscar Todas"
  )

  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const [page, setPage] = React.useState(1)

  const [loading, setLoading] = React.useState(false)
  const [apiData, setApiData] = React.useState([])
  const [checkUserLoading, setCheckUserLoading] = React.useState(true)

  React.useEffect(() => {
    client
      .query({ query: meQuery })
      .then(({ data }) => {
        if (!data.me.id) history.push("/")

        setCheckUserLoading(false)
      })
      .catch(() => history.push("/"))
  }, [])

  const handleSearch = () => {
    setLoading(true)

    let searchParam

    if (searchType === "all") searchParam = "/"
    if (searchType === "random") searchParam = "/random"
    if (searchType === "id") searchParam = `/${searchValue}`

    api
      .get(`${searchParam}?per_page=${rowsPerPage}&page=${page}`)
      .then(({ data }) => {
        setLoading(false)
        setApiData(data)
      })
      .catch((e) => setLoading(false))
  }

  React.useEffect(() => {
    if (page === 1) return

    handleSearch()
  }, [handleSearch, page])

  if (checkUserLoading) return (
    <div className={styles.loadingContainer}>
      <p>Carregando...</p>
    </div>
  )

  return (
    <div className={styles.pageContainer}>
      <p className={styles.title}>Consulta de Dados - Punk API</p>

      <div className={styles.searchTabContainer}>
        <span
          onClick={() => {
            setSearchType("all")
            setSearchTypeText("Buscar Todas")
          }}
          style={{
            borderBottom:
              searchType === "all" ? "1px solid black" : "none"
          }}
        >
          Buscar Todas
        </span>

        <div className={styles.searchTabDivider} />

        <span
          onClick={() => {
            setSearchType("id")

            setSearchTypeText("Busca por ID")
          }}
          style={{
            borderBottom:
              searchType === "id" ? "1px solid black" : "none"
          }}
        >
          Buscar por ID
        </span>

        <div className={styles.searchTabDivider} />

        <span
          onClick={() => {
            setSearchType("random")
            setSearchTypeText("Busca Aleatória")
          }}
          style={{
            borderBottom:
              searchType === "random" ? "1px solid black" : "none"
          }}
        >
          Busca Aleatória
        </span>
      </div>

      {searchType === "id" && (
        <input
          type="text"
          placeholder="Informe o ID"
          value={searchValue}
          onChange={({ target: { value } }) => setSearchValue(value)}
          className={styles.searchInput}
        />
      )}

      <div className={styles.submitLineContainer}>
        {searchType === "all" && (
          <>
            <label htmlFor="rowsPerPage1">Nº de cervejas:</label>

            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={({ target: { value } }) =>
                setRowsPerPage(value)
              }
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </>
        )}

        {loading ? (
          "Carregando..."
        ) : (
          <button
            className={styles.searchButton}
            onClick={handleSearch}
          >
            {searchTypeText}
          </button>
        )}
      </div>

      {apiData.length > 0 && (
        <div className={styles.cardsContainer}>
          {apiData.map((beer) => (
            <Card key={beer.id} data={beer} />
          ))}
        </div>
      )}

      {apiData.length > 0 && !loading && (
        <button
          onClick={() => {
            setPage(page + 1)

            handleSearch()
          }}
          className={styles.paginationButton}
        >
          Próxima Página
        </button>
      )}
    </div>
  )
}

export default withApollo(HomePage)
