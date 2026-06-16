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

  const menuItems = [
    { href: '#hero', label: 'Главная' },
    { href: '#tasks', label: 'Задания' },
    { href: '#collage', label: 'Коллаж' },
    { href: '#footer', label: 'Контакты' },
  ];

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

          {/* Desktop Menu */}
          <nav className={styles.desktopMenu}>
            <ul className={styles.desktopMenuList}>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={closeMenu}
          />
          <nav id="mobile-menu" className={styles.mobileMenu}>
            <ul className={styles.menuList}>
              {menuItems.map((item, index) => (
                <li key={item.href} className={styles.menuItem} style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                  <a href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header;
