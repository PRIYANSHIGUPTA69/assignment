import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { database, firestore, storage } from '../firebase';

import Modal from '@material-ui/core/Modal';
import ItemForm from './Item'
import InventoryForm from './InventoryForm';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import ItemEditForm from './ItemEditForm';

const useStyles = makeStyles((theme) => ({
    size:{
        borderBottom:"1px solid  #ccccb3",
        
        
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1),
      },
    type:{
        border:"1px solid  #ccccb3",
        marginTop:10,
        paddingTop:15,
        paddingBottom:15
    },
    ml:{
        marginLeft:10
    },
    center:{
        alignItems:"center"
    },
    input: {
        display: 'none',
    },
  }));

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



export default function ItemDetails(props) {
  const {Rid,text,type,row} = props
 
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [obj,setObject] = useState()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let str;
useEffect(()=>{
    console.log(Rid)
   
       if(type==true){
        database.items.doc(Rid).get().then(doc => {
            const newData = doc.data();
            //setPostData(newData);
            console.log(newData);
            setObject(newData)
            
        });
       
       }else{
        database.inventory.doc(Rid).get().then(doc => {
            const newData = doc.data();
            //setPostData(newData);
            console.log(newData);
            setObject(newData)
        });
       }
   
    
    
},[])
  const body = (
    <div style={modalStyle} className={classes.paper}>
     <div style={{width:"70vw"}}>
             
              <div style={{display:"flex", justifyContent:"space-between"}}>
                  <Typography>Item Details</Typography>
                  <Button>Edit</Button>
              </div>
              <div style={{display:"flex",width:"60vw", }}>
                  <div style={{marginLeft:30,width:"45%",borderRight:"1px solid"}}>
                      <Typography style={{ textAlign:"left",paddingBottom:10,paddingTop:10, marginBottom:50,borderBottom:"1px solid", borderTop:"1px solid"}}>General Details</Typography>
                      <img style={{paddingRight:90,paddingBottom:20,width:200, height:200,position:"relative"}} src= {row.url} ></img>
                     <Typography style={{textAlign:"left",paddingBottom:10}}><strong>Item Name :</strong>{row.ItemName} </Typography>
                     <Typography style={{textAlign:"left",paddingBottom:10}}><strong>Item Code :</strong> {row.ItemCode}</Typography>
                     <Typography style={{textAlign:"left",paddingBottom:10}}><strong>Item Category :</strong>{row.Category} </Typography>
                     <Typography style={{textAlign:"left",paddingBottom:10}}><strong>Item Type :</strong> {row.ItemType}</Typography>
                     <Typography style={{textAlign:"left",paddingBottom:10}}><strong>Item Description :</strong> {row.description}</Typography>
                      
                  </div >
                  <div style={{marginRight:30,width:"45%"}}>
                      <Typography style={{paddingBottom:10,paddingTop:10, marginBottom:50,borderBottom:"1px solid", borderTop:"1px solid"}}>Pricing Details</Typography>
                      <Typography style={{textAlign:"left",paddingLeft:30,paddingBottom:20}}><strong>Purchase Price</strong>{row.PurchasePrice} </Typography>
                      <Typography style={{textAlign:"left",paddingLeft:30,paddingBottom:20}}><strong>Tax Rate</strong> {row.tax}</Typography>
                  </div>
              </div>
              {/** Category: "category"
ItemCode: "code"
ItemName: "item"
ItemType: "service"
PurchasePrice: "100"
item: true
rowId: "vCMIUrP5fvjPae5UqOBb"
url: */}
          </div>
    
    </div>
  );

  return (
    <div>
        <Typography variant="contained"  onClick={handleOpen}>
            {text}
        </Typography>
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