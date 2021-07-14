import react, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Appbar from "./Appbar";
import MainPage from "./Appbar";
import { Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import SimpleModal from "./Modal";
import EmployeeForm from "./Item";
import { firestore, database, storage } from "../firebase";
import EnhancedTable from "./T";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import IconButton from '@material-ui/core/IconButton';
import StoreIcon from '@material-ui/icons/Store';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Button from '@material-ui/core/Button'; 
import InventoryTable from "./InventoryTable";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
    fontSize:15,
    fontWeight:"bold",
    color:"#000000",
    
  },
  title: {
    flexGrow: 1,
  },
  color:{
      backgroundColor:"#ffffff",
      alignItems:"center"
  },
  modal:{
    backgroundColor:"#1356d4",
            color:"#fff",
  }
}));
export default function Books() {
 const [inventory , setInventory] = useState(false)
  const classes = useStyles();
  const handleChange = () => {
    if(inventory == false){
      setInventory(!inventory)
    }
  }
  const handleChangeItem = () => {
    if(inventory == true){
      setInventory(!inventory)
    }
   
   }
  return (
    <>
      <div>
        <h4> Books </h4>
        <div
          style={{
            marginLeft: 80,
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            marginRight:80,
            borderBottom:"1px solid #a7a8a7"
          }}
        >
          <IconButton edge="start"  className={classes.menuButton} aria-label="menu">
           <StoreIcon />
           <Typography variant="body1" gutterBottom onClick={handleChange}>
            Inventory
          </Typography>
         </IconButton>
         <IconButton edge="start"  className={classes.menuButton} onClick={handleChangeItem} aria-label="menu">

         <StorefrontIcon/>
         <Typography variant="body1" gutterBottom>
            Items
          </Typography>
        
         </IconButton>
         <IconButton edge="start"  className={classes.menuButton} aria-label="menu">
          < AccountBalanceIcon/>
          <Typography variant="body1" gutterBottom>
            Expenss
          </Typography>
         </IconButton>
          
        </div>
        <div
          style={{
            marginLeft: 80,
            width: "80%",
            display: "flex",
            marginTop:20,
            justifyContent: "flex-end",
            marginRight:80,
           
          }}
        >
         
         

          
          </div>
        <div style={{ height: 400, width: "100%" }}>
          
        {inventory == false ? <SimpleModal inventory={inventory} ></SimpleModal>:<SimpleModal inventory={inventory}></SimpleModal>
        
        }
       {inventory==false?  <EnhancedTable></EnhancedTable>:<InventoryTable></InventoryTable>}
        </div>
      </div>
    </>
  );
}
