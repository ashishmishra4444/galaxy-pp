import { useState } from "react";
import Hero from "./components/Hero";
import MemoryModal from "./components/MemoryModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative">
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <MemoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
