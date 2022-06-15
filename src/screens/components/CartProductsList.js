import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Card, } from "@material-ui/core";
import { colors } from "../../theme";

const useStyles = makeStyles((theme) => ({
    container: {
        height: 58,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        marginLeft: '4.67%',
        marginRight: '4.67%',
        marginBottom: 10,
    },
    productImage: {
        height: 45,
        width: 50,
        borderRadius: 5,
        marginLeft: 7,
    },
    productnameContainer: {
        marginLeft: 10,
    },
    productName: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 14,
        color: colors.baseColor,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    flRow: {
        display: 'flex',
        alignItems: 'center',
    },
    decrementOuter: {
        background: 'linear-gradient(#EF5908, #FFA647 )',
        width: 26,
        height: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: 4,
    },
    minusIcon: {
        fontFamily: 'Poppins',
        fontSize: 19,
        fontWeight: 600,
        color: colors.whiteColor,
        cursor: 'pointer',
    },
    countcontainer: {
        padding: '0px 9px',
        height: 19,
        marginLeft: 7,
        marginRight: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        border: '1px solid #FFA647',
        background: '#F9F8F8',
    },
    countText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: 500,
        color: colors.orangeLight
    },
}));

const CardProductList = ({
    data,
    count,
    handleSelctedItem,
}) => {
    const classes = useStyles();
    const [itemNumber, setItemNumber] = useState(count);

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
        setItemNumber(count);
    }, [count]);

    return (
        <Card className={classes.container}>
            <img src={data.photo} alt='product' className={classes.productImage} />

            <div className={classes.productnameContainer}>
                <Typography className={classes.productName} >{data.name}</Typography>
                <div className={classes.flRow}>
                    <div className={classes.decrementOuter} onClick={() => handleDecrement()}>
                        <Typography className={classes.minusIcon}>-</Typography>
                    </div>

                    <div className={classes.countcontainer}>
                        <Typography className={classes.countText}>{itemNumber}</Typography>
                    </div>

                    <div className={classes.decrementOuter} onClick={() => handleIncrement()}>
                        <Typography className={classes.minusIcon}>+</Typography>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CardProductList;
