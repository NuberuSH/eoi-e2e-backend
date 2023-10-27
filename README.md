# Temperature app

## Descripción

This application allows users to:

- View the temperature of a country in degrees Celsius, Fahrenheit and Kelvin.
- View the temperature of a list of countries.
- Save a new country through an ip.
- Remove a country from the list of countries.

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

## Quality Standards:

### Efiiciency

- In order to have a greater performance, the application will refresh the temperature of the countries periodically instead of refreshing it every time the user enters the application.
- The countries will be sent to the client in a single request and then will be filtered in the client.

### Maintainability

- The code will be written in english.
- The code will be using a linter and a formatter.
- The backend has a domain architecture.
- The frontend will have a component architecture.
- We will modularize the code as much as possible.
- We will use a git flow.

### Portability

- The frontend will be independent of the backend.
- The backend will be independent of the frontend.

## Thoughts of improvement

- More test cases.
- Add typescript.
- Add error handling.
