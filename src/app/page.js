import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import TaskSection from "@/components/sections/TasksSection";
import CollageSection from "@/components/sections/CollageSection";
import Footer from "@/components/sections/Footer";

import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Hero/>
      <div className={styles.contentWrapper}>
        <TaskSection/>
        <CollageSection/>
      </div>
      <Footer/>
    </div>
  );
}
