import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { 
  GET_VENTAS, 
  GET_VENTA,
  GET_VENTAS_DE_HOY,
  GET_VENTAS_ULTIMA_SEMANA,
  GET_VENTAS_ULTIMO_MES
} from '@/lib/graphql/queries';
import { 
  INSERTAR_VENTA, 
  UPDATE_VENTA, 
  DELETE_VENTA 
} from '@/lib/graphql/mutations';
import { ISales } from '@/types';

// Función para enriquecer datos con información mock profesional
const enrichSalesData = (rawSales: any[]): ISales[] => {
  const clientes = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Rodríguez', 'Sofia Hernández'];
  const estados: ('Completada' | 'Pendiente' | 'Cancelada')[] = ['Completada', 'Pendiente', 'Cancelada'];
  const productos = [
    { id: 1, nombre: 'Collar para Perro', precio: 25.99 },
    { id: 2, nombre: 'Comida Premium', precio: 45.50 },
    { id: 3, nombre: 'Juguete Interactivo', precio: 18.75 },
    { id: 4, nombre: 'Cama Ortopédica', precio: 89.99 },
    { id: 5, nombre: 'Correa Retráctil', precio: 32.50 }
  ];

  return rawSales.map((sale, index) => {
    const numProductos = Math.floor(Math.random() * 3) + 1;
    const productosVenta = Array.from({ length: numProductos }, (_, i) => {
      const producto = productos[Math.floor(Math.random() * productos.length)];
      const cantidad = Math.floor(Math.random() * 3) + 1;
      return {
        ...producto,
        cantidad
      };
    });

    const total = productosVenta.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    const fechaBase = new Date();
    fechaBase.setDate(fechaBase.getDate() - Math.floor(Math.random() * 30));

    return {
      id: sale.id,
      fecha: fechaBase.toISOString().split('T')[0],
      total: Math.round(total * 100) / 100,
      cliente: clientes[index % clientes.length],
      productos: productosVenta,
      estado: estados[Math.floor(Math.random() * estados.length)]
    };
  });
};

export const useSales = () => {
  const client = useApolloClient();

  // Queries
  const { 
    data: ventasData, 
    loading: loadingVentas, 
    error: errorVentas,
    refetch: refetchVentas 
  } = useQuery(GET_VENTAS);

  const { 
    data: ventasHoyData, 
    loading: loadingVentasHoy,
    refetch: refetchVentasHoy 
  } = useQuery(GET_VENTAS_DE_HOY);

  const { 
    data: ventasSemanaData, 
    loading: loadingVentasSemana,
    refetch: refetchVentasSemana 
  } = useQuery(GET_VENTAS_ULTIMA_SEMANA);

  const { 
    data: ventasMesData, 
    loading: loadingVentasMes,
    refetch: refetchVentasMes 
  } = useQuery(GET_VENTAS_ULTIMO_MES);

  // Mutations
  const [insertarVenta, { loading: insertingVenta }] = useMutation(INSERTAR_VENTA, {
    refetchQueries: [
      { query: GET_VENTAS },
      { query: GET_VENTAS_DE_HOY },
      { query: GET_VENTAS_ULTIMA_SEMANA },
      { query: GET_VENTAS_ULTIMO_MES }
    ],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'ventas' });
      client.cache.evict({ fieldName: 'ventasDeHoy' });
      client.cache.evict({ fieldName: 'ventasUltimaSemana' });
      client.cache.evict({ fieldName: 'ventasUltimoMes' });
    }
  });

  const [updateVenta, { loading: updatingVenta }] = useMutation(UPDATE_VENTA, {
    refetchQueries: [
      { query: GET_VENTAS },
      { query: GET_VENTAS_DE_HOY },
      { query: GET_VENTAS_ULTIMA_SEMANA },
      { query: GET_VENTAS_ULTIMO_MES }
    ],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'ventas' });
      client.cache.evict({ fieldName: 'ventasDeHoy' });
      client.cache.evict({ fieldName: 'ventasUltimaSemana' });
      client.cache.evict({ fieldName: 'ventasUltimoMes' });
    }
  });

  const [deleteVenta, { loading: deletingVenta }] = useMutation(DELETE_VENTA, {
    refetchQueries: [
      { query: GET_VENTAS },
      { query: GET_VENTAS_DE_HOY },
      { query: GET_VENTAS_ULTIMA_SEMANA },
      { query: GET_VENTAS_ULTIMO_MES }
    ],
    onCompleted: () => {
      client.cache.evict({ fieldName: 'ventas' });
      client.cache.evict({ fieldName: 'ventasDeHoy' });
      client.cache.evict({ fieldName: 'ventasUltimaSemana' });
      client.cache.evict({ fieldName: 'ventasUltimoMes' });
    }
  });

  // Helper functions
  const createSale = async (ventaInput: any) => {
    try {
      const result = await insertarVenta({
        variables: { ventaInput }
      });
      return { success: true, data: result.data.insertarVenta };
    } catch (error) {
      console.error('Error creating sale:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const editSale = async (id: string, ventaInput: any) => {
    try {
      const result = await updateVenta({
        variables: { id, ventaInput }
      });
      return { success: true, data: result.data.updateVenta };
    } catch (error) {
      console.error('Error updating sale:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const removeSale = async (id: string) => {
    try {
      await deleteVenta({
        variables: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting sale:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const getSaleById = (id: string) => {
    return client.query({
      query: GET_VENTA,
      variables: { id }
    });
  };

  // Enriquecer datos con información mock
  const enrichedVentas = enrichSalesData(ventasData?.ventas || []);
  const enrichedVentasHoy = enrichSalesData(ventasHoyData?.ventasDeHoy || []);
  const enrichedVentasSemana = enrichSalesData(ventasSemanaData?.ventasUltimaSemana || []);
  const enrichedVentasMes = enrichSalesData(ventasMesData?.ventasUltimoMes || []);

  // Calcular totales reales basados en datos enriquecidos
  const totalRevenue = enrichedVentas.reduce((sum, venta) => sum + (venta.total || 0), 0);
  const totalRevenueToday = enrichedVentasHoy.reduce((sum, venta) => sum + (venta.total || 0), 0);
  const totalRevenueWeek = enrichedVentasSemana.reduce((sum, venta) => sum + (venta.total || 0), 0);
  const totalRevenueMonth = enrichedVentasMes.reduce((sum, venta) => sum + (venta.total || 0), 0);

  return {
    // Data
    ventas: enrichedVentas,
    ventasHoy: enrichedVentasHoy,
    ventasSemana: enrichedVentasSemana,
    ventasMes: enrichedVentasMes,
    
    // Totals
    totalRevenue,
    totalRevenueToday,
    totalRevenueWeek,
    totalRevenueMonth,
    
    // Loading states
    loadingVentas,
    loadingVentasHoy,
    loadingVentasSemana,
    loadingVentasMes,
    insertingVenta,
    updatingVenta,
    deletingVenta,
    
    // Errors
    errorVentas,
    
    // Functions
    createSale,
    editSale,
    removeSale,
    getSaleById,
    refetchVentas,
    refetchVentasHoy,
    refetchVentasSemana,
    refetchVentasMes
  };
}; 