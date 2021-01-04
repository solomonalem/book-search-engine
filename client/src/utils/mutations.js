import gql from 'graphql-tag';

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) 
          {
          authors
          description
          title
     
    }
  }
`;
// Create user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId:ID!,$description:String! ,$authors:[String!]!, $title:String!, $image:String!) {
    saveBook(bookId:$bookId,description:$description authors:$authors,title:$title, image:$image) {
      token
      user {
        _id
        username
      }
    }
  }
`;