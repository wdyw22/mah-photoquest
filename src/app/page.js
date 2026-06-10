import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import './globals.css'
import TaskSection from "@/components/sections/TasksSection";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero/>
      <TaskSection/>
    </div>
  );
}
