import {
    Card, CardContent,CardFooter,
    CardHeader, CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import Image from "next/image"

export default function CardResults( { results, imgBufferToImage ,handleDownload, restart }: any ) {
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
                    <Button 
                        variant='destructive' 
                        className="w-40 dark:bg-red-600 font-light text-xl py-5"
                        onClick={() => {console.log(results)}}
                    >
                        Reinici1ar
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
                                <Image 
                                    src={ imgBufferToImage( result.cover ) }
                                    alt={result.songTitle}
                                    width={500}
                                    height={500}
                                    className="w-10/12 mx-auto pt-6"
                                />
                            </CardContent>
                            <CardFooter className="border-t-[1px] border-gray-400 dark:border-white rounded">
                                    <Button
                                        variant="ghost"
                                        className="border-[1px] border-gray-400 dark:border-white font-light text-lg w-[236px] mx-auto mt-5"
                                        onClick={() => handleDownload( result.songBuffer, result.fileName )}
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