<div style="display:flex; justify-content: center; align-items: center; margin-bottom: 20px;">
    <img src="../public/favicon.png" style="width: 150px;">
    <div>
        <p 
            style="font-size: 35px; 
                    font-weight: 500; 
                    text-shadow: 5px -3px 10px rgba(255, 255, 255, 0.5);"
        >
            Convertidor YT-Mp3
        </p>
        <span style="font-style: italic;">Comenzó 8 de Junio del 2024 y <br>finalizado el 15 de Septiembre del 2024</span>
    </div>
</div>

## Sobre el proyecto
Este proyecto es un convertidor de Youtube a Mp3. Con este convertidor tu puedes <span style="font-weight: bold">descargar las canciones que quieras a la vez</span>.

### Características
+ #### El convertidor te permite insertar la cantidad de links que quieras
+ #### Etiquetas: El convertidor te ofrece la opción de buscar e insertar las etiquetas de las canciones descargadas con la API de iTunes
    - Nota: Es posible que el buscador no llege a tener resultados
+ #### Links permanentes: El convertidor recuerda los links insertados aunque recargues la página
+ #### Copiar y pegar rápido: Con un atajo de teclado, es posible insertar links de forma rápida respetando la forma de insertar duchos links

## Project
### Dependencies
+ ShadCN: Librería para la IU y el modo claro/oscuro
+ Yt-Core: Dependencia de [@distube](https://github.com/distubejs) para realizar la descarga 
+ Axios: Para el fetch de los datos de las etiquetas
+ FFMPEG-Static: Terminal de comandos para la transcodificación de video a audio
+ Node-ID3: Para la inserción de etiquetas
+ El módulo que realiza la descarga, conversión y buscar etiquetas está basado en el de [@joshunrau](https://github.com/joshunrau/ytdl-mp3), adaptado para su uso en una aplicación web de forma básica

### File Structure
El proyecto utiliza NextJs v14 con el directorio App, esta es la estructura importante del proyecto:

```plaintext
|- docs
|- public
|- src
|   |- app
|       |- api
|       |- globals.css
|       |- layotu.tsx
|       |- page.tsx
|   |- components
|       |- results
|           |- CardResults.tsx
|           |- TableResults.tsx
|       |- ui (ShadCN components)
|       |- FormLink.tsx
|       |- Header.tsx
|       |- Loader.tsx
|       |- Presentation.tsx
|       |- Results.tsx
|       |- ThemeProvider.tsx (ShadCN Themes)
|   |- lib
|       |- utils.ts (ShadCN file)
|       |- yt-dl.js
|   |- services
|   |- ClientService.tsx
```

## ¿Qué sigue? 
+ Implementación de estado global para evitar pasar funciones o datos mediante props
+ Editor de etiquetas en el componente de resultados de la descarga
+ Reestructura del módulo de descarga para un mejor mantenimiento


