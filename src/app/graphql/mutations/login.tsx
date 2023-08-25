import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                email
                firstName
                id
                lastName
                username
            }
        }
    }
`;

export default LOGIN_MUTATION;
