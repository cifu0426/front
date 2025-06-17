import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USUARIO } from '@/lib/graphql/mutations';
import { useRouter } from 'next/navigation';

interface LoginData {
  nombreusuario: string;
  contrasenia: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    loading: true,
  });

  const [loginMutation] = useMutation(LOGIN_USUARIO);

  // Verificar si hay un token almacenado al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        token,
        loading: false,
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        token: null,
        loading: false,
      });
    }
  }, []);

  // Función para login
  const login = async (loginData: LoginData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      const { data } = await loginMutation({
        variables: {
          nombreusuario: loginData.nombreusuario,
          contrasenia: loginData.contrasenia,
        },
      });

      console.log('Respuesta completa del servidor:', data);
      
      // El token viene directamente como string
      const token = data?.loginUsuario;
      
      console.log('Token extraído:', token);
      console.log('Tipo de token:', typeof token);
      
      if (token && typeof token === 'string' && token.trim() !== '') {
        // Guardar token en localStorage
        localStorage.setItem('token', token);
        
        // Actualizar estado de autenticación
        setAuthState({
          isAuthenticated: true,
          token,
          loading: false,
        });

        // Redirigir al dashboard
        router.push('/dashboard');
        
        return { success: true, token };
      } else {
        throw new Error('No se recibió token del servidor');
      }
    } catch (error: unknown) {
      console.error('Error completo en login:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      
      // Determinar el mensaje de error
      let errorMessage = 'Error desconocido';
      
      // Type guard para errores de Apollo
      if (error && typeof error === 'object') {
        const apolloError = error as {
          graphQLErrors?: Array<{ message: string }>;
          networkError?: {
            result?: { errors?: Array<{ message: string }> };
          };
          message?: string;
        };
        
        // Verificar GraphQL errors
        if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
          errorMessage = apolloError.graphQLErrors[0].message;
          console.error('GraphQL Error:', apolloError.graphQLErrors[0]);
        }
        // Verificar Network errors
        else if (apolloError.networkError) {
          errorMessage = 'Error de conexión con el servidor';
          console.error('Network Error:', apolloError.networkError);
          
          // Si es un error de servidor específico
          if (apolloError.networkError.result && apolloError.networkError.result.errors) {
            errorMessage = apolloError.networkError.result.errors[0]?.message || errorMessage;
          }
        }
        // Verificar si tiene mensaje directo
        else if (apolloError.message) {
          errorMessage = apolloError.message;
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      token: null,
      loading: false,
    });
    router.push('/');
  };

  // Función para verificar si el usuario está autenticado
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Función para obtener el token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Función para decodificar el token JWT (básica)
  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  };

  // Función para obtener información del usuario del token
  const getUserInfo = () => {
    const token = getToken();
    if (token) {
      return decodeToken(token);
    }
    return null;
  };

  return {
    ...authState,
    login,
    logout,
    checkAuth,
    getToken,
    getUserInfo,
  };
}; 