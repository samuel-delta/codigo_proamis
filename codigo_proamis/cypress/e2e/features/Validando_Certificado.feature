#language: pt

Funcionalidade: Cadastro - Validando Certificados

Cenário: Validando Certificados
    Dado que o tenha um usuário cadastrado que não tenha validado o certificado 
    E encontrar esse usuario na busca dos cadastros
    E acessar informações do usuario cadastrado
    Quando clicar em Validar Certificado
    Entao o sistema valida e apresenta a mensagem: Certificado validado com sucesso!

