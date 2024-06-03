'use client'
import { ToggleTheme } from "@/components/ui/ToggleTheme"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Header() {
    return (
        <header className="shadow-[0px_2px_23px_-15px_rgba(0,0,0,0.75)] dark:shadow-[0px_2px_23px_-15px_rgba(255,255,255,1)]">
            <nav className="dark:bg-black border-b-2 dark:border-white border-gray-400 flex justify-between py-3 px-5">
                <div className="flex gap-5">
                    {/* Github link */}
                    <Button size='icon' variant='ghost' asChild>
                        <Link 
                            href="https://github.com/EdIvarsson413/yt-mp3"
                            target="_blank"
                            title="Entrar al respositorio"
                        >
                            <GitHubLogoIcon width={30} height={30}/>
                        </Link>
                    </Button>

                    {/* Snippet */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="border-[1px] border-gray-400 dark:border-white">Mira Aquí</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <p className="text-center">
                                Presiona <span className="italic">Ctrl + Alt + p</span>
                            </p>
                        </PopoverContent>
                    </Popover>
                </div>

                <ToggleTheme/>
            </nav>
        </header>
    )
}