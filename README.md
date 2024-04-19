# desafio-vertical-logistica

## Objetivo

A finalidade desse projeto é processar arquivos de um sistema legado possui uma estrutura em que cada linha representa uma parte de um
pedido.

Após processar e salvar os arquivos é possível buscar todos os pedidos, filtrar por Id do pedido e por range de datas.

## Pré Requisitos

![Node](https://img.shields.io/badge/Node-19.7.0-brightgreen)

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)


## Setup do Projeto

``` 
npm install
# OR
yarn install
```

## Envs

O projeto por padrão se não encontrar um arquivo .env irá rodar na Porta **8000**.

Rodando localmente o endereço será:

```http
localhost:8000/
```

Para configurar a porta, basta criar o arquivo .env na raiz do projeto e configurá-lo com as envs necessárias. No projeto existe o arquivo .***env.example*** para exemplificar como inserir as Envs necessárias.

## Compilar para desenvolvimento
```
npm start
```

## Rodar ou parar banco de dados
```
docker compose up 
docker compose down
```

## Rodar testes
```
npm test
```


## Documentação da API

### Realiza upload do arquivo
```http
  POST /process-file
```
| Tipo  | Body Key       | Value                                   |
| :---------- | :--------- | :------------------------------------------ |
| `form-data`      | `data` | Arquivo .txt |

#### Retorna todos os pedidos

```http
  GET /orders/
```

#### Retorna um pelo id do pedido

```http
  GET /orders/id/:id
```

#### Retorna pelo intervalo de data de compra (data início e fim)
```http
  GET /orders/range
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `startDate`      | `string` | **Obrigatório**. Data início |
| `endDate`      | `string` | **Obrigatório**. Data fim |
