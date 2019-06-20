import gql from "graphql-tag"

const deleteUser = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`

export default deleteUser
