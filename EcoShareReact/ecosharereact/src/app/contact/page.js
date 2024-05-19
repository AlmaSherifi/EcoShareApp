import styles from './ContactPage.module.css'; 

export default function ContactPages() {
    return (
        <div className={styles.container}>
            <h2>Contact information</h2>
            <ul className={styles.contactList}>
                <li>Email: almasherifii@hotmail.com</li>
                <li><a href="https://github.com/AlmaSherifi">Github: AlmaSherifi</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/alma-sherifi-50a8652b0/">Alma Sherifi</a></li>
            </ul>
        </div>
    );
}
