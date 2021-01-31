export const Messages = {
    TokenInvalido: 'Token inválido',
    NoExisteToken: 'Usuario no autorizado, no existe token en la petición',
    NoExisteElUsuarioEnLaDb: (userInfo: string): string => (`No existe el usuario ${userInfo} en la db`),
    UsuarioNoAutorizado: (url: string): string => (`Usuario no autorizado para la url: ${url}`)
}