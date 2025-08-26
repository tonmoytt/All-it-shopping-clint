import React from 'react';
import img1 from '../../../../assets/Images/wareless specker.avif';
import img2 from '../../../../assets/Images/big sell.avif';
import img3 from '../../../../assets/Images/beats on go.webp';
import img4 from '../../../../assets/Images/mobile apple store.avif';
import img5 from '../../../../assets/Images/main benner.webp';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 py-10 px-6">
      {/* Left Column */}
      <div className="flex flex-col max-w-fit">
        <Link to='/shop'>   <img
          className="h-88 w-[260px] rounded-md object-cover"
          src={img1}
          alt=""
        /> </Link>
        <Link to='/shop'>   <img
          className="h-[220px] w-[260px] mt-5 rounded-md object-cover"
          src={img2}
          alt=""
        /> </Link>
      </div>

      {/* Right Column */}
      <div className="flex flex-col max-w-full md:max-w-fit gap-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-shrink-0">
           <Link to='/shop'> <img className="rounded-md object-cover  " src={img3} alt="" /></Link>
          </div>
          <div className="flex-shrink-0">
           <Link to='/shop'>   <img
              className="rounded-md w-full   object-cover"
              src={img4}
              alt=""
            /></Link>
          </div>
        </div>
        <div className="mt-4 rounded-md overflow-hidden">
         <Link to='/shop'>   <img className="w-full h-auto object-cover rounded-md" src={img5} alt="" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
