import TableResults from "./results/TableResults"
import CardResults from "./results/CardResults"

export default function Results() {
    const results = [
        {
            cover: '/prueba/cover.jpg',
            song: '/prueba/13.Black Thunder - Extended.mp3',
            name: 'Black Thunder'
        },
        {
            cover: '/prueba/cover.jpg',
            song: '/prueba/13.Black Thunder - Extended.mp3',
            name: 'Eminem - I will Feat. KXNG Crooked, Royce da 5\'9 & Joell Ortiz (Full Original Instrumental)'
        },
        {
            cover: '/prueba/cover.jpg',
            song: '/prueba/13.Black Thunder - Extended.mp3',
            name: 'Black Thunder'
        }
    ]

    const handleDownload = ( song: any ) => {
        const a = document.createElement('a')
        a.href = song
        a.download
        a.target = "_blank"
        a.click()
    }
    
    return (
        <div className="py-10">
            {/* Table results in lg screens */}
            <TableResults
                results={results}
                handleDownload={handleDownload}
            />

            {/* Cards results in sm - md screen */}
            <CardResults
                results={results}
                handleDownload={handleDownload}
            />
        </div>
    )
}