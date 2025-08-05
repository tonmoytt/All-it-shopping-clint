import React from 'react';
import img1 from '../../../../assets/Images/wareless specker.avif'
import img2 from '../../../../assets/Images/big sell.avif'
import img3 from '../../../../assets/Images/beats on go.webp'
import img4 from '../../../../assets/Images/mobile apple store.avif'
import img5 from '../../../../assets/Images/main benner.webp'
 

const Banner = () => {
    return (
        <div className=' w-full max-w-7xl mx-auto flex  gap-6 py-10 px-6'>
            <div className='max-w-fit  '>
                  <img className='h-88 w-[260px] bg-red-300 rounded-md' src={img1} alt="" />  
                     <img className='h-[220px] w-[260px] mt-5 rounded-md' src={img2}alt="" />  

            </div>
            {/* section 2  */}
            <div className='max-w-fit gap-6'>


                <div className='flex gap-5'>
                    <div>  <img className='rounded-md' src={img3} alt="" /> </div>
                    <div>   <img className='rounded-md w-80 h-[199px]' src={img4} alt="" /> </div>

                </div>
                <div className='mt-4 rounded-md'>
                    <img className=' w-full' src={img5} alt="" />
                </div>
            </div>

        </div>
    );
};

export default Banner;