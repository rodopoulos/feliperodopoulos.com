---
title: "Algoritmos Randômicos e o Hiring Problem"
linktitle: "post"
slug: "algoritmos-randomicos-e-hiring-problem"
description:
date:
lastmod:
menu: 'main'
keywords: hiring problem, algoritmos randômicos, permutações, maior valor
---

No livro do Cormen, temos o seguinte problema: você quer preencher um cargo na sua empresa e para isso pede a ajuda de uma agência de empregos. A agência irá te ofertar cadidatos, os quais possuem níveis de qualidade, que vão de 1 à $n$. Ou seja, existe um candidato pior, escalando até o melhor candidato.

Você irá entrevistar um candidato a um custo $c_e$ cada. Caso você queira contratar-lo, o custo de contratação é $c_c$. A cada entrevista, você pode concluir que o entrevistado é mais qualificado para a vaga que o contratado atual e, dessa forma, demitir o seu funcionário atual e contratar o entrevistado. Dado que a agência tem uma lista de oferta de $n$ funcionários, um algoritmo simples para resolver este problema é o seguinte:

```
Entrevista(n):
  atual = 0
  PARA 1 até n:
    entrevistar candidato i
    SE candidato i é melhor que atual
    	contrate candidato i
    	atual = candidato i
    FIM-SE
  FIM-PARA
FIM
```

Como calculamos o custo deste algorítmo? Bom, sabendo que iremos entrevistar $n$ candidatos a um custo $c_e$ e supondo que contratamos $m$ candidatos a um custo $c_c$, então o custo total deste processo é $O(c_e n + c_c m)$.  Perceba que sempre iremos entrevistar todos os candidatos, então este custo sempre existirá.

No melhor caso, contratamos um candidato e nunca mais iremos dispensá-lo: logo, o melhor caso está em $O(c_e n + c_c)$. E o pior caso, qual seria? Quando contratamos todos os possíveis candidatos! Nesse caso, $m=n$ e o custo seria de $O(c_e n + c_c n) = O((c_e + c_c)\ n)$. Finalmente, a pergunta clássica: qual é o caso médio, ou seja, qual será o custo médio deste processo?

### Um problema mais simples

O problema anterior é chamado de *hiring problem*. Se você percebeu, ele é uma versão afrescalhada de um problema muito mais simples: definir o maior número dentro de um vetor de inteiros. A diferença é que estamos colocando custos na hora da comparação e na hora da troca de valor.

Suponha um vetor $A[1..n]$, contendo uma permutação de $n$ números, onde queremos encontrar o maior valor dentro deste vetor. Projetamos um algoritmo simples para isto:

```
ArrayMax (A, n):
  max = 0
  for 1 to n do:
	if A[i] > max
	  max = A[i]
  return max
```

A linha 5, onde ocorre a associação do valor máximo, será executada quantas vezes? O melhor caso é simples, apenas uma troca. No pior caso, quando há trocas ao longo de todo o percorrimento do vetor, $n$ vezes, logo o custo é $O(n)$. Mas, novamente, no caso médio, quantas vezes a linha é executada?

Dito isto, podemos enunciar o problema:

> Dado um vetor $A$ com $n$ inteiros, determine o custo médio de encontrar o maior elemento deste vetor.

## Discussão

Para entender o custo do caso médio, temos que entender quais as possíveis entradas que temos. Em ambos os problemas temos uma **relação de ordem**, ou seja, existe uma relação de menor para o maior entre os elementos, de modo que, no nosso caso, existe o maior elemento. Dessa forma, o caso médio se baseia na definição de quantas posições nosso maior elemento pode estar, o que basicamente é entender quantas permutações possíveis existem para a entrada.

Antes de já partir para a matemática, vamos pensar no nosso algoritmo. Para que possamos admitir este modelo matemático de análise probabilística, temos que **garantir que nossa entrada esteja seguindo o modelo**. Lembre-se: não sabemos como nossa entrada vai chegar e, portanto, temos apenas uma confiança de que ela venha randomizada. Ter esperança que a entrada irá vir de acordo com nosso modelo é responder a pergunta "Qual o caso médio do seu algoritmo?" com um "Depende". Não queremos isso.

Precisamos estabelecer algum controle sobre esta entrada, para que possamos fazer uma análise (e correção!) consisa do nosso algorítmo. Antes de executar a busca, vamos randomizar a entrada, para garantir que ela esteja seguindo o modelo probabilístico aleatório, nos dando garantia de analisar as possibilidades sem se basear em crenças!

### Análise Probabilística

