import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { 
  GET_COMPRAS, 
  GET_COMPRA
} from '@/lib/graphql/queries';
import { 
  INSERTAR_COMPRA, 
  UPDATE_COMPRA, 
  DELETE_COMPRA 
} from '@/lib/graphql/mutations';
import { IPurchases } from '@/types';

// Función para enriquecer datos con información mock profesional
const enrichPurchasesData = (rawPurchases: any[]): IPurchases[] => {
  const proveedores = [
    'Distribuidora PetCorp S.L.', 
    'Suministros Caninos Madrid', 
    'Importadora Animal Care', 
    'Productos Veterinarios Plus', 
    'Mayorista Pet Supplies',
    'Distribuciones Mascota Feliz'
  ];
  const estados: ('Recibida' | 'Pendiente' | 'Cancelada')[] = ['Recibida', 'Pendiente', 'Cancelada'];
  const productos = [
    { id: 1, nombre: 'Collar Antipulgas (Lote 50)', precio: 12.50 }, // Precio mayorista
    { id: 2, nombre: 'Pienso Premium 15kg (Palet)', precio: 32.75 },
    { id: 3, nombre: 'Juguetes Surtidos (Caja 24)', precio: 8.90 },
    { id: 4, nombre: 'Camas Ortopédicas (Lote 10)', precio: 45.99 },
    { id: 5, nombre: 'Correas Retráctiles (Caja 20)', precio: 18.25 },
    { id: 6, nombre: 'Transportines (Lote 6)', precio: 67.50 },
    { id: 7, nombre: 'Champú Profesional (Caja 12)', precio: 7.80 },
    { id: 8, nombre: 'Arneses Acolchados (Lote 15)', precio: 13.90 }
  ];

  return rawPurchases.map((purchase, index) => {
    const numProductos = Math.floor(Math.random() * 4) + 1;
    const productosCompra = Array.from({ length: numProductos }, (_, i) => {
      const producto = productos[Math.floor(Math.random() * productos.length)];
      const cantidad = Math.floor(Math.random() * 10) + 5; // Cantidades mayoristas
      return {
        ...producto,
        cantidad
      };
    });

    const total = productosCompra.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    const fechaBase = new Date();
    fechaBase.setDate(fechaBase.getDate() - Math.floor(Math.random() * 45));

    return {
      id: purchase.id,
      fecha: fechaBase.toISOString().split('T')[0],
      total: Math.round(total * 100) / 100,
      proveedor: proveedores[index % proveedores.length],
      productos: productosCompra,
      estado: estados[Math.floor(Math.random() * estados.length)]
    };
  });
};

export const usePurchases = () => {
  const client = useApolloClient();

  // Queries
  const { 
    data: comprasData, 
    loading: loadingCompras, 
    error: errorCompras,
    refetch: refetchCompras 
  } = useQuery(GET_COMPRAS, {
    errorPolicy: 'all'
  });

  // Mutations
  const [insertarCompra, { loading: insertingCompra }] = useMutation(INSERTAR_COMPRA, {
    refetchQueries: [{ query: GET_COMPRAS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'compras' });
    }
  });

  const [updateCompra, { loading: updatingCompra }] = useMutation(UPDATE_COMPRA, {
    refetchQueries: [{ query: GET_COMPRAS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'compras' });
    }
  });

  const [deleteCompra, { loading: deletingCompra }] = useMutation(DELETE_COMPRA, {
    refetchQueries: [{ query: GET_COMPRAS }],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'compras' });
    }
  });

  // Helper functions
  const createPurchase = async (compraInput: any) => {
    try {
      const result = await insertarCompra({
        variables: { compraInput }
      });
      // Debug: loguear el result completo
      console.log('Resultado de insertarCompra:', result);
      if (!result.data || !result.data.insertarCompra) {
        const errorMsg = result.errors?.[0]?.message || 'No se pudo crear la compra (respuesta vacía)';
        return { success: false, error: errorMsg };
      }
      return { success: true, data: result.data.insertarCompra };
    } catch (error) {
      console.error('Error creating purchase:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const editPurchase = async (id: string, compraInput: any) => {
    try {
      const result = await updateCompra({
        variables: { id, compraInput }
      });
      return { success: true, data: result.data.updateCompra };
    } catch (error) {
      console.error('Error updating purchase:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const removePurchase = async (id: string) => {
    try {
      await deleteCompra({
        variables: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting purchase:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const getPurchaseById = (id: string) => {
    return client.query({
      query: GET_COMPRA,
      variables: { id }
    });
  };

  // Enriquecer datos con información mock
  const enrichedCompras = enrichPurchasesData(comprasData?.compras || []);

  // Calcular total de gastos basado en datos enriquecidos
  const totalExpenses = enrichedCompras.reduce((sum, compra) => sum + (compra.total || 0), 0);

  return {
    // Data
    compras: enrichedCompras,
    
    // Totals
    totalExpenses,
    
    // Loading states
    loadingCompras,
    insertingCompra,
    updatingCompra,
    deletingCompra,
    
    // Errors
    errorCompras,
    
    // Functions
    createPurchase,
    editPurchase,
    removePurchase,
    getPurchaseById,
    refetchCompras
  };
}; 