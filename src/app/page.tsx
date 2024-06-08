"use client"
import FormLinks from "@/components/FormLinks"
import Loader from "@/components/Loader"
import Results from "@/components/Results"
import { useState } from "react"
import ClientService from "@/services/ClientService"

export default function Home() {
  const [ results, setResults ] = useState([]);
  const [ enableForm, setEnableForm ] = useState <boolean>(false);
  const [ downloading, setDownloading ] = useState <boolean>(false);
  const [ finished, setFinished ] = useState <boolean>(false);

  const download = async ( tags: boolean, links: string[] ) => {
    setEnableForm(true);
    setDownloading( true );

    try {
      const response = await ClientService.sendLinks( links, tags );
      const data = await response.json();
      setResults( data.newResults );

    } catch (error) {
      console.log(error)
    }
    finally {
      setDownloading( false );
      setFinished( true );
    }

  }

  const restart = () => {
    setResults([]);
    setDownloading(false);
    setEnableForm(false);
    setFinished(false);
  }

  return (
    <div className="dark:bg-black min-h-[93.8vh] place-content-center">
      { !enableForm && <FormLinks download={download} />}
      { downloading && <Loader/>}
      { finished && <Results results={results} restart={restart} /> }
    </div>
  );
}
