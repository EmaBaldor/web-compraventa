"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalPublicacion from "@/components/modals/ModalPublicacion";

export default function Publicar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push("/publicaciones/vehiculos"); // redirige
  };

  return (
    <ModalPublicacion
      isOpen={isOpen}
      onClose={handleClose}
      modo="crear"
    />
  );
}
