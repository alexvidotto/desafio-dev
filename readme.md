Desafio Desenvolvedor - Concluído
======================================

Para rodar a aplicação
* clone o projeto
* instale as dependências via _npm install_
* inicie o aplicação via _npm start_.
* ou veja a suite de testes em ação via _npm test_

## Notas:

- A suite de testes pode ser observada na pasta /test.
- O express foi configurado essencialmente para expor API.

Para simular o desafio

```sh

curl -H "Content-Type: application/json" -X POST -d '{"addresses":["R. Vírgem, 450 - Jardim Satelite, São José dos Campos, SP","Alameda Joaquim Eugênio de Lima, 1393 - Jardins, São Paulo, SP","R. Apeninos, 138 - Jardim Satelite, São José dos Campos - SP"],"fuelPrice":4,"kmL":10,"vehicle":"carWithFourSimpleAxles"}' http://localhost:3000/api/routes/calculate

```

BODY:
```json
{
  "addresses": [
  	"R. Vírgem, 450 - Jardim Satelite, São José dos Campos, SP",
  	"Alameda Joaquim Eugênio de Lima, 1393 - Jardins, São Paulo, SP",
  	"R. Apeninos, 138 - Jardim Satelite, São José dos Campos - SP"
  ],  
  "fuelPrice": 4,
  "kmL"      : 10,
  "vehicle"  : "carWithFourSimpleAxles"
}
```

RESPONSE:

```json
{
  "code": 200,
  "status": "OK",
  "result": {
    "distance": 192035.4,
    "fuelPrice": 76814.16,
    "duration": 9611,
    "tolls": {
      "qtt": 6,
      "price": 51.599999999999994
    },
    "settings": {
      "fuelPrice": 4,
      "kmL": 10,
      "vehicle": "carWithFourSimpleAxles",
      "addresses": [
        "R. Vírgem, 450 - Jardim Satelite, São José dos Campos, SP",
        "Alameda Joaquim Eugênio de Lima, 1393 - Jardins, São Paulo, SP",
        "R. Apeninos, 138 - Jardim Satelite, São José dos Campos - SP"
      ]
    }
  }
}
```

## Alguns detalhes do projeto

#### /app.js


Inicializa aplicação com as variáveis de ambiente necessárias (/.env), registra dependências (DI) de módulos da aplicação (e.g. loggers, apis, configurations) e configura respostas padrões do serviço.

#### /router/**.js

APIs da aplicação


#### /modules/*

O backend da aplicação está separado em módulos. E.g. as APIs expostas fazem uso dos seus respectivos módulos em /modules/api/*. que por sua vez, _são dependentes de módulos injetados (DI) do /modules/core/api_ da aplicação. Toda injeção de dependencia é feita nos módulos */factory/, note.

#### API design

As respostas das APIS estão normalizadas nos seguintes status:

```json
{
  "code": 200,
  "status": "OK",
  "result": []
}

{
  "code": 500,
  "status": "ERROR"
}
```

Note em /modules/core/response a estratégia utilizada.
