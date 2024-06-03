"use client"
import FormLinks from "@/components/FormLinks"
import Loader from "@/components/Loader"
import Results from "@/components/Results"

export default function Home() {
  return (
    <div className="dark:bg-black min-h-[93.8vh] place-content-center">
      <FormLinks/>
      {/* <Loader/> */}
      {/* <Results/> */}
    </div>
  );
}
