import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import './globals.css'
import TaskSection from "@/components/sections/TasksSection";
import CollageSection from "@/components/sections/CollageSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero/>
      <TaskSection/>
      <CollageSection/>
      <Footer/>
    </div>
  );
}
