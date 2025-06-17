import { gql } from '@apollo/client';

// Mutación para login de usuario (devuelve token como string)
export const LOGIN_USUARIO = gql`
  mutation LoginUsuario($nombreusuario: String!, $contrasenia: String!) {
    loginUsuario(nombreusuario: $nombreusuario, contrasenia: $contrasenia)
  }
`;

export const LOGIN_USUARIO_OBJECT = gql`
  mutation LoginUsuario($nombreusuario: String!, $contrasenia: String!) {
    loginUsuario(nombreusuario: $nombreusuario, contrasenia: $contrasenia) {
      token
    }
  }
`;

// Mutación para insertar usuario (para registro)
export const INSERTAR_USUARIO = gql`
  mutation InsertarUsuario($nombreusuario: String!, $contrasenia: String!, $rol: Int!) {
    insertarUsuario(usuarioInput: {
      nombreusuario: $nombreusuario
      contrasenia: $contrasenia
      rol: $rol
    }) {
      id
      nombreusuario
    }
  }
`;

// Mutación para insertar producto
export const INSERTAR_PRODUCTO = gql`
  mutation InsertarProducto($productoInput: ProductoInput!) {
    insertarProducto(productoInput: $productoInput) {
      id
      nombre
      precio
      categoria
    }
  }
`;

// Mutación para insertar venta
export const INSERTAR_VENTA = gql`
  mutation InsertarVenta($ventaInput: VentaInput!) {
    insertarVenta(ventaInput: $ventaInput) {
      id
    }
  }
`;

// Mutación para insertar compra
export const INSERTAR_COMPRA = gql`
  mutation InsertarCompra($compraInput: CompraInput!) {
    insertarCompra(compraInput: $compraInput) {
      id
    }
  }
`;

// Mutaciones para eliminar
export const DELETE_PRODUCTO = gql`
  mutation DeleteProducto($id: ID!) {
    deleteProducto(id: $id)
  }
`;

export const DELETE_VENTA = gql`
  mutation DeleteVenta($id: ID!) {
    deleteVenta(id: $id)
  }
`;

export const DELETE_COMPRA = gql`
  mutation DeleteCompra($id: ID!) {
    deleteCompra(id: $id)
  }
`;

export const DELETE_USUARIO = gql`
  mutation DeleteUsuario($id: ID!) {
    deleteUsuario(id: $id)
  }
`;

// Mutaciones para actualizar
export const UPDATE_PRODUCTO = gql`
  mutation UpdateProducto($id: ID!, $productoInput: ProductoInput!) {
    updateProducto(id: $id, productoInput: $productoInput) {
      id
      nombre
      precio
      categoria
    }
  }
`;

export const UPDATE_VENTA = gql`
  mutation UpdateVenta($id: ID!, $ventaInput: VentaInput!) {
    updateVenta(id: $id, ventaInput: $ventaInput) {
      id
    }
  }
`;

export const UPDATE_COMPRA = gql`
  mutation UpdateCompra($id: ID!, $compraInput: CompraInput!) {
    updateCompra(id: $id, compraInput: $compraInput) {
      id
    }
  }
`;

export const UPDATE_USUARIO = gql`
  mutation UpdateUsuario($id: ID!, $usuarioInput: UsuarioInput!) {
    updateUsuario(id: $id, usuarioInput: $usuarioInput) {
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