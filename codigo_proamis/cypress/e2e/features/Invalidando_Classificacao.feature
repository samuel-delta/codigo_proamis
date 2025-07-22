#language: pt

Funcionalidade: Invalidando Classificação

Cenário: CT01: Invalidando Classificação
    Dado que o usuário deseje validar um cadastro como Classificado CT01
    E tenha um cadastro válido para classificar CT01 
    Quando entrar na área de CLASSIFIÇÃO CT01
    E escolher o cadastro e clicar no botão ANALISAR CADASTRO CT01
    E escolher a opção DESCLASSIFICADO CT01
    E clicar no botão SALVAR CT01
    Entao o sistema muda o status daquele cadastro para DESCLASSIFICADO CT01