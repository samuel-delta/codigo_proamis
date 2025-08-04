#language: pt

Funcionalidade: Inscrição - Campos Obrigatórios

Cenário: CT01 Desligando uma criança
    Dado que eu tenha uma criança válida que deseja desligar
    E procure pela criança cadastrada no menu criança
    E selecionar a criança desejada
    Quando clicar em DESLIGADO 
    Entao o sistema desliga a criança e muda o STATUS DA CRIANÇA para DESLIGADA