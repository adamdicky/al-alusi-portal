import Image from "next/image";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string; // optional
  className?: string;
}

const Button = ({type, title, icon, className = ''}: ButtonProps & {className?: string}) => {
  return (
    <button
        type={type}
        className={`flex justify-center items-center gap-3 px-2 rounded-md text-[15px] font-bold border border-gray-200 ${className || ''}`}
        //removed text color and bg color to be used in the component itself
    >
      <label className="bold-16 whitespace-nowrap">{title}</label>
      {icon && <Image src={icon} alt={title} width={24} height={24}/>}
    </button>
  )
}

export default Button