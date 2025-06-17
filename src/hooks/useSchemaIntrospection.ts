import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

// Query de introspección completa para descubrir el schema
const FULL_INTROSPECTION = gql`
  query FullIntrospection {
    __schema {
      queryType { name }
      mutationType { name }
      subscriptionType { name }
      types {
        kind
        name
        description
        fields(includeDeprecated: true) {
          name
          description
          type {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
          args {
            name
            type {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
        inputFields {
          name
          type {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
        possibleTypes {
          kind
          name
        }
        enumValues {
          name
          description
        }
      }
    }
  }
`;

export const useSchemaIntrospection = () => {
  const { data, loading, error } = useQuery(FULL_INTROSPECTION, {
    errorPolicy: 'all'
  });

  // Función para obtener los campos disponibles de un tipo específico
  const getTypeFields = (typeName: string) => {
    if (!data || !data.__schema || !data.__schema.types) return [];
    
    const type = data.__schema.types.find((t: any) => t.name === typeName);
    return type?.fields || [];
  };

  // Función para verificar si un campo existe en un tipo
  const hasField = (typeName: string, fieldName: string) => {
    const fields = getTypeFields(typeName);
    return fields.some((field: any) => field.name === fieldName);
  };

  // Función para obtener todos los tipos disponibles
  const getAllTypes = () => {
    if (!data || !data.__schema || !data.__schema.types) return [];
    return data.__schema.types.filter((type: any) => 
      !type.name.startsWith('__') && // Filtrar tipos de introspección
      type.kind === 'OBJECT'
    );
  };

  // Función para obtener información específica de un tipo
  const getTypeInfo = (typeName: string) => {
    if (!data || !data.__schema || !data.__schema.types) return null;
    return data.__schema.types.find((t: any) => t.name === typeName);
  };

  return {
    schemaData: data,
    loading,
    error,
    getTypeFields,
    hasField,
    getAllTypes,
    getTypeInfo
  };
}; 