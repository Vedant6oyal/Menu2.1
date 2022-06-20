import React, { useEffect, useState, useRef } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  DialogContent,
  Dialog,
  Checkbox,
  AppBar,
  CssBaseline,
} from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import clsx from "clsx";
import Slider from "react-slick";
import { colors, icons } from "../../theme";
import ProductList from "../components/ProductList";
import AdvertisementLoading from "../components/AdvertisementLoading";
import ShowOrder from "./ShowOrder";
import ProductsDetails from "./ProductsDetails";
import AddOns from "./AddOns";
import Header from "../components/Header";
import "../../css/slider.css";

const { innerHeight: height } = window;
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    background: "#fff",
    position: "relative",
    paddingBottom: 50,
    paddingTop: 1,
  },
  fullWidth: {
    width: "100%",
    height: 62,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#fff",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    justifyContent: "center",
    height: 62,
    marginTop: 56,
  },
  labelContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flCenter: {
    display: "flex",
    alignItems: "center",
  },
  sliderContainer: {
    background: "rgba(255, 166, 71, .20)",
    display: "flex",
    height: 61,
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 62,
    padding: "19px 4.68%",
  },
  listlabelTex: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 16,
    color: colors.baseColor,
  },
  showOrderContainer: {
    position: "fixed",
    bottom: 5,
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#EF5908",
    height: 70,
    borderRadius: 35,
    alignSelf: "center",
    marginLeft: "25%",
    cursor: "pointer",
    zIndex: 20,
    [theme.breakpoints.down("md")]: {
      width: "70%",
      marginLeft: "15%",
      height: 65,
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: 57,
      marginLeft: "5%",
    },
  },
  showOrderText: {
    fontFamily: "Poppins",
    fontWeight: 800,
    fontSize: 22,
    color: colors.whiteColor,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
  bagIconContainer: {
    width: 39,
    height: 39,
    borderRadius: 20,
    background: colors.whiteColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 6,
  },
  baskerIcon: {
    fontSize: 22,
    color: "#EF5908",
  },
  showOrderPopup: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: height,
      height: height,
      width: "100%",
      maxWidth: "100%",
      marginLeft: 0,
      margin: 0,
    },
  },
  showAddPopup: {
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "90vh",
      height: "90vh",
      width: "90%",
      maxWidth: "90%",
      margin: 0,
    },
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginLeft: 7,
    color: colors.orangeColor,
  },
  dialogContainer: {
    padding: 0,
    paddingTop: 0,
    "&:first-child": {
      paddingTop: 0,
    },
  },
  icon: {
    borderRadius: 2,
    width: 15,
    height: 15,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#fff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#017F01",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 15,
      height: 15,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
  scrollOuter: {
    display: 'flex',
    overflow: 'scroll',
    scrollBehavior: 'smooth'
  }
}));

const categoryFoodData = [
  {
    id: 1,
    name: "Rice",
    icon: icons.rice_bowl,
  },
  {
    id: 2,
    name: "Noodles",
    icon: icons.noodle,
  },
  {
    id: 3,
    name: "Hot Dogs",
    icon: icons.hotdog,
  },
  {
    id: 4,
    name: "Salads",
    icon: icons.salad,
  },
  {
    id: 5,
    name: "Burgers",
    icon: icons.hamburger,
  },
  {
    id: 6,
    name: "Pizza",
    icon: icons.pizza,
  },
  {
    id: 7,
    name: "Snacks",
    icon: icons.fries,
  },
  {
    id: 8,
    name: "Sushi",
    icon: icons.sushi,
  },
  {
    id: 9,
    name: "Desserts",
    icon: icons.donut,
  },
];

const categoryDrinkData = [
  {
    id: 1,
    name: "Cocktail",
    icon: icons.drink,
  },
  {
    id: 2,
    name: "Vegetables Juice",
    icon: icons.vegitableJuiceIcon,
  },
  {
    id: 3,
    name: "Soup",
    icon: icons.soupIcon,
  },
];

