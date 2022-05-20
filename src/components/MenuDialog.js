import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { BottomNavigation, BottomNavigationAction, makeStyles, Tab, Tabs } from '@material-ui/core';
import { DRINKS, MEALS } from '../constants/categories';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 22,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  rootImageList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 600,
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
}));

export default function MenuDialog(props) {
  const { handleClose, onAddItem } = props;
  const [navigation, setNavigation] = useState(0);
  const [drinkM, setDrinkM] = useState(0);
  const [mealM, setMealM] = useState(0);
  const [content, setContent] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    function fetchFromApi() {
      const url = navigation
        ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${DRINKS[drinkM]}`
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${MEALS[mealM]}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => setContent(data[navigation ? 'drinks' : 'meals']));
    }
    fetchFromApi();
  }, [navigation, drinkM, mealM]);

  return (
    <div>
      <Dialog open onClose={handleClose}>
        <DialogTitle>
          <BottomNavigation value={navigation} onChange={(event, newValue) => setNavigation(newValue)} showLabels>
            <BottomNavigationAction label='Meal' icon={<FastfoodIcon />} />
            <BottomNavigationAction label='Drinks' icon={<LocalBarIcon />} />
          </BottomNavigation>
          <div className={classes.root}>
            <Tabs
              variant='scrollable'
              value={navigation ? drinkM : mealM}
              onChange={(event, newValue) => (navigation ? setDrinkM(newValue) : setMealM(newValue))}
              indicatorColor='primary'>
              {navigation ? DRINKS.map((e) => <Tab key={e} label={e} />) : MEALS.map((e) => <Tab key={e} label={e} />)}
            </Tabs>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={classes.rootImageList}>
            <ImageList rowHeight={180} className={classes.imageList}>
              {content.length > 0 &&
                content.map((e) => {
                  const str = e.strMeal || e.strDrink;
                  const strThumb = e.strMealThumb || e.strDrinkThumb;
                  return (
                    <ImageListItem key={str + strThumb}>
                      <img src={strThumb} alt={str} />
                      <ImageListItemBar
                        title={str}
                        actionIcon={
                          <IconButton onClick={() => onAddItem(str)} className={classes.icon}>
                            <AddCircleIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  );
                })}
            </ImageList>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
