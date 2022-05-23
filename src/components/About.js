import { Container, makeStyles } from '@material-ui/core';
import { CallMissedSharp } from '@material-ui/icons';
import Carousel from './Carousel';
import backgroundForHead from './../images/backgroundForHead.jpg';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'spaceBetween',
    padding: 50,
  },
});

export default function About() {
  const classes = useStyles();
  return (
    <>
      <div className='Header' style={{ backgroundImage: `url(${backgroundForHead})`, padding: '10px 0px 60px 0px', height: '270px' }}>
        <h1 style={{ color: 'white' }}>OVERVIEW</h1>
      </div>
      {/* <div className={classes.container}> */}
      <div className='container' style={{ padding: '50px', fontSize: '25px' }}>
        <div>
          <p style={{ verticalyAlign: 'middle' }}>
            'Our' hotel is renovated in 2018. Our hotel with a concentrated flavor of Yerevan and a combination of the best European
            services. The hotel is located in the extended center of Yerevan. 'Our' hotel is a 10-minute walk and a 5-minute drive from the
            city center. From the hotel to the airport takes 20 minutes by car/taxi.The hotel is located in an unbeatable location, next to
            the Church of SurbSarkis and the house-Museum of Sergei Parajanov. The arrangement of hotel rooms, the quiet location and
            surrounding greenery provide utmost atmosphere for our guests.A big outdoor swimming pool provides a very comfortable place to
            relax and escape hot weather. There is an open-air café. Highly qualified staff and a perfect service system will ensure your
            pleasant stay at the 'Our' hotel.
          </p>
        </div>
        <div className='carousel' style={{ padding: '20px' }}>
          <Carousel />
        </div>
      </div>
    </>
  );
}
