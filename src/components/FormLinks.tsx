"use client"
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

// Data model of form
const formSchema = z.object({
    links: z.string().regex(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+/, 'Links No Válidos').transform( links => links.split('\n')),
    tags: z.boolean().default(false).optional()
})


export default function FormLinks() {
    const placeholder = `Inserta Tus Links Aquí. \nEj: \nhttps://www.youtube.com/watch?v=VnJxdVTXc0E\nhttps://www.youtube.com/watch?v=AXwUy2uoI_M`;

    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            links: [],
            tags: false
        },
        mode: 'onChange'
    })

    // Submit handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 border-[1px] dark:border-white border-gray-400 p-5 rounded-md sm:w-11/12 md:w-[60%] mx-auto'>
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
    )
}