import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <div id="footer" className={styles.footer}>
            <span className={styles.title}>
                Научно-исследовательский музей при <br/> Российской Академии художеств
            </span>
            <div className={styles.info}>
                <p className={styles.copy}>© 2008-2026</p>
                <p className={styles.rights}>Все права защищены</p>
                <p className={styles.org}>ФГБУК НИМ РАХ</p>
            </div>
        </div>
     );
}
 
export default Footer;