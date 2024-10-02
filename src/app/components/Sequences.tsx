import { useState } from "react";

interface SequencesProps{
    currentStage: string;
}

export default function Sequences({currentStage}: SequencesProps){
    return(
        <div className="flex flex-col pt-10 pr-10 pb-5">
            <div className="flex flex-col text-gray-500 gap-3">
                <div className="flex flex-row gap-4">
                    <div className={`w-[20px] h-[20px] rounded-full text-center ${currentStage === 'welcome' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} >1</div>
                    <span className={`${currentStage === 'welcome' ? 'text-blue-500' : 'text-gray-500'}`}>Selamat Datang</span>
                </div>
                <div className="flex flex-row gap-4">
                    <div className={`w-[20px] h-[20px] rounded-full text-center ${currentStage === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} >2</div>
                    <span className={`${currentStage === 'profile' ? 'text-blue-500' : 'text-gray-500'}`}>Profil Pasien</span>
                </div>
                <div className="flex flex-row gap-4">
                    <div className={`w-[20px] h-[20px] rounded-full text-center ${currentStage === 'additional' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} >3</div>
                    <span className={`${currentStage === 'additional' ? 'text-blue-500' : 'text-gray-500'}`}>Hadir</span>
                </div>
                <div className="flex flex-row gap-4">
                    <div className={`w-[20px] h-[20px] rounded-full text-center ${currentStage === 'diagnosis' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} >4</div>
                    <span className={`${currentStage === 'diagnosis' ? 'text-blue-500' : 'text-gray-500'}`}>Diagnosis</span>
                </div>
                <div className="flex flex-row gap-4">
                    <div className={`w-[20px] h-[20px] rounded-full text-center ${currentStage === 'self-check' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} >5</div>
                    <span className={`${currentStage === 'self-check' ? 'text-blue-500' : 'text-gray-500'}`}>Pemeriksaan Mandiri</span>
                </div>
                
            </div>
        </div>
    );
}