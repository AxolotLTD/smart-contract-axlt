import React, {FC} from 'react';

type ButtonProps = {
  onClick?: () => void
  className?: string
  children: string | React.ReactNode
}

const Button: FC<ButtonProps> = ({onClick, children, className = ''}) => {
  return (
    <button onClick={onClick} className={`py-4 px-10 bg-gray-400 rounded-xl ${className}`}>
      {children}
    </button>
  )
}

export default Button