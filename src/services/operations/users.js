import gql from "graphql-tag"

const users = gql`
  query SHOW_ALL_USERS {
    users {
      id
      name
      email
    }
  }
`

export default users
