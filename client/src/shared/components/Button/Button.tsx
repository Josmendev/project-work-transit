import React from "react";
type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
  title: string;
  id?: string;
  name?: string;
  type?: ButtonType;
  children?: React.ReactNode;
  classButton?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      name,
      id,
      type = "button",
      title,
      classButton = "",
      disabled = false,
      iconLeft,
      iconRight,
      ariaLabel,
      ariaControls,
      ariaExpanded,
      tabIndex,
      onClick,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        id={id}
        name={name}
        type={type}
        className={`cursor-pointer ${
          disabled &&
          "!cursor-not-allowed bg-neutral-100 hover:bg-neutral-100 focus:border-neutral-100 text-neutral-600"
        } ${classButton}`}
        disabled={disabled}
        aria-label={ariaLabel || title}
        aria-disabled={disabled ? "true" : "false"}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        title={title}
        tabIndex={tabIndex || 0}
        onClick={onClick}
      >
        {iconLeft && <>{iconLeft}</>}
        {children}
        {iconRight && <>{iconRight}</>}
      </button>
    );
  }
);

Button.displayName = "Button";
