<div style="display:flex; justify-content: center; align-items: center; margin-bottom: 20px;">
    <img src="./public/favicon.png" style="width: 150px;">
    <div>
        <p 
            style="font-size: 35px; 
                    font-weight: 500; 
                    text-shadow: 5px -3px 10px rgba(255, 255, 255, 0.5);"
        >
            Convertidor YT-Mp3
        </p>
        <span style="font-style: italic;">Began at Jun, 8 2024 and finished at Sep, 15 2024</span>
    </div>
</div>

[Go to spanish readme](./docs/readmeES.md)

## About
This project is about an Youtube Converter. With this project you can download any song from there, <span style="font-weight: bold"> you want them at the same time</span>.

### Features
+ #### You can download diferents songs at the same time
+ #### Tags: The converter offers you search and insert tags from iTunes API to your downloaded songs
    - Note: There is possible the API can't download tags
+ #### Permanent links: The converter is capable to remind the links that you insert althought you reload the page
+ #### Fast Copy Paste: With a key shortcut, you can paste links in the form without problems.

## Project
### Dependencies
+ ShadCN: Library for the UI and theme of the page
+ Yt-Core: [@distube](https://github.com/distubejs) npm dependency for to do the download 
+ Axios: For to fetch tags and song cover
+ FFMPEG-Static: Simple command list for to do convertion from video to MP3
+ Node-ID3: For to insert tags in the song
+ The module that doing the download and convertion is based in the [@joshunrau](https://github.com/joshunrau/ytdl-mp3) module (ytdl-mp3), adapted for to use it in web app. All credits for him.

### File Structure
Using App directory. Important structure:

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

## What is next?
+ Implement global state to simplify the code and avoid pass functions and state via props
+ Tags Editor in results component
+ Restructuring for the self module to the maintein of it




