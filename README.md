# Temperature app

## Descripción

This application allows users to:

- View the temperature of a country in degrees Celsius, Fahrenheit and Kelvin.
- View the temperature of a list of countries.
- Save a new country through an ip.
- Remove a country from the list of countries.

## e2e test cases

1. A user must be able to view the temperature of a country in degrees Celsius, Fahrenheit and Kelvin.
2. A user must be able to see the temperature of a list of countries.
3. A user must be able to save a new country through an ip.
4. A user must be able to remove a country from the list of countries.

## API REST

### GET /country

#### Request

```json
[
  {
    "id": "string",
    "name": "string",
    "temperature": "number", // celsius
    "ip": "string"
  }
]
```

### POST /country

#### Request

```json
{
  "ip": "string"
}
```

### DELETE /country/:id

#### Request

```json
{
  "id": "string"
}
```

## DB

### Country

```json
{
  "id": "string",
  "name": "string",
  "temperature": "number", // celsius
  "ip": "string"
}
```
