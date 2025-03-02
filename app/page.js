import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h2>Hello world!</h2>
      <Button variant="outline">Click me</Button>
    </div>

  );
}
