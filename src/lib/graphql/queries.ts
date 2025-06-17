import { gql } from '@apollo/client';

// Query de introspección para verificar el schema
export const INTROSPECT_SCHEMA = gql`
  query IntrospectSchema {
    __schema {
      types {
        name
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  }
`;

// Query para obtener todos los productos
export const GET_PRODUCTOS = gql`
  query GetProductos {
    productos {
      id
      nombre
      precio
      categoria
    }
  }
`;

// Query para obtener un producto específico
export const GET_PRODUCTO = gql`
  query GetProducto($id: ID!) {
    producto(id: $id) {
      id
      nombre
      precio
      categoria
    }
  }
`;

// Query para obtener todas las compras
export const GET_COMPRAS = gql`
  query GetCompras {
    compras {
      id
    }
  }
`;

// Query para obtener una compra específica
export const GET_COMPRA = gql`
  query GetCompra($id: ID!) {
    compra(id: $id) {
      id
    }
  }
`;

// Query para obtener todas las ventas
export const GET_VENTAS = gql`
  query GetVentas {
    ventas {
      id
    }
  }
`;

// Query para obtener una venta específica
export const GET_VENTA = gql`
  query GetVenta($id: ID!) {
    venta(id: $id) {
      id
    }
  }
`;

// Query para obtener todos los usuarios
export const GET_USUARIOS = gql`
  query GetUsuarios {
    usuarios {
      id
      nombreusuario
      contrasenia
      rol {
        id
        nombre
      }
    }
  }
`;

// Query para obtener un usuario específico
export const GET_USUARIO = gql`
  query GetUsuario($id: ID!) {
    usuario(id: $id) {
      id
      nombreusuario
      contrasenia
      rol {
        id
        nombre
      }
    }
  }
`;

// Query para obtener ventas de hoy
export const GET_VENTAS_DE_HOY = gql`
  query GetVentasDeHoy {
    ventasDeHoy {
      id
    }
  }
`;

// Query para obtener ventas de la última semana
export const GET_VENTAS_ULTIMA_SEMANA = gql`
  query GetVentasUltimaSemana {
    ventasUltimaSemana {
      id
    }
  }
`;

// Query para obtener ventas del último mes
export const GET_VENTAS_ULTIMO_MES = gql`
  query GetVentasUltimoMes {
    ventasUltimoMes {
      id
    }
  }
`;

// Query para obtener los productos más vendidos
export const GET_TOP_PRODUCTOS_MAS_VENDIDOS = gql`
  query GetTopProductoMasVendidos {
    topProductoMasVendidos {
      id
      nombre
      precio
      categoria
    }
  }
`; 