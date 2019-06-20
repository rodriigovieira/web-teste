import gql from "graphql-tag"

const updateUser = gql`
  mutation EDIT_USER(
    $email: String!
    $password: String
    $name: String!
    $id: ID!
  ) {
    updateUser(id: $id, data: { email: $email, password: $password, name: $name }) {
      name
      id
      email
    }
  }
`

export default updateUser
