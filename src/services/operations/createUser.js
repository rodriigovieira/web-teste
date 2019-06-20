import gql from "graphql-tag"

const createUser = gql`
  mutation CREATE_USER($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export default createUser
