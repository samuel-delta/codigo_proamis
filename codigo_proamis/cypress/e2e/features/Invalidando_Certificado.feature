#language: pt

Funcionalidade: Cadastro - Invalidando Certificados

Cenário: Validando Certificados
    Dado que o tenha um usuário cadastrado que não tenha validado o certificado - IV
    E encontrar esse usuario na busca dos cadastros - IV
    E acessar informações do usuario cadastrado - IV
    Quando clicar em invalidar Certificado - IV
    Entao o sistema invalida e apresenta a mensagem: Certificado validado com sucesso! - IV

