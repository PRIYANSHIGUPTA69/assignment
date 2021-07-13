import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ItemForm from './Item'
import InventoryForm from './InventoryForm';
import Button from '@material-ui/core/Button'; 
import AddIcon from '@material-ui/icons/Add';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 30 ;
  const left =30 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

export default function SimpleModal(props) {
  const {inventory} = props
 
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
     {inventory==false? <ItemForm ></ItemForm>:<InventoryForm></InventoryForm>}
    
    </div>
  );

  return (
    <div>
      {inventory == true? <Button variant="contained" color="primary" onClick={handleOpen}>
        <AddIcon></AddIcon>
         Add To Inventory
    </Button>:<Button variant="contained" color="primary" onClick={handleOpen}>
        <AddIcon></AddIcon>
         Add To Item
    </Button>}
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}