const foodList = [
  {
    category: "Rice",
    description: "Vareniki with mashed potatoes and fried chanterelles",
    id: 1,
    lactosefree: false,
    name: "Sushi",
    photo:
      "https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 245,
    priceRating: 2,
    rating: 4.7,
    type: "Food",
    veg: true,
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-project-3195b.appspot.com/o/videos%2Ficecream.mp4?alt=media&token=59534d89-f80c-438c-a930-3bbd5500011d",
  },
  {
    category: "Rice",
    description: "Coffee served Cold",
    id: 2,
    name: "Cold Coffee",
    photo:
      "https://images.pexels.com/photos/1889571/pexels-photo-1889571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 399,
    priceRating: 3,
    rating: 4.7,
    type: "Food",
    veg: true,
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-project-3195b.appspot.com/o/videos%2Fpexels-francesco-navarro-5915737.mp4?alt=media&token=2660ad30-c912-4154-800e-9363503300e4",
  },
  {
    category: "Drinks",
    description: "Vodka, tomato juice, lemon, tabasco, celery",
    id: 3,
    lactosefree: true,
    name: "Virgin Mohito",
    photo:
      "https://images.pexels.com/photos/4457152/pexels-photo-4457152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 300,
    priceRating: 2,
    rating: 4.3,
    type: "Drinks",
    veg: true,
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-project-3195b.appspot.com/o/videos%2Fvirgin-mojito.mp4?alt=media&token=cb7b4b8b-0734-48ef-b9f7-04d9451b509c",
  },
  {
    category: "Noodles",
    description: "Potatoes, carrots, onions, green onions",
    id: 4,
    lactosefree: true,
    name: "Ramen",
    photo:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
    price: 400,
    priceRating: 3,
    rating: "4.6",
    type: "Ad",
    veg: false,
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-project-3195b.appspot.com/o/videos%2Ficecream.mp4?alt=media&token=59534d89-f80c-438c-a930-3bbd5500011d",
  },
  {
    category: "Rice",
    description: "Vareniki with mashed potatoes and fried chanterelles",
    id: 5,
    lactosefree: false,
    name: "Sushi",
    photo:
      "https://images.pexels.com/photos/9975765/pexels-photo-9975765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 245,
    priceRating: 2,
    rating: 4.7,
    type: "Food",
    veg: true,
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-project-3195b.appspot.com/o/videos%2Ficecream.mp4?alt=media&token=59534d89-f80c-438c-a930-3bbd5500011d",
  },
  {
    category: "Rice",
    description: "Coffee served Cold",
    id: 6,
    name: "Cold Coffee",
    photo:
      "https://images.pexels.com/photos/9454726/pexels-photo-9454726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 399,
    priceRating: 3,
    rating: 4.7,
    type: "Food",
    veg: true,
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-project-3195b.appspot.com/o/videos%2Fpexels-francesco-navarro-5915737.mp4?alt=media&token=2660ad30-c912-4154-800e-9363503300e4",
  },
];

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => null;
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => null;

const settingCategory = {
  dots: false,
  edgeFriction: 1,
  swipeToSlide: true,
  infinite: false,
  accessibility: true,
  variableWidth: true,
  draggable: true,
  speed: 500,
  initialSlide: 0,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
};

