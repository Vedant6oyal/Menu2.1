/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles, Card, Typography } from "@material-ui/core";
import { Star, } from '@material-ui/icons';
import { colors, icons } from "../../theme";

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#fff',
        borderRadius: 10,
        marginTop: 7,
        padding: '5px 4px',
        height: 193,
        boxShadow: '0px 1px 3px 0 rgb(0 0 0 / 16%)',
    },
    productsImage: {
        height: 193,
        width: '100%',
        backgroundRepeat: 'round',
        position: 'relative',
        borderRadius: 10,
    },
    ratingContainer: {
        height: 17,
        width: 37,
        background: colors.orangeLight,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 11,
        left: 12
    },
    starIcon: {
        color: colors.whiteColor,
        fontSize: 10,
    },
    ratingValue: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 11,
        color: colors.whiteColor,
    },
    vegIconStyle: {
        top: 11,
        position: 'absolute',
        right: 12,
        width: 16,
        height: 16,
        backgroundColor: colors.whiteColor
    },
    bottomContainer: {
        position: 'absolute',
        width: '100%',
        paddingBottom: 5,
        bottom: 1,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) )',
    },
    productName: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 18,
        color: colors.whiteColor,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 12
    },
    productAmount: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 12,
        color: colors.whiteColor,
        marginLeft: 12
    },
    priceContainer: {
        height: 27,
        display: 'flex',
        alignItems: 'center',
        padding: '0px 5px',
        borderRadius: 15,
        border: `1px solid ${colors.borderColor}`,
        background: colors.whiteColor,
        marginRight: 12,
    },
    minusText: {
        fontFamily: 'Poppins',
        fontSize: 19,
        fontWeight: 600,
        color: colors.baseColor,
        cursor: 'pointer',
    },
    countValue: {
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 600,
        color: colors.orangeColor,
        marginLeft: 8,
        marginRight: 8,
        padding: '0px 5px',
        background: colors.whiteColor,
        border: `1px solid ${colors.orangeColor}`,
        borderRadius: '50%',
        height: 20,
        display: 'flex',
        alignItems: 'center',
    },
}));

const AddOnsProduct = ({
    data,
    handleSelctedItem,
    selectedData,
}) => {

    const classes = useStyles();
    const filterItem = selectedData.filter(k => {
        return k.userData.id === data.id
    });
    const [itemNumber, setItemNumber] = useState(filterItem && filterItem.length ? filterItem[0].count : 0);

    const handleDecrement = () => {
        if (itemNumber > 0) {
            setItemNumber(itemNumber - 1);
            handleSelctedItem(data, itemNumber - 1)
        }
    };

    const handleIncrement = () => {
        setItemNumber(itemNumber + 1);
        handleSelctedItem(data, itemNumber + 1)
    };

    useEffect(() => {
        setItemNumber(filterItem && filterItem.length ? filterItem[0].count : 0);
    }, [selectedData])

    return (
        <Card className={classes.container}>

            <div className={classes.productsImage} style={{ backgroundImage: `url(${data.photo})`, }}>
                <div className={classes.ratingContainer}>
                    <Star className={classes.starIcon} />
                    <Typography className={classes.ratingValue}>{data.rating}</Typography>
                </div>
                <img src={data.veg ? icons.vegmark : icons.nonvegmark} alt='veg' className={classes.vegIconStyle} />

                <div className={classes.bottomContainer}>
                    <div>
                        <Typography className={classes.productName}>{data.name}</Typography>
                        <Typography className={classes.productAmount}>₹{data.price}</Typography>
                    </div>

                    <div className={classes.priceContainer} >
                        <div className={classes.minusText} onClick={() => handleDecrement()}>
                            -
                        </div>
                        <Typography className={classes.countValue}>{itemNumber}</Typography>
                        <div className={classes.minusText} onClick={() => handleIncrement()}>
                            +
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}


export default AddOnsProduct;

