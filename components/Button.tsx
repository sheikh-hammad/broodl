

// export default function Button(props: any) {
//   const { text, dark, full, clickHandler } = props;
//   return (
//     <button onClick={clickHandler}
//       className={
//         "rounded-full overflow-hidden hover:opacity-60 duration-200 border-2 border-solid border-indigo-600 " +
//         (dark ? "text-white bg-indigo-600" : "text-indigo-600 ") +
//         (full ? "grid place-items-center w-full " : "")
//       }
//     >
//       <p className={"px-6 sm:px-10 py-2 sm:py-3 whitespace-nowrap " + fugazOne.className }>{text}</p>
//     </button>
//   );
// }


// export default function Button(props) {
//     const { text, dark, full, clickHandler } = props

//     return (
//         <button onClick={clickHandler} className={'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-indigo-600 ' + (dark ? ' text-white bg-indigo-600 ' : ' text-indigo-600 ') + (full ? ' grid place-items-center w-full ' : ' ')}>
//             <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + fugaz.className}>{text}</p>
//         </button>
//     )
// }

import { Fugaz_One } from 'next/font/google';
import React from 'react';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

// Define props for the Button component
interface ButtonProps {
  text: string;
  dark?: boolean;
  full?: boolean;
  clickHandler?: () => void;  // Type for the clickHandler function
}

const Button: React.FC<ButtonProps> = ({ text, dark = false, full = false, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className={
        'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-indigo-600 ' +
        (dark ? ' text-white bg-indigo-600 ' : ' text-indigo-600 ') +
        (full ? ' grid place-items-center w-full ' : ' ')
      }
    >
      <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + fugaz.className}>{text}</p>
    </button>
  );
}

export default Button;

