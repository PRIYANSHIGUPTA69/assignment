import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ItemForm from './Item'
import InventoryForm from './InventoryForm';
import Button from '@material-ui/core/Button'; 
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import ItemEditForm from './ItemEditForm';
import InventoryEditForm from "./InventoryEditForm"
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

export default function EditModal(props) {
  const {inventory,Rid} = props
  console.log(Rid)
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
     {inventory==false? <ItemEditForm id={Rid}></ItemEditForm>:<InventoryEditForm id={Rid}></InventoryEditForm>}
    
    </div>
  );

  return (
    <div>
      <Button variant="contained"  onClick={handleOpen}>
        <CreateIcon></CreateIcon>
    </Button>
     
      
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