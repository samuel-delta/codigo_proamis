#language: pt

Funcionalidade: Ver inscrições do ano passado
Cenário: CT01 Verificar lista de classificação de um ano em especifico 
    Dado que o usuario deseje ver a lista de classificação do ano passado
    E acesse a LISTA DE CLASSIFICAÇÃO na área de ADMINISTRAÇÃO
    E selecione o ano de 2024
    Quando apetar FILTRAR
    E selecionar o ano
    E selecionar PDF ou EXCEL
    Entao o sistema baixa um PDF ou EXCEL que contém os nomes da classificação do ano escolhido