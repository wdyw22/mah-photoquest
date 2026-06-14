'use client';

import { useState } from 'react';
import Image from "next/image";
import styles from './Header.module.css'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.nav}>
          <a href="#" className={styles.logo}>
              <Image
                  src="/images/logo.svg"
                  alt="Музей Академии Художеств"
                  width={150}
                  height={35}
              />
          </a>
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
              <Image
                  src="/images/menu.svg"
                  alt="Меню"
                  width={16}
                  height={16}
              />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={closeMenu}
          />
          <nav className={styles.mobileMenu}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem} style={{ animationDelay: '0.1s' }}>
                <a href="#hero" onClick={closeMenu}>
                  Главная
                </a>
              </li>
              <li className={styles.menuItem} style={{ animationDelay: '0.2s' }}>
                <a href="#tasks" onClick={closeMenu}>
                  Задания
                </a>
              </li>
              <li className={styles.menuItem} style={{ animationDelay: '0.3s' }}>
                <a href="#collage" onClick={closeMenu}>
                  Коллаж
                </a>
              </li>
              <li className={styles.menuItem} style={{ animationDelay: '0.4s' }}>
                <a href="#footer" onClick={closeMenu}>
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header;

