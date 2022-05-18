import { makeStyles, Typography } from '@material-ui/core';
import Hotel from './Hotel';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    width: 700,
  },
  blockText: {
    display: 'block',
    margin: 8,
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <div>
      <h1>Home Page</h1>
      <div className={classes.container}>
        <Hotel />
        <div>
          <Typography className={classes.blockText} variant='body1'>
            Any information about hotel number
          </Typography>
          <Typography className={classes.blockText} variant='caption'>
            Description about hotel number
          </Typography>
        </div>
      </div>
    </div>
  );
}
