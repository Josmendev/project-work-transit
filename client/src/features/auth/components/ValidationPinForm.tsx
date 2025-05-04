import { Button } from "../../../shared/components/Button/Button";
import { Icon } from "../../../shared/components/Icon";
import { usePinInput } from "../hooks/usePinInput";

export const ValidationPinForm = () => {
  const { pin, inputsRef, btnRef, handleChange, handleKeyDown, handleSubmit } = usePinInput(4);

  return (
    <form className="container-inputs flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex gap-4 justify-center">
        {pin.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            inputMode="numeric"
            pattern="[0-9]"
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            className="mt-2 w-24 h-24 text-center text-h2-semibold border-2 border-primary-600 rounded-2xl"
          />
        ))}
      </div>

      <Button
        name="btnConfirmPin"
        title="Confirmar PIN"
        type="submit"
        tabIndex={3}
        classButton="btn-primary mt-4"
        iconRight={<Icon.SuccessFill size={28} />}
        ref={btnRef}
      >
        <span>Confirmar PIN</span>
      </Button>
    </form>
  );
};
