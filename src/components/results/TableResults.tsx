import { 
    Table, TableBody,
    TableCell, TableHead,
    TableHeader, TableRow,
    TableFooter
} from "../ui/table"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

export default function TableResults({ results, typeResults, imgBufferToImage, audioBufferToMp3, restart }: any) {

    const checkResults = ( errorTags: number ) => {
        return typeResults
    }

    return (
        <Table className="mx-auto w-[60%] border-[1px] border-gray-400 dark:border-white sm:hidden lg:block">
            {/* Restart */}
            <TableHeader>
                <TableRow className="border-b-[1px] border-gray-400 dark:border-white">
                    <TableHead className="py-2">
                        <h2 className="mt-10 scroll-m-20 text-black dark:text-white text-center text-3xl font-light tracking-tight transition-colors first:mt-0">
                            Resultados
                        </h2>
                    </TableHead>
                    <TableHead></TableHead>
                    <TableHead>
                        <Button 
                            variant='destructive' 
                            className="w-40 dark:bg-red-600 font-light text-lg"
                            onClick={restart}
                        >
                            Reiniciar
                        </Button>
                    </TableHead>
                </TableRow>
            </TableHeader>

            {/* Results */}
            <TableHeader>
                <TableRow className="text-xl border-b-[1px] border-gray-400 dark:border-white">
                    <TableHead className="w-[30%] font-light text-center">Portada</TableHead>
                    <TableHead className="text-center font-light w-2/3">Canción</TableHead>
                    <TableHead className="text-center font-light">Acción</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    results?.map( ( result:any, index: number ) => (
                        <TableRow key={index}>
                            <TableCell>
                                {
                                    typeResults === 0 && 
                                        <p className="text-center dark:text-yellow-600 text-yellow-400">Inserción de etiquetas desactivado</p>
                                }
                                {
                                    typeResults === 2 && result.errorTags === 1 && 
                                        <p className="text-center text-red-600">No se encontraron etiquetas:{'('}</p>
                                }
                                {
                                    typeResults === 1 && (
                                        <Image
                                            src={ imgBufferToImage( result.cover ) }
                                            alt={result.songTitle}
                                            width={500}
                                            height={500}
                                            className="w-[60%] mx-auto"
                                        />
                                    )
                                }
                            </TableCell>
                            <TableCell className="text-center font-light text-lg">{result.songTitle}</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <Button
                                        variant="ghost"
                                        className="border-[1px] border-gray-400 dark:border-white font-light"
                                        onClick={ () => audioBufferToMp3( result.songBuffer, result.fileName )}
                                    >
                                        Descargar
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}