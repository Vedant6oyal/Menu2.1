import React from "react";
import { makeStyles, Typography, Card } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { colors, icons } from "../../theme";

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
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    imageStyle: {
        width: '100%',
        height: '50%',
    },
    detailsContainer: {
        width: '100%',
        background: colors.whiteColor,
        padding: '14px 20px',
        borderBottom: '1px solid #D0D0D0',
    },
    flSpace: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vegIconStyle: {
        width: 16,
        height: 16,
        backgroundColor: colors.whiteColor
    },
    productName: {
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: 24,
        marginLeft: 8,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    flCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    amountText: {
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: 18,
        color: colors.baseColor,
    },
    descriptionOuter: {
        marginTop: 8,
        maxHeight: 58,
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
    },
    productDescription: {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: 14,
        color: colors.grayColor,
        lineHeight: 1.1,
    },
}));

const ProductsDetails = ({ handleClose, selectedData }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Card className={classes.headerContainer}>
                <div className={classes.iconOuter} onClick={() => handleClose()}>
                    <ArrowBack className={classes.arrowIcon} />
                </div>
                <Typography className={classes.labelText}>{selectedData && selectedData.name}</Typography>
            </Card>

            <img src={selectedData.photo} alt='product' className={classes.imageStyle} />

            <div className={classes.detailsContainer}>
                <div className={classes.flSpace}>
                    <div className={classes.flCenter}>
                        <img src={selectedData.veg ? icons.vegmark : icons.nonvegmark} alt='veg' className={classes.vegIconStyle} />
                        <Typography className={classes.productName}>{selectedData && selectedData.name}</Typography>
                    </div>
                    <Typography className={classes.amountText}>₹{selectedData.price}</Typography>
                </div>

                <div className={classes.descriptionOuter}>
                    <Typography className={classes.productDescription}>
                        {selectedData.description}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;
