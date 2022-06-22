import { Card, CardContent, Divider, makeStyles, Typography } from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import imagesDeluxe from '../images/DeluxeSuite';
import imagesExecutive from '../images/ExecutiveSuite';
import imagesPremier from '../images/PremierSuite';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import useLayout from '../hooks/useLayout';
import { DEVICES, ROOM_TYPES } from '../constants/categories';

const useStyles = makeStyles({
  container: {
    width: 900,
    margin: '0 auto',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  white: { color: 'white' },
  whiteBackground: { background: 'white' },
  card: { marginTop: 40, marginBottom: 40, padding: 20 },
  wrap: { display: 'flex', alignItems: 'center', justifyContent: 'space-around' },
  reverse: { flexDirection: 'row-reverse' },
  column: { flexDirection: 'column' },
  footer: {
    boxSizing: 'border-box',
    margin: 5,
    fontSize: 14,
    height: 30,
  },
  '@media (max-width: 950px)': {
    container: {
      width: '90vw',
    },
  },
});

export default function About() {
  const classes = useStyles();
  const device = useLayout();
  const location = useLocation();
  const refExecutive = useRef();
  const refDeluxe = useRef();
  const refPremier = useRef();
  useEffect(() => {
    switch (location.state?.type) {
      case ROOM_TYPES.deluxe:
        refDeluxe.current?.scrollIntoView({ block: 'center' });
        break;
      case ROOM_TYPES.premier:
        refPremier.current?.scrollIntoView({ block: 'center' });
        break;
      case ROOM_TYPES.executive:
        refExecutive.current?.scrollIntoView({ block: 'center' });
        break;
      default:
        break;
    }
  }, [location.state]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.white}>
          <Typography paragraph variant='h2'>
            HOTEL GROUP TWO
          </Typography>
        </div>
        <Typography variant='subtitle1' className={classes.white}>
          Our hotel is renovated in 2018. The hotel with a concentrated flavor of Yerevan and a combination of the best European services.
          The hotel is located in the extended center of Yerevan. It is a 10-minute walk and a 5-minute drive from the city center. From the
          hotel to the airport takes 20 minutes by car/taxi.The hotel is located in an unbeatable location, next to the Church of SurbSarkis
          and the house-Museum of Sergei Parajanov. The arrangement of hotel rooms, the quiet location and surrounding greenery provide
          utmost atmosphere for our guests.A big outdoor swimming pool provides a very comfortable place to relax and escape hot weather.
          There is an open-air café. Highly qualified staff and a perfect service system will ensure your pleasant stay at the hotel.
        </Typography>
        <Card className={classes.card} ref={refDeluxe}>
          <Typography paragraph variant='h4'>
            {ROOM_TYPES.deluxe} SUITE
          </Typography>
          <Typography variant='subtitle2'>
            Relax in our Deluxe featuring large and well decorated rooms with maximum of comfort in a minimalist style. The sober colors
            along with bright details add a touch of elegance to the interior of the suite. The charm of the Deluxe is complemented by the
            stunning view of the city center.
          </Typography>
          <CardContent>
            <div className={clsx(classes.wrap, { [classes.column]: device !== DEVICES.desktop })}>
              <Carousel
                infiniteLoop
                autoPlay
                emulateTouch
                showStatus={false}
                showThumbs={false}
                swipeable
                width={device === DEVICES.desktop && 500}
                dynamicHeight>
                {imagesDeluxe.map((e, i) => (
                  <img key={e + i} src={e} alt={ROOM_TYPES.deluxe} />
                ))}
              </Carousel>
              <Typography variant='subtitle1' align={device === DEVICES.desktop ? 'right' : 'center'}>
                Size: 35-39 sq. m.
                <br />
                Controlled air-conditioning
                <br />
                Vibrant cityscape view
                <br />
                Private bathroom, shower
                <br />
                One King/Queen or Twin bed
                <br />
                Folding sofa bed
                <br />
                In-room safe
                <br />
                Mini bar
                <br />
                Kitchen.
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card} ref={refPremier}>
          <Typography paragraph variant='h4'>
            {ROOM_TYPES.premier} SUITE
          </Typography>
          <Typography variant='subtitle2'>
            The warm and welcoming Premier Suite features 40-43 sq. m. living room and a comfortable bedroom. In most of suites hot tub and
            King bed are available. This contemporary, yet classical Suite offers unparalleled luxury due to its first-rate service, working
            and relaxing spaces, fresh design and inspiring colors. This well designed and quiet Suite ensures unforgettable experience and
            makes you feel at home.
          </Typography>
          <CardContent>
            <div
              className={clsx(classes.wrap, {
                [classes.column]: device !== DEVICES.desktop,
                [classes.reverse]: device === DEVICES.desktop,
              })}>
              <Carousel
                infiniteLoop
                autoPlay
                emulateTouch
                showStatus={false}
                showThumbs={false}
                swipeable
                width={device === DEVICES.desktop && 500}
                dynamicHeight>
                {imagesPremier.map((e, i) => (
                  <img key={e + i} src={e} alt={ROOM_TYPES.premier} />
                ))}
              </Carousel>
              <Typography variant='subtitle1' align={device === DEVICES.desktop ? 'left' : 'center'}>
                Size: 40-43 sq. m.
                <br />
                Controlled air-conditioning
                <br />
                Vibrant cityscape view
                <br />
                Private Bathroom: Shower / hot tub
                <br />
                Living room
                <br />
                In-room safe
                <br />
                Bedroom
                <br />
                Mini bar
                <br />
                One King/Queen Twin bed
                <br />
                Folding sofa bed
                <br />
                Kitchen.
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card} ref={refExecutive}>
          <Typography paragraph variant='h4'>
            {ROOM_TYPES.executive} SUITE
          </Typography>
          <Typography variant='subtitle2'>
            The spacious Executive Suite offers a perfect balance of luxury and space with its separate living room and bedroom. This suite
            is for those who are looking for personal service, perfect amenities and extra space. The Executive Suites expose an open-plan
            bedroom furnished in a contemporary European style.
          </Typography>
          <CardContent>
            <div className={clsx(classes.wrap, { [classes.column]: device !== DEVICES.desktop })}>
              <Carousel
                infiniteLoop
                autoPlay
                emulateTouch
                showStatus={false}
                showThumbs={false}
                swipeable
                width={device === DEVICES.desktop && 500}
                dynamicHeight>
                {imagesExecutive.map((e, i) => (
                  <img key={e + i} src={e} alt={ROOM_TYPES.executive} />
                ))}
              </Carousel>
              <Typography variant='subtitle1' align={device === DEVICES.desktop ? 'right' : 'center'}>
                46-55 sq. m.
                <br />
                2 LCD TV
                <br />
                Vibrant cityscape view
                <br />
                Private bathroom: Shower / hot tub
                <br />
                Living room
                <br />
                In-room safe
                <br />
                Bedroom
                <br />
                Mini bar
                <br />
                One King bed
                <br />
                Two folding sofa beds
                <br />
                Controlled air-conditioning
                <br />
                Kitchen.
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Divider className={classes.whiteBackground} />
        <div className={classes.footer}>
          <Typography className={classes.white} variant='button'>
            Hotel group two ⓒ 2022
          </Typography>
        </div>
      </div>
    </>
  );
}
