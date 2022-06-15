import React, { useState } from "react";
import { makeStyles, Typography, Grid, Card } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { colors } from "../../theme";
import AdvertisementLoading from "../components/AdvertisementLoading";
import AddOnsProduct from "../components/AddOnsProduct";
import "../../css/slider.css";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  backHeader: {
    width: "100%",
    height: 56,
    display: "flex",
    position: "relative",
    alignItems: "center",
    marginBottom: 10,
  },
  iconOuter: {
    marginLeft: "4.67%",
    cursor: "pointer",
    background: "#EF5908",
    height: 25,
    width: 25,
    borderRadius: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 18,
    color: "#fff",
  },
  labelText: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 18,
    color: colors.darkCharcoal,
    marginLeft: 10,
  },
  sliderContainer: {
    marginLeft: "4.67%",
    marginRight: "4.67%",
  },
}));

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
    rating: 4.3,
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
    type: "Food",
    rating: 4.3,
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
      "https://images.pexels.com/photos/9975765/pexels-photo-9975765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 400,
    priceRating: 3,
    rating: 4.3,
    type: "Ad",
    veg: false,
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-project-3195b.appspot.com/o/videos%2Ficecream.mp4?alt=media&token=59534d89-f80c-438c-a930-3bbd5500011d",
  },
];

const AddOns = ({ handleClose, selectedData, handleSelctedItem }) => {
  const classes = useStyles();
  const [foodMenuList, setFoodMenuList] = useState(foodList);

  const handleCloseAdv = (item) => {
    const resultsList = foodMenuList.filter((k) => {
      return k.id !== item.id;
    });
    setFoodMenuList(resultsList);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.backHeader}>
        <div className={classes.iconOuter} onClick={() => handleClose()}>
          <Close className={classes.closeIcon} />
        </div>
        <Typography className={classes.labelText}>Addons</Typography>
      </Card>

      <div className={classes.sliderContainer}>
        <Grid container spacing={2}>
          {foodMenuList.map((item, index) => (
            <Grid
              item
              xs={item.type === "Ad" ? 12 : 12}
              md={item.type === "Ad" ? 12 : 6}
              lg={item.type === "Ad" ? 12 : 4}
              xl={item.type === "Ad" ? 12 : 3}
            >
              {item.type === "Ad" ? (
                <AdvertisementLoading
                  data={item}
                  index={index}
                  key={`ad-${index}`}
                  handleSelctedItem={handleSelctedItem}
                  selectedData={selectedData}
                  handleCloseAdv={handleCloseAdv}
                  isAutoPlay
                />
              ) : (
                <AddOnsProduct
                  data={item}
                  key={`pr-${index}`}
                  handleSelctedItem={handleSelctedItem}
                  selectedData={selectedData}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default AddOns;
