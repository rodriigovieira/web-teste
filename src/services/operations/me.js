import gql from "graphql-tag"

const me = gql`
  query GET_LOGGED_USER_INFO {
    me {
      name
      id
    }
  }
`

export default me
