'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "./calendar/page";
import ToolList from "./toolsList";



export default function Home() {
  return (
    <>
             
      <div className={styles.description}>
        {/*<p>
          Alma Sherifi
          </p>*/}
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/*By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
             />*/}
          </a>
        </div>
      </div>
      <Calendar/>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/EcoShareLogo.png"
          alt="Next.js Logo"
          width={100}
          height={100}
          priority
        />
      </div>
     
    
     <ToolList/>
    </>
  );
}


