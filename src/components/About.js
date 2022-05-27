import { makeStyles } from '@material-ui/core';
import Carousel from './Carousel';
import backgroundForHead from './../images/backgroundForHead.jpg';
import { allImagesDeluxe, allImagesExecutive, allImagesPremier } from '../constants/carouselData';
import { useState } from 'react';
const useStyles = makeStyles({
  about: {
    width: 900, //900
    margin: '0 auto',
    backgroundColor: 'rgba(38,38,38,0.3)',
  },
  container: {
    display: 'flex',
    //flexDirection: 'row-reverse',

    justifyContent: 'spaceBetween',
    padding: 10,
    fontSize: '25px',
  },

  aboutEachRoom: {
    textAlign: 'justify',
    fontSize: 16,
    right: '0px',
    width: '700px',
    padding: '10px',
    margin: 10,
    flex: 1,
  },
  carousel: {
    padding: '10px',
    flex: 1,
    margin: 0,
    width: '100%',
  },

  header: {
    backgroundImage: `url(${backgroundForHead})`,
    padding: '10px 0px 60px 0px',
    height: '370px',
    color: 'white',
  },
  aboutHotel: {
    fontSize: '23px',
    padding: '20px',
    textAlign: 'justify',
  },
});

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.about}>
      <div className={classes.header}>
        <h1>OVERVIEW</h1>
      </div>
      <div>
        <p className={classes.aboutHotel}>
          'Our' hotel is renovated in 2018. Our hotel with a concentrated flavor of Yerevan and a combination of the best European services.
          The hotel is located in the extended center of Yerevan. 'Our' hotel is a 10-minute walk and a 5-minute drive from the city center.
          From the hotel to the airport takes 20 minutes by car/taxi.The hotel is located in an unbeatable location, next to the Church of
          SurbSarkis and the house-Museum of Sergei Parajanov. The arrangement of hotel rooms, the quiet location and surrounding greenery
          provide utmost atmosphere for our guests.A big outdoor swimming pool provides a very comfortable place to relax and escape hot
          weather. There is an open-air café. Highly qualified staff and a perfect service system will ensure your pleasant stay at the
          'Our' hotel.
        </p>
        <p style={{ fontSize: '40px', padding: 20, margin: 20 }}>Gallary</p>
      </div>
      <div className={classes.container}>
        <div className={classes.carousel}>
          <Carousel imgs={allImagesDeluxe} subTitle='DeluxeSuite' />
        </div>
        <div className={classes.aboutEachRoom}>
          <p>
            Relax in our Deluxe featuring large and well decorated rooms with maximum of comfort in a minimalist style. The sober colors
            along with bright details add a touch of elegance to the interior of the suite. The charm of the Deluxe is complemented by the
            stunning view of the city center.
          </p>
          <p>
            <b>Amenities: </b>
          </p>
          <p>• Size: 35-39 sq. m. </p>
          <p>• Individually controlled air-conditioning</p>
          <p> • Vibrant cityscape view</p>
          <p> • Private bathroom, shower</p>
          <p> • One King/Queen or Twin bed </p>
          <p>• Folding sofa bed </p>
          <p>• In-room safe </p>
          <p>• Mini bar </p>
          <p>• Kitchen, ask the reception for the kitchen utensils (dial 2).</p>
        </div>
      </div>

      <div className={classes.container}>
        <div className={classes.aboutEachRoom}>
          <p>
            The warm and welcoming Premier Suite features 40-43 sq. m. living room and a comfortable bedroom. In most of suites hot tub and
            King bed are available. This contemporary, yet classical Suite offers unparalleled luxury due to its first-rate service, working
            and relaxing spaces, fresh design and inspiring colors. This well designed and quiet Suite ensures unforgettable experience and
            makes you feel at home.
          </p>
          <p>
            <b>Amenities: </b>
          </p>
          <p>• Size: 40-43 sq. m.</p>
          <p> • Individually controlled air-conditioning</p>
          <p> • Vibrant cityscape view</p>
          <p> • Private Bathroom: Shower or hot tub </p>
          <p>• Living room </p>
          <p>• In-room safe </p>
          <p>• Bedroom </p>
          <p>• Mini bar</p>
          <p>• One King/Queen Twin bed</p>
          <p>• Folding sofa bed</p>
          <p>• Kitchen, ask the reception for the kitchen utensils (dial 2).</p>
        </div>
        <div className={classes.carousel}>
          <Carousel imgs={allImagesPremier} subTitle='PremierSuite' />
        </div>
      </div>

      <div className={classes.container}>
        <div className={classes.carousel}>
          <Carousel imgs={allImagesExecutive} subTitle='ExecutiveSuite' />
        </div>
        <div className={classes.aboutEachRoom}>
          <p>
            The spacious Executive Suite offers a perfect balance of luxury and space with its separate living room and bedroom. This suite
            is for those who are looking for personal service, perfect amenities and extra space. The Executive Suites expose an open-plan
            bedroom furnished in a contemporary European style.
          </p>
          <p>
            <b>Amenities: </b>
          </p>
          <p>• 46-55 sq. m.</p>
          <p>• 2 LCD TV</p>
          <p>• Vibrant cityscape view</p>
          <p>• Private bathroom: Shower or hot tub</p>
          <p>• Living room</p>
          <p>• In-room safe</p>
          <p>• Bedroom</p>
          <p>• Mini bar</p>
          <p>• One King bed</p>
          <p>• Two folding sofa beds</p>
          <p>• Individually controlled air-conditioning</p>
          <p>• Kitchen, ask the reception for the kitchen utensils (dial 2).</p>
        </div>
      </div>
    </div>
  );
}
