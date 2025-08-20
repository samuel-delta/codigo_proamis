#language: pt

Funcionalidade: Cadastro - Validando Certificados

Cenário: Validando Certificados
    Dado que o tenha um usuário cadastrado que não tenha validado o certificado - VC
    E encontrar esse usuario na busca dos cadastros - VC
    E acessar informações do usuario cadastrado - VC
    Quando clicar em Validar Certificado - VC
    Entao o sistema valida e apresenta a mensagem: Certificado validado com sucesso! - VC

