import gql from "graphql-tag"

const loginUser = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export default loginUser
