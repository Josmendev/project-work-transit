import { useRef, useState, type FormEvent } from "react";

export const usePinInput = (maxLength: number = 4) => {
  const [pin, setPin] = useState<string[]>(Array(maxLength).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }

    const currentPin = inputsRef.current.map((input) => input?.value || "").join("");
    if (currentPin.length === maxLength) {
      btnRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = pin.join("");
    console.log("PIN ingresado:", code);
    // Aquí retorno el codigo del back
  };

  return {
    pin,
    inputsRef,
    btnRef,
    handleChange,
    handleKeyDown,
    handleSubmit,
  };
};
