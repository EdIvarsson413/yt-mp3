import TableResults from "./results/TableResults"
import CardResults from "./results/CardResults"
import { useRouter } from "next/router"

export default function Results({ results, restart }: any) {
    const imgBufferToImage = ( imgBuffer: any ) => {
        const imageBitArray = new Uint8Array( imgBuffer.data );
        const blob = new Blob( [imageBitArray], { type: 'image/png' } );
        const url = URL.createObjectURL( blob );
        return url
    }

    const handleDownload = ( songBuffer: any, fileName: string ) => {
        const audioBitArray = new Uint8Array( songBuffer.data );
        const blob = new Blob( [audioBitArray], { type: 'audio/mp3' } );
        const url = URL.createObjectURL( blob );
        const aux = document.createElement('a')

        aux.href = url;
        aux.download = `${fileName}.mp3`;
        aux.click();
    }
    
    return (
        <div className="py-10">
            {/* Table results in lg screens */}
            <TableResults
                results={results}
                imgBufferToImage={imgBufferToImage}
                handleDownload={handleDownload}
                restart={restart}
            />

            {/* Cards results in sm - md screen */}
            <CardResults
                results={results}
                imgBufferToImage={imgBufferToImage}
                handleDownload={handleDownload}
                restart={restart}
            />
        </div>
    )
}