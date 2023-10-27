# Temperature app

## Descripción

Esta aplicación permite a los usuarios ver la temperatura de una lista de paises. Además, permite a los usuarios votar si les parece correcta la temperatura de un país y dejar un comentario.
Nuestro producto es una interfaz grafica que hace uso de una API REST privada para obtener la información de los paises y los votos de los usuarios.

## e2e test cases

1. Un usuario debe poder votar si le parece correcta la temperatura de un país
2. Un usuario debe poder votar si le parece correcta la temperatura de un país y dejar un comentario
3. Un usuario debe poder leer los votos de un país
4. Un usuario debe poder leer los votos de un país y ver los comentarios

## API REST

### GET /temperature

Devuelve la temperatura de un país recibiendo la ip como header.

### GET /votes/:country

Devuelve los votos de un país.

{
"votes": 0,
"comments": []
}

### POST /votes/:country

Permite votar un país. Recibe un body con el siguiente formato:

{
"vote": true,
"comment": "string"
}

## DB

### Countries

```json
{
  "slug": "string",
  "votes": 0,
  "comments": []
}
```

---

## Post Country
