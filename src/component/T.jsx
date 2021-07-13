import React, { useState,useEffect } from 'react';
import { firestore } from '../firebase';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import EditModal from './EditModal';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import SimpleModal from './Modal';
import ItemDetails from './ItemsDetails';

function createData(rowId,ItemName, ItemCode,Category,ItemType, PurchasePrice ,item,url,tax , description) {
    console.log(ItemName)
  return  {rowId,ItemName, ItemCode,Category,ItemType, PurchasePrice,item,url,tax,description}
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Item Name' },
  { id: 'code', numeric: false, disablePadding: false, label: 'Item Code' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Item Type' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Purchase Price' },
  {id:"formInventory", numeric:false,disablePadding:false,label:" From Inventory"}
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(0),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [row,setRow] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  let rows=[];

 

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, row.length - page * rowsPerPage);

  const hancldeClickOfItem = () =>{

  }


  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, row.length - page * rowsPerPage);
  useEffect(async () =>{
    let db = firestore.collection("items");
  
   const snapshot = await db.get();
    
    snapshot.forEach(doc => {
     
     let docObj = doc.data();
     
     let obj
      = {
          
          itemId:doc.id,
          ItemName:docObj.name,
          ItemCode:docObj.code,
           Category:docObj.cate,
           ItemType:docObj.itemType,
           PurchasePrice:docObj.price,
           url:docObj.url,
           tax:docObj.tax,
           description:docObj.desc

        }
       
        const arr = [
            createData(obj.itemId, obj.ItemName , obj.ItemCode , obj.Category , obj.ItemType,obj.PurchasePrice,true,obj.url,obj.tax,obj.description )
        ]
        rows = [...rows,arr[0]];
        console.log(rows)
   });
    // row toh yha aa rha h 
   //console.log(rows)
   setRow([...rows])
   },[])
   useEffect(async () =>{
    let db = firestore.collection("inventory");
  
   const snapshot = await db.get();
    
    snapshot.forEach(doc => {
     
     let docObj = doc.data();
     console.log(docObj)
     let obj
      = {
          
          rowId:doc.id,
          ItemName:docObj.name,
          ItemCode:docObj.code,
           Category:docObj.cate,
           stockQuantity:docObj.stock,
           PurchasePrice:docObj.price,
           url:docObj.url,
           tax:docObj.tax,
           description:docObj.desc
        }
        console.log("i am inventory")
        const arr = [
            createData(obj.rowId,obj.ItemName , obj.ItemCode , obj.Category , "Product",obj.PurchasePrice,false,obj.url,obj.tax,obj.description )
        ]
        console.log(arr[0])
        rows = [...rows,arr[0]];
        
   });
    // row toh yha aa rha h 
   //console.log(rows)
   setRow([...rows])
   },[])

  return (
    <div className={classes.root}>
    
      <Paper className={classes.paper}>
        
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
            
              onRequestSort={handleRequestSort}
              rowCount={row.length}
            />
            <TableBody>
              {stableSort(row, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                
                  return (
                    
                    <TableRow
                      hover
                     
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ItemName}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                      <ItemDetails row={row} type={row.item} Rid={row.rowId} text= {row.ItemName}></ItemDetails>
                       
                      </TableCell>
                      <TableCell  style={{  marginRight:0  }} align="left"><ItemDetails row={row} type={row.item} Rid={row.rowId} text={row.ItemCode}></ItemDetails></TableCell>
                      <TableCell align="left"><ItemDetails type={row.item}row={row} Rid={row.rowId} text={row.Category}></ItemDetails></TableCell>
                      <TableCell align="left"><ItemDetails type={row.item} row={row} Rid={row.rowId} text={row.ItemType}></ItemDetails></TableCell>
                      <TableCell align="left"><ItemDetails type={row.item} row={row} Rid={row.rowId} text={row.PurchasePrice}></ItemDetails></TableCell>
                      <TableCell align="left">{row.item==false?<CheckIcon></CheckIcon>:<></>}</TableCell>
                      <TableCell  align="left">{row.item==true?<EditModal inventory={false} Rid={row.rowId}></EditModal>:<></>}</TableCell>
                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={row.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
     
  
   
    </div>
  );
}