import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/app/lib/images/carepod-green.png';
import Image from 'next/image';


export default function KioskLabel() {
    return (

        <div className='grid grid-cols-3 gap-2 items-center justify-between w-full h-80px pb-4 max-w-3xl mx-auto'>

            <Card className='h-[130px]'>
                <CardHeader>
                    <CardTitle className='text-3xl border-b border-gray-200 flex flex-row gap-2'><Image src={Logo} alt='Carepod Logo' width={35} height={25} />Kios #A104</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-row items-center justify-between'>
                    <p className='text-xs'>Kota Bandung <br />  Jawa Barat</p>
                </CardContent>

            </Card>
            <Card className='h-[130px]'>
                <CardHeader>
                    <h3 className="font-semibold mb-2">Dr. Hartini Rahmah</h3>
                </CardHeader>
                <CardContent>
                    
                    <p className="text-sm text-gray-600">Dokter Umum</p>
                </CardContent>
            </Card>
            <Card className='h-[130px]'>  
                <CardHeader>
                    <h3 className="font-semibold mb-2">Estimasi Waktu</h3>
                </CardHeader>
                <CardContent className='text-xs'>
                    <p>5-10 menit</p>
                    <p className="text-sm text-gray-600">Waktu tunggu</p>
                </CardContent>
            </Card>
        </div>
    );
}