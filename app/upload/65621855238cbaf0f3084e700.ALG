  algoritmo "semnome"
 var
    nome: vetor[1..20] de caractere
    notas: vetor[1..10] de real
    soma: real
    i: inteiro


inicio
    Escreval("-------------------------------")
    Escreval("          MERCEARIA            ")
    Escreval("-------------------------------")
    Para i de 1 ate 20 faca
        Escreval
        Escreval
        Escreva("Nome do cliente: ")
        Leia(nome[i])
             Para i de 1 ate 10 faca
                  Escreva("Informe o ", i, "° nota: ")
                  Leia(notas[i])
                  soma <- soma + notas[i]
             Fimpara
             Escreval
             Escreva("=> O valor total das notas foi: ", soma)
    Fimpara

fimalgoritmo
      