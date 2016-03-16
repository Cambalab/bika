# bika
Aplicación híbrida para encontrar y reseñar bicicleterías.

## Instalación

1. Instalar la última versión *beta* de Ionic CLI y cordova:
    ```sh
    npm install -g ionic@beta
    npm install -g cordova
    ```
    or
    ```sh
    sudo npm install -g ionic@beta
    sudo npm install -g cordova
    ```

1. Clonar repo
    ```sh
    git clone https://github.com/Cambalab/bika.git
    ```

1. Ir al directorio bika
    ```sh
    cd bika
    ```

1. Instalar dependencias
    ```sh
    npm install
    ```

1. Actualizar estado de app Ionic (descarga plugins e incluye plataforma por defecto android)
    ```sh
    ionic state restore
    ```

## Correr app

1. En browser con livereload http://localhost:8100
    ```sh
    ionic serve
    ```

1. En emulador
    ```sh
    ionic emulate android
    ```

1. En Móvil
    ```sh
    ionic run android
    ```

## Construir app

```sh
    ionic build android
```

## Correr Backend/Server de pruebas

```sh
    cd frontend
    node server
```


## Contribuir

Por favor leer [Guía de contribuciones](./CONTRIBUTING.md) para más detalles
