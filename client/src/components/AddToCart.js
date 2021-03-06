import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CheckIcon from "@material-ui/icons/Check";
import Modal from '@material-ui/core/Modal';
import Location from './Location';

//modal postion on screen
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// default styles for modal elements
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    height: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(0),
    width: "100%"
  }
}));
//=================================
// functional component starts here
//=================================
const AddToCart = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // helper variable to define modal layout
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p className="added">Added to Cart</p>
      <Grid
        container spacing={8}
        id="cart-top"
        direction="row"
        alignItems="center"
      >
        <Grid item xs={1}>
          <CheckIcon id="check" />
        </Grid>
        <Grid item xs={2}>
          <img className="cart-image" src={props.images[0]} />
        </Grid>
        <Grid item xs={5}>
          {props.name}
        </Grid>
        <Grid item xs={2}>
          {props.option}
        </Grid>
        <Grid id="cart-price" item xs={2}>
          ${props.price}
        </Grid>
      </Grid>

      {/* conditionally renders the second item depending on whether or not the "geek-squad" option is checked */}
      {props.clicked &&
        <Grid
          container spacing={8}
          id="geek-squad"
          direction="row"
          alignItems="center"
        >
          <Grid item xs={1}>
            <CheckIcon id="check" />
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={5}>
            2-year Geek Squad Replacement
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid id="geek-price" item xs={2}>
            $9.99
          </Grid>
        </Grid>
      }

      <Button
        type="button"
        id="checkout"
        variant="contained"
        className={classes.button}
        size="large"
        startIcon={<ShoppingCartIcon />}
      >
        Checkout
        </Button>
    </div>
  );


  return (
    <div>
      <div id="shipping">
        <div id="pickupContainer">
          <strong id="pickup">Pickup in 1 hour at {props.location}</strong>
        </div>
        <Location locationClicker={props.locationClicker} />
        <Grid
          container
          className="shipping"
          direction="row"
          alignItems="center"
        >
          <strong>Shipping: </strong>
          <p>Free 2 Day Shipping to 78729</p>
        </Grid>
      </div>
      <div className="addtocart">
        <Button
          type="button"
          onClick={handleOpen}
          id="cartbutton"
          variant="contained"
          className={classes.button}
          size="large"
          startIcon={<ShoppingCartIcon />}
        >
          Add to Cart
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <Button
          id="bundle"
          variant="contained"
          className={classes.button}
          size="large"
        >
          Build A Bundle
          </Button>
        <Grid
          container
          className="compare"
          direction="row"
          alignItems="center"
        >
        </Grid>
      </div>
      <div className="offers">
        <h3>Cardmember Offers</h3>
        <a href="https://www.bestbuy.com/site/misc/my-best-buy/pcmcat309300050007.c?id=pcmcat309300050007">Get Rewards</a>
      </div>
    </div>
  );
};

export default AddToCart;