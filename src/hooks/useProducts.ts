import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { 
  GET_PRODUCTOS, 
  GET_PRODUCTO 
} from '@/lib/graphql/queries';
import { 
  INSERTAR_PRODUCTO, 
  UPDATE_PRODUCTO, 
  DELETE_PRODUCTO 
} from '@/lib/graphql/mutations';
import { IProduct } from '@/types';

export const useProducts = () => {
  const client = useApolloClient();

  // Queries
  const { 
    data: productosData, 
    loading: loadingProductos, 
    error: errorProductos,
    refetch: refetchProductos 
  } = useQuery(GET_PRODUCTOS, {
    errorPolicy: 'all'
  });

  // Mutations
  const [insertarProducto, { loading: insertingProducto }] = useMutation(INSERTAR_PRODUCTO, {
    refetchQueries: [{ query: GET_PRODUCTOS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'productos' });
    }
  });

  const [updateProducto, { loading: updatingProducto }] = useMutation(UPDATE_PRODUCTO, {
    refetchQueries: [{ query: GET_PRODUCTOS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'productos' });
    }
  });

  const [deleteProducto, { loading: deletingProducto }] = useMutation(DELETE_PRODUCTO, {
    refetchQueries: [{ query: GET_PRODUCTOS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'productos' });
    }
  });

  // Helper functions
  const createProduct = async (productoInput: any) => {
    try {
      const result = await insertarProducto({
        variables: { productoInput }
      });
      if (!result.data || !result.data.insertarProducto) {
        const errorMsg = result.errors?.[0]?.message || 'No se pudo crear el producto (respuesta vacía)';
        return { success: false, error: errorMsg };
      }
      return { success: true, data: result.data.insertarProducto };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const editProduct = async (id: string, productoInput: any) => {
    try {
      const result = await updateProducto({
        variables: { id, productoInput }
      });
      if (!result.data || !result.data.updateProducto) {
        const errorMsg = result.errors?.[0]?.message || 'No se pudo actualizar el producto (respuesta vacía)';
        return { success: false, error: errorMsg };
      }
      return { success: true, data: result.data.updateProducto };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const removeProduct = async (id: string) => {
    try {
      const result = await deleteProducto({
        variables: { id }
      });
      if (!result.data || result.data.deleteProducto === null) {
        const errorMsg = result.errors?.[0]?.message || 'No se pudo eliminar el producto (respuesta vacía)';
        return { success: false, error: errorMsg };
      }
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const getProductById = (id: string) => {
    return client.query({
      query: GET_PRODUCTO,
      variables: { id }
    });
  };

  return {
    // Data
    productos: productosData?.productos || [],
    
    // Loading states
    loadingProductos,
    insertingProducto,
    updatingProducto,
    deletingProducto,
    
    // Errors
    errorProductos,
    
    // Functions
    createProduct,
    editProduct,
    removeProduct,
    getProductById,
    refetchProductos
  };
}; 