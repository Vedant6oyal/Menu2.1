import React, { useState } from "react";
import { makeStyles, Typography, Card } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Slider from "react-slick";
import { colors } from "../../theme";
import CardProductList from "../components/CartProductsList";
import AdvertisementLoading from "../components/AdvertisementLoading";
import "../../css/slider.css";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    height: 56,
    display: "flex",
    position: "relative",
    alignItems: "center",
  },
  iconOuter: {
    marginLeft: "4.67%",
    cursor: "pointer",
  },
  arrowIcon: {
    fontSize: 26,
    color: "#EF5908",
    cursor: "pointer",
  },
  labelText: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 18,
    color: colors.darkCharcoal,
    marginLeft: 10,
  },
  listContainer: {
    width: "100%",
    padding: "5px 0px",
  },
  emptyText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 18,
    color: colors.darkCharcoal,
    textAlign: "center",
    marginTop: 20,
  },
  sliderContainer: {
    paddingRight: 10,
  },
}));

const { innerWidth: width } = window;
const foodList = [
  {
    category: "Mocktails",
    description: "Honey, sparkling water, ice, lime, mint",
    id: 1,
    lactosefree: false,
    name: "Virgin Mojito",
    photo:
      "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    price: 165,
    priceRating: 2,
    rating: "4.7",
    type: "Food",
    veg: true,
    video:
      "https://qqcdn.mxtakatak.com/video/200023TyAO/download/1/h264_high_720.mp4",
  },
  {
    category: "Desserts",
    description: "Chocolate cake with caramel sauce",
    id: 2,
    lactosefree: true,
    name: "Chocolate truffle",
    photo:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
    price: 400,
    priceRating: 3,
    rating: "4.6",
    type: "Food",
    veg: false,
    video:
      "https://qqcdn.mxtakatak.com/video/4aaa12c497fb2ab7746803b5d4642aba/download/1/h264_high_540.mp4",
  },
  {
    category: "Desserts",
    description: "Chocolate, Vanilla Ice Cream, Rasberry, Stawberry",
    id: 3,
    lactosefree: true,
    name: "Sensationa ",
    photo:
      "https://images.pexels.com/photos/4457151/pexels-photo-4457151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    price: 300,
    priceRating: 2,
    rating: 4.3,
    type: "Food",
    veg: true,
    video:
      "https://qqcdn.mxtakatak.com/video/200026iLxT/download/1/h264_high_720.mp4",
  },
];

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => null;
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => null;

const ShowOrder = ({ handleClose, selectedData, handleSelctedItem }) => {
  const classes = useStyles();
  const [foodMenuList, setFoodMenuList] = useState(foodList);
  const [activeSlide, setActiveSlide] = useState(0);

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
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
  };

  const handleCloseAdv = (item) => {
    const resultsList = foodMenuList.filter((k) => {
      return k.id !== item.id;
    });
    setFoodMenuList(resultsList);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.headerContainer}>
        <div className={classes.iconOuter} onClick={() => handleClose()}>
          <ArrowBack className={classes.arrowIcon} />
        </div>
        <Typography className={classes.labelText}>Show Order</Typography>
      </Card>

      {selectedData && selectedData.length ? (
        <div className={classes.listContainer}>
          {selectedData.map((k, index) => (
            <CardProductList
              key={`list-${index}`}
              data={k.userData}
              count={k.count}
              handleSelctedItem={handleSelctedItem}
            />
          ))}
        </div>
      ) : (
        <Typography className={classes.emptyText}>
          Your Cart is Empty{" "}
        </Typography>
      )}

      <div className={classes.sliderContainer}>
        <Slider {...settingCategory}>
          {foodMenuList.map((item, index) => (
            <div style={{ marginRight: 15 }}>
              <AdvertisementLoading
                data={item}
                key={`food-${index}`}
                index={index}
                handleSelctedItem={handleSelctedItem}
                selectedData={selectedData}
                handleCloseAdv={handleCloseAdv}
                outerContainer={width - 50}
                isAutoPlay={activeSlide === index}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ShowOrder;
