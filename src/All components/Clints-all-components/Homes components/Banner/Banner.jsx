import React from 'react';
import img1 from '../../../../assets/Images/wareless specker.avif';
import img2 from '../../../../assets/Images/big sell.avif';
import img3 from '../../../../assets/Images/beats on go.webp';
import img4 from '../../../../assets/Images/mobile apple store.avif';
import img5 from '../../../../assets/Images/main benner.webp';

const Banner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 py-10 px-6">
      {/* Left Column */}
      <div className="flex flex-col max-w-fit">
        <img
          className="h-88 w-[260px] rounded-md object-cover"
          src={img1}
          alt=""
        />
        <img
          className="h-[220px] w-[260px] mt-5 rounded-md object-cover"
          src={img2}
          alt=""
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-col max-w-full md:max-w-fit gap-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-shrink-0">
            <img className="rounded-md object-cover w-full max-w-[300px]" src={img3} alt="" />
          </div>
          <div className="flex-shrink-0">
            <img
              className="rounded-md w-full max-w-[320px] h-[199px] object-cover"
              src={img4}
              alt=""
            />
          </div>
        </div>
        <div className="mt-4 rounded-md overflow-hidden">
          <img className="w-full h-auto object-cover rounded-md" src={img5} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
