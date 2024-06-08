import fs, { link } from 'fs'
import { Downloader } from '@/lib/yt-dl'

// Test yt downloader module
const GET = async () =>  {
    const downloader = new Downloader( true )
    const links = [ 'https://www.youtube.com/watch?v=Uc7I8QVEV80', 'https://www.youtube.com/watch?v=DTCuNarYhxU' ]
    // const links = [ 'https://www.youtube.com/watch?v=Uc7I8QVEV80' ]
    // const links = [ 'https://www.youtube.com/watch?v=DTCuNarYhxU' ]

    const results = []
    for( const link of links ) {
        try {
            const response = await downloader.downloadSong(link);
            results.push( response )
            
            // console.log(`${resultados.length} de ${links.length}`);
            // console.log(respuesta)
        } catch (error) {
            console.log('Conexión lenta :(... Intenta más tarde');
        }
    }


    // Find type result
    // 0 - Songs with tags
    // 1 - One or mores songs without tags
    // 2 - Another error

    let typeResults = 0;
    for( let i = 0; i < results.length; i++ ) {
        if( typeof results[i].cover === 'number' ) 
            typeResults = 1;
        else {
            // If there is image buffer, get only the buffer
            results[i] = {...results[i], cover: results[i].cover.image.imageBuffer}
        }
    }
    
    console.log(results)
    return Response.json({ typeResults, data: results })
}

const POST = async ( request: Request ) => {
    const { tags, links } = await request.json();
    const downloader = new Downloader( tags ); // Boolean for insert tags
    
    const results = []
    for( const link of links ) {
        try {
            const response = await downloader.downloadSong(link);
            results.push( response )
        } catch (error) {
            console.log('Error en el servidor :(... Intenta más tarde');
        }
    }

    // Find type result
    // 0 - Songs with tags
    // 1 - One or mores songs without tags
    // 2 - Another error

    let typeResults = 0;
    for( let i = 0; i < results.length; i++ ) {
        if( typeof results[i].cover === 'number' ) 
            typeResults = 1;
        else {
            // If there is image buffer, get only the buffer
            results[i] = {...results[i], cover: results[i].cover.image.imageBuffer}
        }
    }
    
    console.log(results)
    return Response.json({ typeResults, tags, newResults: results })
}

export { GET, POST }