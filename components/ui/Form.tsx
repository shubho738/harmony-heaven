
'use client'

import Button from './Button'

interface FormProps {
  
  children: React.ReactNode;
  onCTA(e?: React.FormEvent<HTMLButtonElement>): void;
  ctaLabel?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  buttonStyles?: string;
  buttonLoaderColor?: string;
}

const Form = ({children, onCTA, ctaLabel = "Submit", disabled, isSubmitting, buttonStyles, buttonLoaderColor}: FormProps) => {

  return (
    <form
      className="flex flex-col gap-8"
    >
      {children}

      <div
        className="self-center"
      >
        <Button
          label={ctaLabel}
          onClick={onCTA}
          disabled={disabled}
          isLoading={isSubmitting}
          customStyles={buttonStyles}
          loaderColor={buttonLoaderColor}
        />
      </div>
    </form>
  )
}

export default Form