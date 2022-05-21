import { makeStyles } from '@material-ui/core';
import Hotel from './Hotel';
import InfoCard from './InfoCard';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 30,
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
      <div className={classes.container}>
        <Hotel />
        <InfoCard />
      </div>
    </div>
  );
}
