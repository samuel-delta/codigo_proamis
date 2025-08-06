#language: pt

Funcionalidade: Inscrição - Campos Obrigatórios

Cenário: CT01 Desligando uma criança
    Dado que eu tenha uma criança válida que deseja desligar
    E procure pela criança cadastrada no menu criança
    E selecionar a criança desejada
    Quando clicar em DESLIGADO 
    Entao o sistema desliga a criança e muda o STATUS DA CRIANÇA para DESLIGADA

Cenário: CT02 Colocando uma criança como desistente
    Dado que eu tenha uma criança válida que deseja colocar como desistente
    E procure pela criança cadastrada no menu criança CT02
    E selecionar a criança desejada CT02
    Quando clicar em DESISTENTE CT02
    Entao o sistema desliga a criança e muda o STATUS DA CRIANÇA para DESISTENTE CT02

Cenário: CT03 Matriculando uma criança
    Dado que eu tenha uma criança válida que deseja matricular
    E procure pela criança cadastrada no menu criança CT03
    E selecionar a criança desejada CT03
    Quando clicar em MATRICULADO CT03
    Entao o sistema desliga a criança e muda o STATUS DA CRIANÇA para MATRICULADO CT03