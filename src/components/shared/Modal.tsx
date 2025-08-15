"use client";

import { forwardRef, Dispatch, SetStateAction, ReactNode } from "react";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import { useToggleLockScroll } from "@/hooks/useToggleLockScroll";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  padding?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, setIsOpen, children, padding }, ref) => {
    useToggleLockScroll(isOpen);
    useHandleOutsideClick(ref as React.RefObject<HTMLDivElement>, setIsOpen);

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-[rgba(0,0,0,0.5)] transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={ref}
          className={`relative max-w-xl w-full bg-white rounded ${
            padding ? padding : "p-6 sm:p-8"
          } shadow-xl transition-transform ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          <IoCloseSharp
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 cursor-pointer text-2xl text-red-600"
          />
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
export default Modal;
