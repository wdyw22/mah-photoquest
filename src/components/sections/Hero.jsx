import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section id="hero" className={`${styles.hero} container`}>
      <div className={styles.accent}>ФОТО-КВЕСТ</div>
      <h1 className={styles.title}>Искусство<br />в деталях</h1>
      <p className={styles.subtitle}>Исследуй картины, находи детали и собери свой коллаж</p>
    </section>
  )
}

export default Hero;
