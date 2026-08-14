import Image from "next/image";
import styles from "./page.module.css";
import { DualRender } from "@/components/rendering/DualRender";

export default function Home() {
  return (
    <DualRender staticContent={<p>static</p>} interactiveContent={<p>interactive</p>}/>
  );
}
