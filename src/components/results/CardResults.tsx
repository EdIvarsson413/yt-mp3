import {
    Card, CardContent,CardFooter,
    CardHeader, CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

export default function CardResults( { results, typeResults, imgBufferToImage, audioBufferToMp3, restart }: any ) {
    return (
        <div className="md:block lg:hidden">  
            {/* Restart */}
            <div className="space-y-5 mb-16">
                <h2 className="mt-10 scroll-m-20 text-black dark:text-white text-center text-5xl font-light tracking-tight transition-colors first:mt-0">
                    Resultados
                </h2>
                <div className="flex justify-center">
                    <Button 
                        variant='destructive' 
                        className="w-40 dark:bg-red-600 font-light text-xl py-5"
                        onClick={restart}
                    >
                        Reiniciar
                    </Button>
                </div>
            </div>

            {/* Results */}
            <div className="w-2/3 mx-auto grid grid-cols-1 gap-8">
                {
                    results?.map( (result: any, index: number) => (
                        <Card key={index} className="border-[1px] border-gray-400 dark:border-white">
                            <CardHeader className="border-b-[1px] border-gray-400 dark:border-white rounded">
                                <CardTitle className="text-center font-light text-2xl">{result.songTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {
                                    typeResults === 0 && 
                                        <p className="text-center pt-6 dark:text-yellow-600 text-yellow-400">Inserción de etiquetas desactivado</p>
                                }
                                {
                                    typeResults === 2 && result.errorTags === 1 && 
                                        <p className="text-center pt-6 text-red-600">No se encontraron etiquetas:{'('}</p>
                                }
                                {
                                    typeResults === 1 && (
                                        <Image
                                            src={ imgBufferToImage( result.cover ) }
                                            alt={result.songTitle}
                                            width={500}
                                            height={500}
                                            className="w-[60%] mx-auto mt-6 rounded"
                                        />
                                    )
                                }
                            </CardContent>
                            <CardFooter className="border-t-[1px] border-gray-400 dark:border-white rounded">
                                    <Button
                                        variant="ghost"
                                        className="border-[1px] border-gray-400 dark:border-white font-light text-lg w-[236px] mx-auto mt-5"
                                        onClick={ () => audioBufferToMp3( result.songBuffer, result.fileName ) }
                                    >
                                        Descargar
                                    </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}