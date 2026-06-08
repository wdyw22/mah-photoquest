import Image from "next/image";
import styles from './Header.module.css'


const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.nav}>
          <button href="#">
              <Image 
                  src="/images/logo.svg" 
                  alt="Музей Академии Художеств" 
                  width={150} 
                  height={35} 
              />
          </button>
          <button>
              <Image
                  src="/images/menu.svg"
                  alt="Меню"
                  width={16}
                  height={16}
              />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;

