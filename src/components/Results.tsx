import TableResults from "./results/TableResults"
import CardResults from "./results/CardResults"

export default function Results({ results, restart, typeResults }: any) {
    const imgBufferToImage = ( imgBuffer: any ) => {
        const imageBitArray = new Uint8Array( imgBuffer.data );
        const blob = new Blob( [imageBitArray], { type: 'image/png' } );
        const url = URL.createObjectURL( blob );
        return url
    }

    const audioBufferToMp3 = ( songBuffer: any, fileName: string ) => {
        const audioBitArray = new Uint8Array( songBuffer.data );
        const blob = new Blob( [audioBitArray], { type: 'audio/mp3' } );
        const url = URL.createObjectURL( blob );
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.mp3`;
        a.click();
    }
    
    return (
        <div className="py-10">
            {/* Table results in lg screens */}
            <TableResults
                results={results}
                typeResults={typeResults}
                imgBufferToImage={imgBufferToImage}
                audioBufferToMp3={audioBufferToMp3}
                restart={restart}
            />

            {/* Cards results in sm - md screen */}
            <CardResults
                results={results}
                typeResults={typeResults}
                imgBufferToImage={imgBufferToImage}
                audioBufferToMp3={audioBufferToMp3}
                restart={restart}
            />
        </div>
    )
}