/**
  * Action types
  */

// Posso usar enum para definir tipos que serão usados. Daí não preciso utilizar constantes.
export enum RepositoriesTypes {
  'LOAD_REQUEST'='@repositories/LOAD_REQUEST',
  'LOAD_SUCCESS'='@repositories/LOAD_SUCCESS',
  'LOAD_FAILURE'='@repositories/LOAD_FAILURE',
}

/**
  * Data types, formato da informação que vai estar no meu reducer
  */

export interface Repository {
  id: number,
  name: string
}

/**
  * State type, qual vai ser o formato do meu estado que vou armazenar por esse meu reducer
  * Colocar readonly para nunca poder ser alteradas as informações
  */

export interface RepositoriesState {
  readonly data: Repository[],
  readonly loading: boolean,
  readonly error: boolean
}
