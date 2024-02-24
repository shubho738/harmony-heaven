
import {cn} from '@/libs/utils'

interface InputProps {
  placeholder?: string;
  type?: string;
  value: string | number;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  disabled?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  customStyles?: string;
}

const Input = ({type = "text", placeholder, value, onChange, disabled, fullWidth, autoFocus, customStyles}: InputProps) => {


  return (

    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      className={cn(
        `
         py-2 px-3 text-sm rounded outline-none border border-border-light ${fullWidth ? "w-full" : ""} disabled:cursor-not-allowed
        `,
        customStyles
        )}
    />
  
   )
}
 
export default Input