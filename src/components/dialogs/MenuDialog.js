import React, { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { makeStyles, Tab, Tabs, Typography, Avatar, BottomNavigation, BottomNavigationAction, Button } from '@material-ui/core';
import { IconButton, TextField, InputAdornment } from '@material-ui/core';
import debounce from 'lodash.debounce';
import { DEVICES, DRINKS, MEALS } from '../../constants/categories';
import { RemoveCircle, Fastfood, LocalBar, AddCircle, Search } from '@material-ui/icons';
import useLayout from '../../hooks/useLayout';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, display: 'flex', height: 24 },
  tabs: { borderRight: `1px solid ${theme.palette.divider}` },
  rootImageList: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: { height: 550 },
  image: { maxHeight: 170 },
  addIcon: { color: 'rgba(255, 255, 255, 0.5)' },
  title: { background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,  rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)' },
  orderWrap: { display: 'flex', flexDirection: 'column' },
  orderList: { minWidth: '20vw', maxWidth: '90vw', minHeight: '85%', maxHeight: 460, overflow: 'hidden scroll' },
  avatar: { width: theme.spacing(6), height: theme.spacing(6) },
  wrap: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
  '@media (max-width: 450px)': {
    rootImageList: {
      flexDirection: 'column',
    },
  },
  textField: {
    marginTop: 5,
    marginBottom: 5,
  },
}));

export default function MenuDialog(props) {
  const { handleClose, onAddItem } = props;
  const [navigation, setNavigation] = useState(0);
  const [drinkM, setDrinkM] = useState(0);
  const [mealM, setMealM] = useState(0);
  const [content, setContent] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservedData, setReservedData] = useState({ drinks: {}, meals: {} });
  const classes = useStyles();
  const device = useLayout();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const debouncedHandle300 = useMemo(() => debounce(handleChange, 300), []);

  useEffect(() => {
    function fetchFromApi() {
      const url = navigation
        ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${DRINKS[drinkM]}`
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${MEALS[mealM]}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setContent(data[navigation ? 'drinks' : 'meals']);
          setReservedData(
            navigation
              ? { ...reservedData, drinks: { ...reservedData.drinks, [DRINKS[drinkM]]: data.drinks } }
              : { ...reservedData, meals: { ...reservedData.meals, [MEALS[mealM]]: data.meals } },
          );
        });
    }
    const reserved = reservedData[navigation ? 'drinks' : 'meals'][navigation ? DRINKS[drinkM] : MEALS[mealM]];
    if (reserved) {
      setContent(reserved);
    } else {
      fetchFromApi();
    }
  }, [navigation, drinkM, mealM]); // eslint-disable-line

  function addItem(data) {
    setOrders([...orders, data]);
  }

  const renderContent = () => {
    if (content.length > 0)
      return content
        .filter((e) => (e.strMeal || e.strDrink).includes(searchValue))
        .map((e) => {
          const str = e.strMeal || e.strDrink;
          const strThumb = e.strMealThumb || e.strDrinkThumb;
          return (
            <ImageListItem key={str + strThumb} className={classes.image}>
              <img src={strThumb} alt={str} />
              <ImageListItemBar
                title={
                  <Typography variant='caption' align='center'>
                    {str}
                  </Typography>
                }
                className={classes.title}
                actionIcon={
                  <IconButton
                    onClick={() =>
                      addItem({
                        completed: false,
                        canceled: false,
                        str,
                        strThumb,
                        type: strThumb.slice(15, strThumb.indexOf('db')),
                      })
                    }
                    className={classes.addIcon}
                    size='small'>
                    <AddCircle />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        });
  };

  return (
    <div>
      <Dialog fullScreen open onClose={handleClose}>
        <DialogTitle>
          <Button onClick={handleClose}>Close</Button>
          <BottomNavigation value={navigation} onChange={(event, newValue) => setNavigation(newValue)} showLabels>
            <BottomNavigationAction label='Meal' icon={<Fastfood />} />
            <BottomNavigationAction label='Drinks' icon={<LocalBar />} />
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
          <TextField
            fullWidth
            className={classes.textField}
            variant='outlined'
            onChange={debouncedHandle300}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <div className={classes.rootImageList}>
            <div>
              <ImageList
                cols={device === DEVICES.mobile ? 1 : device === DEVICES.tablet ? 2 : 4}
                gap={5}
                rowHeight={180}
                className={classes.imageList}>
                {renderContent()}
              </ImageList>
            </div>
            <div className={classes.orderWrap}>
              <div className={classes.wrap}>
                <Typography variant='button' align='center'>
                  Order list
                </Typography>
                <Button onClick={() => setOrders([])} color='secondary' size='small'>
                  clear
                </Button>
              </div>

              <Divider />
              <List disablePadding dense className={classes.orderList}>
                {orders.map((item, index) => {
                  return (
                    <ListItem classes={classes.shadow} key={index + item.str + item.strThumb}>
                      <ListItemAvatar>
                        <Avatar className={classes.small} variant='rounded' src={item.strThumb} />
                      </ListItemAvatar>
                      <ListItemText>{item.str}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton size='small' onClick={() => setOrders(orders.filter((e, i) => index !== i))}>
                          <RemoveCircle />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
              <Button size='large' color='primary' onClick={() => onAddItem(orders)} disabled={!orders.length}>
                Confirm order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