Aqui vamos trabalhar com alguns conceitos de probabilidade em variáveis aleatórias discretas, onde discreto quer dizer "sobre um conjunto de valores contáveis", que no nosso caso é $n$. Vamos usar também um **indicador de variável aleatória** para um evento $A$ qualquer, onde:
$$
X_A = \begin{cases}
0 & \text{, se $A$ não acontece} \\
1  & \text{, se $A$ acontence}
\end{cases}
$$
Dado que $A$ pode ocorrer ou não, temos uma probabilidade igual dele acontecer ou não. Logo, $Pr\{A\ \text{ocorrer}\} = Pr\{A\ \text{não ocorrer}\} = \frac{1}{2}$, onde $Pr$ é a probabilidade do evento. Agora, vamos usar outro conceito chamado **esperança**: o valor médio que se espera de um evento, a medida que ele ocorre. Para cálcular-lo basta somar as probabilidades dos eventos com seus respectivos valores. No caso do nosso indicador $X_A$, temos que:
$$
\begin{split}
E[X_A] & =  0 \cdot Pr\{A\ \text{não ocorre}\} + 1 \cdot Pr\{A\ \text{ocorre}\} \\
& = 0 \cdot \frac{1}{2} + 1 \cdot \frac{1}{2} \\
& = \frac{1}{2}
\end{split}
$$
Observe que a esperança de um evento é igual a probabilidade dele acontecer, ou seja, $E[X_A] = Pr\{A\ \text{ocorre}\}$! Neste exemplo, isto acaba sendo óbvio, pois só temos duas possibilidades: ou $A$ acontece ou $A$ não acontece. Isso está relacionado ao nosso **espaço amostral** $S$, onde, neste exemplo, $S = \{A\ \text{ocorre}, A\ \text{não ocorre}\}$ e só temos duas possibilidades e fica fácil derivar a probabilidade de $\frac{1}{2}$. Observe então que temos um lema!

> **Lema:** a esperança um evento acontecer é igual a probabilidade dele acontecer

Dito isso, vamos voltar ao nosso problema inicial. Perceba que aqui, o espaço amostral é diferente: $S = \{$candidato 1 é contratado, candidato 2 é contradado, ..., candidato $n$ é contratado$\}$ (para facilitar, vamos escrever $S = \{1,2, ..., n\})$. Ao invés de começar por um indicador de variável aletória para o problema geral, vamos dividir o problema e definir a variável aleatória $X_i$:
$$
X_i = \begin{cases}
0 & \text{, se o candidato $i$ não é contratado} \\
1  & \text{, se o candidato $i$ é contratado}
\end{cases}
$$
Logo, temos que $E[X_i]$, a esperança do $i$-ésimo candidato ser contratado é justamente igual a probabilidade dele ser contratado ou não. Então vamos focar nossa discussão aqui. Para que o $i$-ésimo candidato seja contratado, ele tem que ser melhor que os $i-1$ candidatos anteriores. Como assumimos que eles estão em ordem aleatória, então cada um destes $i$ candidatos tem a mesma probabilidade de ser o melhor, logo $Pr\{$candidato $i$ é contratdo$\} = \frac{1}{i}$.

Ok, temos a esperança de um $i$-ésimo candidato ser o melhor, mas e o problema geral? Vamos somar tudo! Definimos $X = X_1 + X_2 + ... + X_n$. Agora, podemos obter a esperança geral de todo o processo de saber quem é o melhor candidato ao longo dos $n$ candidatos:
$$
\begin{split}
E[X] & = E[X_1] + E[X_2]  + ... + E[X_i] \\
& = \sum_{i=1}^{n} E[X_i] \\
& = \sum_{i=1}^{n} \frac{1}{i} \\
& = ln\ n
\end{split}
$$
Finalmente, temos o nosso resultado: quando entrevistamos $n$ pessoas, vamos contratar, em média, $ln\ n$ pessoas.

## Solução

A solução para este problema é bem simples. Seguimos com o mesmo modelo do nosso algoritmo anterior, mas antes, randomizamos a entrada. Vamos utilizar o algoritmo de achar o maior valor no vetor, já que ele tem mais utilidade:

```
ArrayMax (A, n):
  Randomize(A)
  max = 0
  for 1 to n do:
	if A[i] > max
	  max = A[i]
  return max
end
```

Agora o que a função `randomize` faz? Como podemos randomizar de um modo eficiente? O livro do Cormen, apresenta uma discussão sobre este tópico, mas não vou me delongar sobre ela. Apenas vou mostrar o algoritmo e uma breve discussão sobre ele:

```
Randomize(A):
  n = A.length
  for 1 to n do:
    swap A[i] with A[Random(i + 1, n)]
end
```

A função `Random(i,j)` irá escolher um número de forma randômica entre $i$ e $j$ e retorná-lo. Lembre que o modelo computacional real, número randômicos não existem, apenas o pseudo-randômico.
