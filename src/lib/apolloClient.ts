import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Crear el link HTTP para la conexión GraphQL
const httpLink = createHttpLink({
  uri: 'https://backend-petstore-2.onrender.com/graphql',
});

// Crear el link de contexto para manejar la autorización
const authLink = setContext((_, { headers }) => {
  // Obtener el token del localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  // Retornar los headers con o sin autorización
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  };
});

// Crear el cliente Apollo
const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient; 