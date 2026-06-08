import styles from './Hero.module.css'
import '../../../src/app/globals.css'

const Hero = () => {
  return (
    <section className={`${styles.hero} container`}>
      <div className={styles.accent}>ФОТО-КВЕСТ</div>
      <div className={styles.title}>Искусство<br />в деталях</div>
      <div className={styles.subtitle}>Исследуй картины, находи <br/> детали и собери свой коллаж</div>
    </section>
  )
}

export default Hero;