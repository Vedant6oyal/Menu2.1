/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles, Card, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { colors, icons } from "../../theme";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "#fff",
    borderRadius: 10,
    marginTop: 7,
    padding: "7px 8px",
    height: 200,
    width: '100%',
    display: 'flex',
    cursor: 'pointer',
  },
  containerWithoutImage: {
    height: 150,
  },
  productsDetailsContainer: {
    width: '50%',
  },
  productsImage: {
    height: 168,
    width: "100%",
    backgroundRepeat: "round",
    position: "relative",
    borderRadius: 10,
    objectFit: "cover",
    display: 'flex',
    justifyContent: 'center',
  },
  flCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  vegIconStyle: {
    width: 16,
    height: 16,
    backgroundColor: colors.whiteColor,
  },
  ratingContainer: {
    height: 17,
    width: 37,
    background: colors.orangeLight,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  starIcon: {
    color: colors.whiteColor,
    fontSize: 10,
  },
  ratingValue: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 11,
    color: colors.whiteColor,
  },
  productName: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 16,
    color: colors.baseColor,
    lineHeight: 1.3,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginTop: 20,
  },
  descriptionOuter: {
    marginTop: 8,
    height: 29,
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  productDescription: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 14,
    color: colors.grayColor,
    lineHeight: 1,
  },
  amountText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 14,
    color: colors.baseColor,
    marginTop: 50,
  },
  amountMargin: {
    marginTop: 15,
  },
  priceContainer: {
    height: 36,
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
    borderRadius: 20,
    border: `1px solid ${colors.borderColor}`,
    position: 'absolute',
    bottom: 10,
    zIndex: 10,
    right: 'calc(25% - 40px)',
    background: colors.whiteColor,
  },
  minusText: {
    fontFamily: "Poppins",
    fontSize: 19,
    fontWeight: 600,
    color: colors.baseColor,
    cursor: "pointer",
  },
  countValue: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 600,
    color: colors.orangeColor,
    marginLeft: 8,
    marginRight: 8,
    padding: "0px 5px",
    background: colors.whiteColor,
    border: `1px solid ${colors.orangeColor}`,
    borderRadius: "50%",
    height: 20,
    display: "flex",
    alignItems: "center",
  },
  addButtonContainer: {
    height: 36,
    width: 91,
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 20,
    border: `1px solid #EF5908`,
    position: 'absolute',
    bottom: 10,
    background: colors.whiteColor,
    zIndex: 10,
    right: 'calc(25% - 45px)',
  },
  addText: {
    color: '#EF5908',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "Poppins",
  },
  addButtonHeight: {
    bottom: 57
  },
}));

const ProductList = ({ data, setIsProductsDetails, handleSelctedItem, selectedData }) => {
  const classes = useStyles();
  const filterItem = selectedData.filter((k) => {
    return k.userData.id === data.id;
  });

  const [itemNumber, setItemNumber] = useState(
    filterItem && filterItem.length ? filterItem[0].count : 0
  );
  const handleDecrement = () => {
    if (itemNumber > 0) {
      setItemNumber(itemNumber - 1);
      handleSelctedItem(data, itemNumber - 1);
    }
  };

  const handleIncrement = () => {
    setItemNumber(itemNumber + 1);
    handleSelctedItem(data, itemNumber + 1);
  };

  useEffect(() => {
    setItemNumber(filterItem && filterItem.length ? filterItem[0].count : 0);
  }, [selectedData]);

  return (
    <div style={{ position: 'relative' }}>

      {itemNumber === 0 ? (
        <div className={data.photo ? classes.addButtonContainer : [classes.addButtonContainer, classes.addButtonHeight].join(' ')} onClick={() => handleIncrement()}>
          <Typography className={classes.addText}>ADD</Typography>
        </div>
      ) : (
        <div className={data.photo ? classes.priceContainer : [classes.priceContainer, classes.addButtonHeight].join(' ')}>
          <div className={classes.minusText} onClick={() => handleDecrement()}>
            -
          </div>
          <Typography className={classes.countValue}> {itemNumber}</Typography>
          <div className={classes.minusText} onClick={() => handleIncrement()}>
            +
          </div>
        </div>
      )}


      <Card className={data.photo ? classes.container : [classes.container, classes.containerWithoutImage].join(' ')} onClick={() => setIsProductsDetails(data)}>
        <div className={classes.productsDetailsContainer} style={{ paddingRight: 10 }}>
          <div className={classes.flCenter}>
            <img
              src={data.veg ? icons.vegmark : icons.nonvegmark}
              alt="veg"
              className={classes.vegIconStyle}
            />
            <div className={classes.ratingContainer}>
              <Star className={classes.starIcon} />
              <Typography className={classes.ratingValue}>{data.rating}</Typography>
            </div>
          </div>
          <Typography className={classes.productName}>{data.name}</Typography>
          <div className={classes.descriptionOuter}>
            <Typography className={classes.productDescription}>
              {data.description}
            </Typography>
          </div>
          <Typography className={data.photo ? classes.amountText : [classes.amountText, classes.amountMargin].join(' ')}>₹{data.price}</Typography>
        </div>

        <div className={classes.productsDetailsContainer}>
          {data.photo ? (
            <div
              className={classes.productsImage}
              style={{
                backgroundImage: `url(${data.photo})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default ProductList;
