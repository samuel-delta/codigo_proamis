#language: pt

Funcionalidade: Validando Classificação

Cenário: CT01: Validando Classificação
    Dado que o usuário deseje validar um cadastro como Classificado
    E tenha um cadastro válido para classificar
    Quando entrar na área de CLASSIFIÇÃO
    E escolher o cadastro e clicar no botão ANALISAR CADASTRO
    E escolher a opção CLASSIFICADO
    E clicar no botão SALVAR
    Entao o sistema muda o status daquele cadastro para CLASSIFICADO