import React from 'react'
import { User } from "@phosphor-icons/react/dist/ssr";
import Button from './Button';

const DeletePost = () => {
  return (
    <main className='flex flex-col items-end gap-4'>
      <div className="flex flex-col bg-white p-3 gap-3 w-[1170px]  rounded-2xl border border-gray-200 wrap-break-word">
        <div className='flex flex-row items-center gap-2'>
            <User size={32}/>
            <div>
              <h6 className='font-bold'>Mr. Fairouz</h6>
              <h6 className='text-[12px] text-[#909090]'>15 Mar 03:30pm</h6>
            </div>
        </div>

        {/* POST STARTS BELOW */}

        <div className='text-justify'>
            <a>
              Test Test baling lelaki SIRAJ Al-Alusi berjaya melangkah ke suku akhir selaku naib johan kumpulan. Walaupun tidak berjaya mara ke separuh akhir, pasukan menunjukkan semangat dan kesungguhan yang membanggakan di setiap perlawanan. Teruskan berlatih dan jangan berhenti mencabar potensi diri dan perjalanan masih panjang. Good games, guys! Bola Baling ini dilatih oleh cikgu SIRAJ Al-Alusi, Cikgu Ezatul A'in Artikah dan pengurus pasukan ialah Cikgu Nur Atikah. Syabas semuanya!
            </a>
        </div>
        
      </div>
      
      <div>
        <Button
          type='button'
          title='Delete Post'
        />
      </div>
      
    </main>
    
  )
}

export default DeletePost