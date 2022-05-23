import React, { useState } from 'react';
import { allImages } from './CarouselData';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import backgroundForHead from './../images/DeluxeSuite/image1.jpg';

export default function Carousel() {
  const [index, setIndex] = useState(0);
  return (
    <div className='carousel' style={{ width: '40%', height: '350px', backgroundImage: `url(${backgroundForHead})` }}>
      <div
        className='carouselInner'
        style={{ display: 'flex', width: '100%', height: '100%', backgroundImage: `url(${allImages[index].img})` }}>
        <div className='leftSide' style={{ flex: 1, height: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <ArrowBackIosIcon />
        </div>

        <div className='middle' style={{ flex: 8, height: '100%' }}></div>

        <div className='rightSide' style={{ flex: 1, height: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
}
