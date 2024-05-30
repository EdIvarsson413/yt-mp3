import fs from 'fs'
import { Downloader } from '@/lib/yt-dl'

// Test yt downloader module
const GET = async () =>  {
    const descarga = new Downloader( true )
    const links = [ 'https://www.youtube.com/watch?v=Uc7I8QVEV80', 'https://www.youtube.com/watch?v=DTCuNarYhxU' ]
    // const links = [ 'https://www.youtube.com/watch?v=Uc7I8QVEV80' ]
    // const links = [ 'https://www.youtube.com/watch?v=DTCuNarYhxU' ]

    const resultados = []
    for( const link of links ) {
        try {
            const respuesta = await descarga.downloadSong(link);
            resultados.push( respuesta )
            
            console.log(`${resultados.length} de ${links.length}`)
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(resultados)
    if( resultados.length > 0) 
        for (const res of resultados) {
                const nombre = res.fileName + ".mp3"; const audioBuffer = Buffer.from( res.buffer, 'binary' )
                fs.writeFile( nombre, audioBuffer, ( error ) => { console.log( error ? 'Error': `${nombre} creado` ) })
            }
    
    return Response.json(resultados.map( res => res.songTitle))
}

const POST = () => {

}

export { GET, POST }