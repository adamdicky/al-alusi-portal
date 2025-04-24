import Image from "next/image";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string; // optional
}

const Button = ({type, title, icon}: ButtonProps) => {
  return (
    <button
        className={'flex justify-center items-center gap-3 px-2 rounded-md text-white bg-[#042351] text-[15px] font-bold'}
        type={type}>
      <label className="bold-16 whitespace-nowrap">{title}</label>
      {icon && <Image src={icon} alt={title} width={24} height={24}/>}
    </button>
  )
}

export default Button