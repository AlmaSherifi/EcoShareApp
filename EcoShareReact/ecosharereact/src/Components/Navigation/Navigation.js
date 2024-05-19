import styles from './Navigation.module.css';
import Link from 'next/link'


const LINKS = [
   {href: '/', text:'Home', description: ''},
   
    {href: '/renting', text: 'Renting', description: 'How it works' },
    {href: '/login', text: 'Log in', description: 'log in here'},
    {href: '/contact', text: 'Contact', description: 'Contact information for EcoShare' },
]

export default function Navigation() {
    return (<div className={styles.grid}>
           
           {/*<NavigationLink text="HEJ" href="/" description="Testar en beskrivning"/> */ }

           {LINKS.map(x => <NavigationLink key={x.href} {...x}/>)} {/*exempel href är unik för varje länk så kan vi ha key på x.href*/ }

    </div>);
}

function NavigationLink({ text, href, description }) {
    return (<Link href={href}
        className={styles.card}>
            <h2>
                {text} <span>-&gt;</span>
            </h2>
            <p>{description}</p>
        </Link>)
}