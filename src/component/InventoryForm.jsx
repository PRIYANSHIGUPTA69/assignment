import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, } from '@material-ui/core';
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { database, storage } from '../firebase';
import uuid from 'react-uuid';
const useStyles = makeStyles((theme) => ({
    size:{
        borderBottom:"1px solid  #ccccb3",
        
        
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

const option = [
    {id:"10%",title:"10%"},
    {id:"20%",title:"20%"},
    {id:"30%",title:"30%"},
    {id:"40%",title:"40%"}
]
const options = [
    {id:"1",title:"FEET(FT)"},
    {id:"2",title:"INCHES(IN)"},
    {id:"3",title:"UNITS(UNT)"},
    {id:"4",title:"PIECES(PCS)"},
    {id:"5",title:"NUMBERS(NOS)"},
    {}
]
const Categoryoptions = [
    {id:"1",title:"Panel"},
    {id:"2",title:"Inverter"},
    {id:"3",title:"Wire"},
    {id:"4",title:"Other"},
    {}
]
export default function InventoryForm(props) {
    const [units,setUnit] = useState("");
    const [openingStock,setStock] = useState(0);
    const [itemName , setItemName]= useState("");
    const [category , setCategory] = useState("");
    const [itemCode , setitemCode] = useState("");
    const [description , setItemDescription] = useState("");
    const [price , setPrice] = useState("");
    const [taxRate , setTaxRate] = useState(0);
    const [file , setFile] = useState(null)
    const classes = useStyles();


    
    const handleInputFile = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
       
      
      
    }
    const handleSubmit = (e) =>{
     console.log("suc")
            //
            e.preventDefault()
       // 1. upload 
       const uploadTask = storage.ref(`/inventory/${uuid()}`).put(file);
       
       //   progress
       const f1 = snapshot => {
           const progress = snapshot.bytesTransferred / snapshot.totalBytes;
           console.log(progress)
           //this callback is for providing the progress
           
       }
       // err
       const f2 = (error) => {
           alert("There was an error in uploading the file");
           return;
       }
       // success
       const f3 = () => {
           uploadTask.snapshot.ref.getDownloadURL().then(async url => {
               // 2.  
               // post collection -> post document put 
               console.log(url);
               console.log(url,itemName,category,itemCode,description,price)
               let obj = {
                   url,
                  
                   name:itemName,
                   cate :category,
                   code: itemCode,
                   desc:description,
                   unit:units,
                   stock:openingStock,
                   price:price,
                   tax:taxRate,

                
               }
               let invObj = await database.inventory.add(obj);
               console.log(invObj)
             
           })
          
           
       }
       
       uploadTask.on('state_changed', f1, f2, f3) 
      
    }
    useEffect(() => {
        console.log("hii")
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <Typography >CREATE  ITEM</Typography>
            <Grid container>
                <Grid item xs={6} style={{borderRight:"1px solid #ccccb3"}} className={classes.size}>
                    <Typography className={classes.type}>General Details</Typography>
                    <div className="uploadImage">
                    <div className={classes.root}>
                        <label htmlFor="upload image">
                        <input  accept='image/*'  id="icon-button-file" type="file"
                           onChange={handleInputFile}
                        /></label>
                       
                    </div>
                    </div>
                    <Controls.Input
                        name="Item Name"
                        label="Item Name"
                        value={itemName}
                        onChange={(e)=>{setItemName(e.target.value)}}
                        
                        color='#000000'
                    />
                    <div style={{display:"flex"}}>
                    <Controls.Select
                         label="Category"
                         name="category"
                         value={category}
                         onChange={(e)=>{setCategory(e.target.value)}}
                        options= {Categoryoptions}
                       
                    />
                  
                    </div>
                   
                  
                    <Controls.Input
                        label="Item Code"
                        name="Item Code"
                        value={itemCode}
                        onChange={(e) => {setitemCode(e.target.value)}}
                       
                    />
                    <Controls.Input
                        label="Item Description"
                        name="Item Description"
                        value={description}
                        onChange={(e)=>{setItemDescription(e.target.value)}}
                    />
 <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                             />
                    </div>
                </Grid>
                <Grid item xs={6}  className={classes.size}>
                <Typography className={classes.type}
             >  Stock Details</Typography>
                    <div style={{display:"flex"}}>
                    <Controls.Select
                        name="unit"
                        label="Unit"
                        value={units}
                        onChange={(e)=>{setUnit(e.target.value)}}
                        options= {options}
                       
                    />
                    <Controls.Input
                        label="Opening Stock"
                        name="price"
                        value={openingStock}
                        onChange={(e)=>{setStock(e.target.value)}}
                    />
                    </div>
                    <Typography classNme={classes.center}>  Pricing Details</Typography>
                    <Controls.Input
                        label="price"
                        name="price"
                        value={price}
                        onChange={(e)=>{setPrice(e.target.value)}}
                    />
                    <Controls.Select
                        name="taxRate"
                        label="taxRate"
                        value={taxRate}
                        onChange={(e)=>{setTaxRate(e.target.value)}}
                        options= {option}
                       
                    />
                  
                </Grid>
            </Grid>
        </Form>
    )
}