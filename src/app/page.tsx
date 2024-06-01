"use client"
import Presentation from "@/components/Presentation"
import FormLinks from "@/components/FormLinks";

export default function Home() {
  return (
    <div className="dark:bg-blac min-h-[93.8vh] place-content-center">
      <Presentation/>
      <FormLinks/>
    </div>
  );
}
