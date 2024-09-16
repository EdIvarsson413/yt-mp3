import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import {
    Form, FormControl,
    FormDescription, FormField,
    FormItem, FormLabel,
    FormMessage
} from './ui/form'
import Presentation from './Presentation'
import { useEffect } from 'react'

// Data model of form
const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

const formSchema = z.object({
    links: z.string()
                .regex(ytRegex, 'Links No Válidos')
                .transform( links => links.split('\n')),
                // .refine( input => {return input.length <= 5 }, 'Máximo 5 links' ),
    tags: z.boolean()
            .default(false)
            .optional()
})


export default function FormLinks( { download }: any ) {
    const placeholder = `Inserta Tus Links Aquí. \nEj: \nhttps://www.youtube.com/watch?v=VnJxdVTXc0E\nhttps://www.youtube.com/watch?v=AXwUy2uoI_M`;

    // #region Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            links: [],
            tags: false
        },
        mode: 'onSubmit'
    })

    // #region Clipboard n' LS
    useEffect(() => {
        const pasteFromClipboard = (e: KeyboardEvent) => {
            if( e.ctrlKey && e.altKey && e.key === 'p' ) {
                e.preventDefault();

                // Get info from clipboard
                navigator.clipboard.readText()
                    .then( clipText  => {
                        // If before there are links, get first them
                        const previousLinksJSON = localStorage.getItem( 'yt-mp3-links' );
                        let previousLinksArray: string[] = [];
                        if( previousLinksJSON )
                            previousLinksArray = JSON.parse( previousLinksJSON );

                        // Get clipboard text to array
                        const clipboardArray: string[] =  clipText.split('\n').filter( link => link.trim() !== '')

                        // Append previous and clipboard
                        let joinArray : string[] = [...clipboardArray];
                        if( previousLinksArray.length > 0 ) {
                            joinArray = previousLinksArray.concat( clipboardArray )
                        }
                        // console.log(joinArray)
                        

                        // Set links into localStorage
                        localStorage.setItem( 'yt-mp3-links', JSON.stringify( joinArray ) );
                        form.setValue('links', [joinArray.join('\n')]);
                    })
            }
        }

        window.addEventListener("keydown", pasteFromClipboard);

        return () => {
            window.removeEventListener("keydown", pasteFromClipboard);
        }
    }, [form, form.setValue])

    // #region getFrom LS
    useEffect(() => {
        const setLinksFromLS = () => {
            const links = localStorage.getItem('yt-mp3-links')
            if(links) {
                form.setValue('links', JSON.parse(links).join('\n'))
            }
        }

        setLinksFromLS()
    }, [form, form.setValue])

    // #region Form Events
    // Submit handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Clean links from white spaces
        const cleanLinks = values.links.filter( link => { return link !== '' })
        // console.log('onSubmit', cleanLinks)
        
        // Do the download and clean localStorage
        download( values.tags, cleanLinks )
        localStorage.removeItem('yt-mp3-links')
    }

    // onChange handler - save links in localStorage
    const handleChange = ( { target, type }: any ) => {
        const { value } = target;
        console.log('onChange Input', value.split('\n'))

        // Set current links in LS
        localStorage.setItem('yt-mp3-links', JSON.stringify(value.split('\n')))
    }

    return (
        <>
            <Presentation/>
            <Form {...form}>
                <form
                    autoComplete="off" 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8 border-[1px] dark:border-white border-gray-400 p-5 rounded-md sm:w-11/12 lg:w-[60%] mx-auto'
                    // onInput={save}
                >
                    {/* Links text area */}
                    <FormField
                        control={form.control}
                        name="links"
                        render={( {field} ) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea 
                                        rows={5} 
                                        placeholder={placeholder}
                                        {...form.register('links', { onChange: handleChange })}
                                        className='dark:border-white border-gray-400 font-mono' 
                                        {...field}
                                        />
                                </FormControl>
                                <FormMessage className='dark:text-red-500'/>
                            </FormItem>
                        )}
                    />

                    {/* Switch for search tags n' download button */}
                    <div className='grid grid-cols-1'>
                        <FormField
                            control={form.control}
                            name="tags"
                            render={( {field}) => (
                                <FormItem>
                                    <div className="flex gap-3">
                                        <FormLabel>Etiquetas</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                />
                                        </FormControl>
                                    </div>
                                    <FormDescription>Agregar artista, portada, genero, etc.</FormDescription>
                                </FormItem>
                            )}
                            />

                        <Button 
                            variant="ghost" 
                            type='submit' 
                            className='mt-5 border-[1px] dark:border-white border-gray-400'
                            >
                            Descargar
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}