import React, { useState } from 'react';
//import { allImagesDeluxe, allImagesExecutive, allImagesPremier } from './CarouselData';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import backgroundForHead from './../images/DeluxeSuite/image1.jpg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  carousel: {
    width: '100%',
    height: '350px',
    backgroundImage: `url(${backgroundForHead})`,
  },
  // carouselInner: {
  //   display: 'flex',
  //   width: '100%',
  //   height: '100%',
  //   backgroundImage: `url(${allImagesDeluxe[index].img})`,
  // },
  leftSide: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'grid',
    placeItems: 'center',
    color: 'white',
    cursor: 'pointer',
  },
  middle: {
    flex: 8,
    height: '100%',
  },
  rightSide: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'grid',
    placeItems: 'center',
    color: 'white',
    cursor: 'pointer',
  },
});

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const classes = useStyles();
  // const {} = props;

  return (
    <>
      <div className={classes.carousel}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${props.imgs[index].img})`,
          }}>
          <div className={classes.leftSide} onClick={() => (index > 0 ? setIndex(index - 1) : setIndex(props.imgs.length - 1))}>
            <ArrowBackIosIcon />
          </div>

          <div className={classes.middle}>{props.imgs[index].subTitle}</div>

          <div className={classes.rightSide} onClick={() => (index < props.imgs.length - 1 ? setIndex(index + 1) : setIndex(0))}>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
    </>
  );
}
