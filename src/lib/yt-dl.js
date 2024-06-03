// #region Resources
var __async = ( __this, __arguments, generator ) => {
    return new Promise((resolve, reject) => {
        var fulfilled = ( value ) => {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };

        var rejected = ( value ) => {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };

        var step = ( x ) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);

        step((generator = generator.apply(__this, __arguments)).next());
    });
};

var YTMp3Error = class extends Error {
    constructor( message, options = null ) {
        super( message, options );
        this.name = 'YTMp3Error';
    }
}

function removeChars( s ) {
    return s.replace(/\s*[([].*?[)\]]\s*/g, "");
}

// #region Tags
import axios from 'axios'
var SearchTags = class {
    constructor( songTitle ) {
        this.cleanTitle = removeChars( songTitle )
        this.url = new URL( "https://itunes.apple.com/search?" )
        this.url.searchParams.set( "media", "music" );
        this.url.searchParams.set( "term", this.cleanTitle );
    }

    // Metodos
    search() {
        return __async( this, null, function* () {
            // The searching can return one o more results
            const tags = yield this.fetchTags();

            if( typeof tags === 'string' ) return tags

            // Modify zoom of song cover
            const result = tags[0];
            const albumLink = result.artworkUrl100.replace( '100x100bb.jpg', '1000x1000bb.jpg' );

            // Crear buffer de la portada
            const coverBuffer = yield this.fetchCover( albumLink );

            // Retornar la información
            return {
                title: result.trackName,
                artist: result.artistName,
                trackNumber: result.trackNumber,
                genre: result.primaryGenreName,
                image: {
                    mime: "image/png",
                    type: {
                        id: 3,
                        name: "front cover"
                    },
                    description: "Album Art",
                    imageBuffer: coverBuffer
                }
            }
        })
    }

    fetchTags() {
        return __async( this, null, function* () {
            const response = yield axios( this.url.href ).catch( (error) => {
                // console.log(error.response)
            })

            // If there results
            if( response.data.resultCount === 0 ) return 'No Hay Etiquetas Disponibles'
            
            return response.data.results
        })
    }

    fetchCover( coverUrl ) {
        return __async( this, null, function* () {
            return axios( coverUrl, { responseType: 'arraybuffer' })
                .then( coverBuffer => Buffer.from( coverBuffer.data, 'binary' )) // Return image bytes
                .catch( error => {
                    throw new YTMp3Error( 'Falló la descarga de portada, link\n: ' + coverUrl );
                })
        })
    }
}

// #region Converter
import ffmpeg from 'fluent-ffmpeg'
import { PassThrough } from 'stream'
var Converter = class {
    constructor() {}

    // Do the convertion (must return a audio buffer)
    convert( videoBuffer ) {
        return __async(this, null, function* () {
            return new Promise((resolve, reject) => {
                // Validate if ffmpeg is instaled in project
                if( 'node_modules/ffmpeg-static/ffmpeg.exe' ) {
                    // Do the convertion of video stream to mp3 buffer
                    const outputStream = new PassThrough();
                    const chunks = [];

                    outputStream.on('data', chunk => chunks.push(chunk));
                    outputStream.on('end', () => resolve(Buffer.concat(chunks)));
                    outputStream.on('error', reject);

                    ffmpeg( videoBuffer )
                        .setFfmpegPath('node_modules/ffmpeg-static/ffmpeg.exe')
                        .audioCodec('libmp3lame')
                        .audioBitrate('192k')
                        .outputOptions('-threads', '0')
                        .format('mp3')
                        .pipe(outputStream, { end: true });
                } else 
                    console.log( 'Convertidor No Disponible' )
            });
        });
    }
}

// #region Downloader
import ytdl from 'ytdl-core'
import NodeID3 from 'node-id3'
var Downloader = class {
    constructor( searchTags ) {
        this.insertTags = Boolean( searchTags );
    }

    // Doing the opeation
    downloadSong( ytUrl ) {
        return __async( this, null, function*() {
            // Fetch information from YT API
            const videoInfo = yield ytdl.getInfo(ytUrl).catch((error) => {
                throw new YTMp3Error(`Link no válido: ${ytUrl}`, {
                    cause: error
                });
            });

            // Create convert object
            const converter = new Converter();

            // File name
            const name = this.fileName( videoInfo.videoDetails.title );

            // Descargar video
            const videoBuffer = yield this.downloadVideo( videoInfo ); 
            // console.log('\n\nVIDEO BUFFER', videoBuffer)
            
            // Transform video to audio
            const convertion = yield converter.convert( videoBuffer ); 
            // console.log('\n\nCONVERSION BUFFER', convertion)
            
            
            // Searching of tags and insert them
            const searchTags = yield new SearchTags( videoInfo.videoDetails.title );
            const tags = this.insertTags? yield searchTags.search() : ''; 
            // console.log('Desde DESCARGADOR\n\n',tags)
            
            const songWithTags = typeof tags === 'object'? NodeID3.write( tags, convertion ) : convertion; 
            // console.log('Buffer final\n\n', songWithTags)
            
            // Data output
            return { 
                songTitle: videoInfo.videoDetails.title,
                fileName: name, 
                buffer: songWithTags,
                tags: tags,
            }
        })
    }

    // Obtener buffer del video a base de la info Obtenida de la API
    downloadVideo( videoInfo ) {
        return __async( this, null, function* () {
            const videoBuffer = [];
            const stream = ytdl.downloadFromInfo( videoInfo, { quality: "highestaudio" });
            return stream
            
            // Streaming
            // return new Promise( ( resolve, reject ) => {
            //     // Add bytes
            //     stream.on( "data", ( chunk ) => { videoBuffer.push( chunk ) });

            //     // Create and wrap buffer object
            //     stream.on( "end", () => { resolve( Buffer.concat( videoBuffer ) ) });

            //     // In case of errors
            //     stream.on( "error", ( err ) => { reject( err ) });
            // })
        })
    }

    // Format the video title
    fileName( title ) {
        // const baseFileName = videoTitle.replace(/\s+|\||:|\/|\\|&/g, "_");
        const baseFileName = title.replace(/\s+/g, "_").replace(/[|:/\\&]/g, "");
        return baseFileName;
    }
}

export { Downloader, SearchTags }