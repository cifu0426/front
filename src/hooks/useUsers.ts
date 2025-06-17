import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { 
  GET_USUARIOS, 
  GET_USUARIO
} from '@/lib/graphql/queries';
import { 
  INSERTAR_USUARIO, 
  UPDATE_USUARIO, 
  DELETE_USUARIO 
} from '@/lib/graphql/mutations';
import { IUser } from '@/types';

export const useUsers = () => {
  const client = useApolloClient();

  // Queries
  const { 
    data: usuariosData, 
    loading: loadingUsuarios, 
    error: errorUsuarios,
    refetch: refetchUsuarios 
  } = useQuery(GET_USUARIOS);

  // Mutations
  const [insertarUsuario, { loading: insertingUsuario }] = useMutation(INSERTAR_USUARIO, {
    refetchQueries: [{ query: GET_USUARIOS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'usuarios' });
    }
  });

  const [updateUsuario, { loading: updatingUsuario }] = useMutation(UPDATE_USUARIO, {
    refetchQueries: [{ query: GET_USUARIOS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'usuarios' });
    }
  });

  const [deleteUsuario, { loading: deletingUsuario }] = useMutation(DELETE_USUARIO, {
    refetchQueries: [{ query: GET_USUARIOS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'usuarios' });
    }
  });

  // Helper functions
  const createUser = async (nombreusuario: string, contrasenia: string, rol: number) => {
    try {
      const result = await insertarUsuario({
        variables: { nombreusuario, contrasenia, rol }
      });
      return { success: true, data: result.data.insertarUsuario };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const editUser = async (id: string, usuarioInput: any) => {
    try {
      const result = await updateUsuario({
        variables: { id, usuarioInput }
      });
      return { success: true, data: result.data.updateUsuario };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const removeUser = async (id: string) => {
    try {
      await deleteUsuario({
        variables: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const getUserById = (id: string) => {
    return client.query({
      query: GET_USUARIO,
      variables: { id }
    });
  };

  return {
    // Data
    usuarios: usuariosData?.usuarios || [],
    
    // Loading states
    loadingUsuarios,
    insertingUsuario,
    updatingUsuario,
    deletingUsuario,
    
    // Errors
    errorUsuarios,
    
    // Functions
    createUser,
    editUser,
    removeUser,
    getUserById,
    refetchUsuarios
  };
}; 