const Welcome = () => {
  const classes = useStyles();
  const scrollRef = useRef();
  const [selectedData, setSelectedSelected] = useState([]);
  const [isShowList, setIsShowList] = useState(false);
  const [activeState, setActiveState] = useState(1);
  const [foodMenuList, setFoodMenuList] = useState(foodList);
  const [isAddPopup, setIsAddPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("AllFood");
  const [categories, setCategories] = useState(categoryFoodData);
  const [vegOnly, setVegOnly] = useState(false);
  const [isProductDetails, setIsProductsDetails] = useState("");

  useEffect(() => {
    if (selectedCategory === "AllFood") {
      let foodData = [];
      let typeSelected = activeState == 1 ? "Food" : "Drinks";
      fetch(
        "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Cafetesu/-N3ZFMorv1VFYdkCSCKy.json"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.map((foodItem) => {
            foodData.push(foodItem);
            // if (foodItem.category === selectedCategory) {
            //   foodData.push(foodItem);
            // }
          });
          // foodData.shift();

          if (vegOnly) {
            setFoodMenuList(
              foodData
                .filter((item) => item.type === typeSelected)
                .filter((item) => item.veg === vegOnly)
                .sort((a, b) => {
                  return a.id - b.id;
                })
            );
          } else {
            setFoodMenuList(
              foodData
                .filter((item) => item.type === typeSelected)
                .sort((a, b) => {
                  return a.id - b.id;
                })
            );
          }
        })
        .catch((e) => {
          alert(e);
        });
      return;
    }

    let foodData = [];
    fetch(
      "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Cafetesu/-N3ZFMorv1VFYdkCSCKy.json"
    )
      .then((response) => {
        //console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data[Object.keys(data)[0]]); // Gets  the random id given by firebase
        data.map((foodItem) => {
          foodData.push(foodItem);
          // if (foodItem.category === selectedCategory) {
          //   foodData.push(foodItem);
          // }
        });
        // foodData.shift(); // This will go if using firebase id (new)

        //alert(foodData[0]);
        if (vegOnly === true) {
          setFoodMenuList(
            foodData
              .filter((item) => item.veg === vegOnly)
              .filter((item) => item.category === selectedCategory)
              .sort((a, b) => {
                return a.id - b.id;
              })
          );
        } else {
          setFoodMenuList(
            foodData
              .filter((item) => item.category === selectedCategory)
              .sort((a, b) => {
                return a.id - b.id;
              })
          );
        }
      })
      .catch((e) => {
        alert(e);
      });
  }, [vegOnly]);

  useEffect(() => {
    if (selectedCategory === "AllFood") {
      return;
    }
    let foodData = [];
    fetch(
      "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Cafetesu/-N3ZFMorv1VFYdkCSCKy.json"
    )
      .then((response) => {
        //console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data[Object.keys(data)[0]]); // Gets  the random id given by firebase
        data.map((foodItem) => {
          foodData.push(foodItem);
          // if (foodItem.category === selectedCategory) {
          //   foodData.push(foodItem);
          // }
        });
        // foodData.shift(); // This will go if using firebase id (new)

        //alert(foodData[0]);
        if (vegOnly === true) {
          setFoodMenuList(
            foodData
              .filter((item) => item.veg === vegOnly)
              .filter((item) => item.category === selectedCategory)
              .sort((a, b) => {
                return a.id - b.id;
              })
          );
        } else {
          setFoodMenuList(
            foodData
              .filter((item) => item.category === selectedCategory)
              .sort((a, b) => {
                return a.id - b.id;
              })
          );
        }
      })
      .catch((e) => {
        alert(e);
      });
  }, [selectedCategory]);
  useEffect(() => {
    let foodCategories = [];
    let categoryTitle = activeState == 1 ? "foodCategories" : "drinkCategories";
    setSelectedCategory("AllFood");
    fetch(
      `https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Cafetesu/${categoryTitle}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((category) => {
          foodCategories.push(category);
        });
        //alert(foodCategories[0]);
        //setMenuItems(foodData);
      })
      .then(() => {
        setCategories(
          foodCategories.sort((a, b) => {
            return a.id - b.id;
          })
        );
      })
      .catch((e) => {
        alert(e);
      });

    if (selectedCategory === "AllFood") {
      let foodData = [];
      let typeSelected = activeState == 1 ? "Food" : "Drinks";
      fetch(
        "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Cafetesu/-N3ZFMorv1VFYdkCSCKy.json"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.map((foodItem) => {
            foodData.push(foodItem);
            // if (foodItem.category === selectedCategory) {
            //   foodData.push(foodItem);
            // }
          });
          // foodData.shift();

          if (vegOnly) {
            setFoodMenuList(
              foodData
                .filter((item) => item.type === typeSelected)
                .filter((item) => item.veg === vegOnly)
                .sort((a, b) => {
                  return a.id - b.id;
                })
            );
          } else {
            setFoodMenuList(
              foodData.filter((item) => item.type === typeSelected)
            );
          }
        })
        .catch((e) => {
          alert(e);
        });
      return;
    }
    let foodData = [];
    let typeSelected = activeState == 1 ? "Food" : "Drinks";
    fetch(
      "https://learn-project-3195b-default-rtdb.firebaseio.com/Restaurants/Cafetesu/-N3ZFMorv1VFYdkCSCKy.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((foodItem) => {
          foodData.push(foodItem);
          // if (foodItem.category === selectedCategory) {
          //   foodData.push(foodItem);
          // }
        });
        // foodData.shift();

        setFoodMenuList(foodData.filter((item) => item.type === typeSelected));
      })
      .catch((e) => {
        alert(e);
      });
  }, [activeState]);

  const handleSelctedItem = (data, count) => {
    const filterData = selectedData.filter((k) => {
      return k.userData.id === data.id;
    });
    if (filterData.length === 0) {
      const item = {
        userData: data,
        count: count,
      };
      setSelectedSelected([...selectedData, item]);
    }
    if (filterData.length === 1) {
      if (count === 0) {
        let copy = Object.assign([], selectedData);
        const copys = copy.filter((item) => {
          return item.userData.id !== data.id;
        });
        setSelectedSelected(copys);
      } else {
        const indexValue = selectedData.findIndex(
          (v) => v.userData.id === data.id
        );
        selectedData[indexValue].count = count;
        setSelectedSelected(selectedData);
      }
    }
    if (isAddPopup === false) {
      setIsAddPopup(data.addon);
    }
  };

  const handleCloseAdv = (item) => {
    const resultsList = foodMenuList.filter((k) => {
      return k.id !== item.id;
    });
    setFoodMenuList(resultsList);
  };

  const handleShowOrder = () => {
    setIsShowList(!isShowList);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSelectCategory = (selectedCat) => {
    setSelectedCategory(selectedCat);
    scrollToTop()
  };

  console.log('selectedCategory', selectedCategory);
  console.log('categories', categories)



  const categoryHeader = () => (
    <AppBar position="fixed" className={clsx(classes.appBar)}>
      <CssBaseline />
      <div className={[classes.fullWidth, 'scrollSchedular'].join(' ')}>
        {activeState === 1 ? (
          <div className={classes.sliderContainer}>
            <div className={classes.scrollOuter}>
              {categories.map((item) => (
                <div
                  className={item.name === selectedCategory ?
                    ['categoryContainer', 'categoryActiveContainer'].join(' ') :
                    'categoryContainer'
                  }
                  onClick={() => handleSelectCategory(item.name)}
                >
                  <img
                    src={item.icon}
                    alt="pImage"
                    className={classes.categoryIcon}
                  />
                  <Typography className={classes.categoryName} style={item.name === selectedCategory ? { color: colors.whiteColor } : {}}>
                    {item.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={classes.sliderContainer}
            style={{ background: "rgba(33, 81, 161, .20)" }}
          >
            <div className={classes.scrollOuter}>
              {categories.map((item, index) => (
                <div
                  className={item.name === selectedCategory ?
                    ['categoryContainer', 'categoryDrinkContainer'].join(' ') :
                    'categoryContainer'
                  }
                  key={`cat-${index}`}
                  onClick={() => handleSelectCategory(item.name)}
                >
                  <img
                    src={item.icon}
                    alt="pImage"
                    className={classes.categoryIcon}
                  />
                  <Typography className={classes.categoryName} style={item.name === selectedCategory ? { color: colors.whiteColor } : {}}>
                    {item.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppBar>
  );

  return (
    <Header activeState={activeState} handleActiveState={setActiveState}>
      <div ref={scrollRef} />
      <div className={classes.container}>
        {categoryHeader()}
        <div className={classes.listContainer}>
          <div className={classes.labelContainer}>
            <Typography className={classes.listlabelTex}>
              Popular Food
            </Typography>

            <div className={classes.flCenter}>
              <Checkbox
                color="black"
                checked={vegOnly}
                onChange={(e) => setVegOnly(!vegOnly)}
                checkedIcon={
                  <span
                    className={[classes.icon, classes.checkedIcon].join(" ")}
                  />
                }
                icon={<span className={classes.icon} />}
              />
              <Typography className={classes.groupLabelText}>
                Veg only
              </Typography>
            </div>
          </div>

          <Grid container spacing={2}>
            {foodMenuList.map((item, index) => (
              <Grid item xs={12} md={12} lg={12} xl={12}>
                {item.type === "Ad" ? (
                  <AdvertisementLoading
                    data={item}
                    index={index}
                    key={`ad-${index}`}
                    handleSelctedItem={handleSelctedItem}
                    selectedData={selectedData}
                    handleCloseAdv={handleCloseAdv}
                    isAutoPlay={true}
                  />
                ) : (
                  <ProductList
                    data={item}
                    key={`pr-${index}`}
                    handleSelctedItem={handleSelctedItem}
                    selectedData={selectedData}
                    setIsProductsDetails={setIsProductsDetails}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </div>

        {selectedData && selectedData.length ? (
          <div
            className={classes.showOrderContainer}
            onClick={() => handleShowOrder()}
          >
            <Typography className={classes.showOrderText}>
              Show Order
            </Typography>
            <div className={classes.bagIconContainer}>
              <ShoppingBasket className={classes.baskerIcon} />
            </div>
          </div>
        ) : null}

        {isShowList && (
          <Dialog
            open={isShowList}
            onClose={() => setIsShowList(!isShowList)}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className={classes.showOrderPopup}
          >
            <DialogContent className={classes.dialogContainer}>
              <ShowOrder
                handleClose={() => setIsShowList(!isShowList)}
                selectedData={selectedData}
                handleSelctedItem={handleSelctedItem}
              />
            </DialogContent>
          </Dialog>
        )}

        {isProductDetails && (
          <Dialog
            open={isProductDetails}
            onClose={() => setIsProductsDetails("")}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className={classes.showOrderPopup}
          >
            <DialogContent className={classes.dialogContainer}>
              <ProductsDetails
                handleClose={() => setIsProductsDetails("")}
                selectedData={isProductDetails}
              />
            </DialogContent>
          </Dialog>
        )}

        {isAddPopup && (
          <Dialog
            open={isAddPopup}
            onClose={() => setIsAddPopup(!isAddPopup)}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className={classes.showAddPopup}
          >
            <DialogContent className={classes.dialogContainer}>
              <AddOns
                handleClose={() => setIsAddPopup(!isAddPopup)}
                selectedData={selectedData}
                handleSelctedItem={handleSelctedItem}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Header>
  );
};

export default Welcome;
