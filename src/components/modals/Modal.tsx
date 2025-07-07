"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Si el clic fue en el fondo (no dentro del contenido), cerrar modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleOverlayClick}>
      <div className="relative bg-white rounded-2xl shadow-lg max-w-4xl w-full mx-4 animate-fadeIn scale-100 duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <X size={24} />
        </button>
        <div className="p-6">
          <div className="space-y-4 text-sm text-gray-700">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}



