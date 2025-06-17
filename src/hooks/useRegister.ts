import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { INSERTAR_USUARIO } from '@/lib/graphql/mutations';
import { useRouter } from 'next/navigation';

interface RegisterData {
  nombreusuario: string;
  contrasenia: string;
  rol?: number;
}

interface RegisterState {
  loading: boolean;
  error: string | null;
}

export const useRegister = () => {
  const router = useRouter();
  const [registerState, setRegisterState] = useState<RegisterState>({
    loading: false,
    error: null,
  });

  const [insertarUsuarioMutation] = useMutation(INSERTAR_USUARIO);

  const register = async (registerData: RegisterData) => {
    try {
      setRegisterState({ loading: true, error: null });
      
      const variables = {
        nombreusuario: registerData.nombreusuario,
        contrasenia: registerData.contrasenia,
        rol: registerData.rol || 1, // Default rol: 1 = USER, 2 = ADMIN
      };

      console.log('Enviando variables de registro:', variables);

      const { data } = await insertarUsuarioMutation({
        variables,
      });

      console.log('Respuesta completa del registro:', data);
      console.log('Usuario creado:', data?.insertarUsuario);
      
      if (data?.insertarUsuario) {
        // Usuario creado exitosamente
        setRegisterState({ loading: false, error: null });
        
        // Redirigir al login
        router.push('/');
        
        return { success: true, user: data.insertarUsuario };
      } else {
        throw new Error('No se pudo crear el usuario');
      }
    } catch (error: unknown) {
      console.error('Error completo en registro:', error);
      setRegisterState({ loading: false, error: 'Error al registrar usuario' });
      
      // Determinar el mensaje de error
      let errorMessage = 'Error desconocido al registrar';
      
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
        }
        // Verificar Network errors
        else if (apolloError.networkError) {
          errorMessage = 'Error de conexión con el servidor';
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

  return {
    ...registerState,
    register,
  };
}; 