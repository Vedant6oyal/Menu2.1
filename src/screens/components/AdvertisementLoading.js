/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import { colors } from "../../theme";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    cardContainer: {
        position: 'relative',
        width: '30%',
        [theme.breakpoints.down("md")]: {
            width: '70%',
        },
        [theme.breakpoints.down("xs")]: {
            width: '100%',
        },
    },
    videoStyle: {
        borderRadius: 10,
    },
    closeContainer: {
        position: 'absolute',
        top: 10,
        right: 8,
        height: 20,
        width: 20,
        borderRadius: 10,
        background: colors.whiteColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    closeIcon: {
        fontSize: 16,
        color: colors.orangeColor
    },
    productName: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 16,
        color: colors.whiteColor,
        lineHeight: 1.3,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 10
    },
    descriptionOuter: {
        marginTop: 5,
        height: 25,
        paddingLeft: 10,
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical'
    },
    productDescription: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 11,
        color: colors.whiteColor,
        lineHeight: 1
    },
    productBottomContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
    },
    amountText: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 14,
        color: colors.whiteColor,
    },
    priceContainer: {
        height: 27,
        display: 'flex',
        alignItems: 'center',
        padding: '0px 5px',
        borderRadius: 15,
        border: `1px solid ${colors.borderColor}`,
        background: colors.whiteColor,
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
    detailsOuter: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
}));

const AdvertisementLoading = ({
    data,
    handleSelctedItem,
    handleCloseAdv,
    selectedData,
    outerContainer,
    isAutoPlay,
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
    }, [selectedData]);

    return (
        <div className={classes.container} style={outerContainer ? { width: outerContainer, marginRight: 20 } : {}}>
            <div className={classes.cardContainer} >

                <ReactPlayer
                    url={data.video}
                    muted={true}
                    className='react-player'
                    width='100%'
                    height='100%'
                    playing={isAutoPlay}
                    loop={isAutoPlay}
                    style={{ borderRadius: 15, }}
                    controls={false}
                    playsinline
                />


                {/* <video
                    width='100%'
                    height='100%'
                    autoPlay={isAutoPlay}
                    loop={isAutoPlay}
                    muted={true}
                    style={{ borderRadius: 15 }}
                >
                    <source src={data.video} />
                    Your browser does not support THIS video.
                </video> */}



                <div className={classes.closeContainer} onClick={() => handleCloseAdv(data)}>
                    <Close className={classes.closeIcon} />
                </div>

                <div className={classes.detailsOuter}>
                    <Typography className={classes.productName}>{data.name}</Typography>
                    <div className={classes.descriptionOuter}>
                        <Typography className={classes.productDescription}>{data.description} </Typography>
                    </div>

                    <div className={classes.productBottomContainer}>
                        <Typography className={classes.amountText}>₹{data.price}</Typography>

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
            </div>
        </div>
    )
}


export default AdvertisementLoading;
