import Image from "next/image"

export default function Presentation() {
    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                Convertirdor YT-Mp3
            </h1>
            <h2 className="mt-10 scroll-m-20 text-center text-3xl font-light tracking-tight transition-colors first:mt-0">
                Descarga tus canciones. Cuantas quieras, sin anuncios y virus
            </h2>
            <Image
                priority
                src="/logo.png"
                alt="Logo"
                width={1000}
                height={1000}
                className="w-[150px] h-[150px] mt-2 mb-5 mx-auto"
            />
        </>
    )
}