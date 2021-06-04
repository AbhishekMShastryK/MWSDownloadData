import {React,useEffect,useState} from 'react';
import './App.css';
import { CSVLink } from "react-csv";
import moment from "moment";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  button: {
    margin: theme.spacing(1),
    fontSize:25,
    fontWeight:'bold',
    backgroundColor:'#000000',
    
  },
}));

function App() {
  const classes = useStyles();
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [dataAgg, setDataAgg] = useState([])

  

  useEffect(() => {
      const getData1 = () => {
            fetch("https://api.thingspeak.com/channels/1384648/feeds.json?timezone=Asia/Kolkata&results=100000")
            .then(response => response.json())
            .then(data => {
              // console.log(data.feeds)
              setData1(data.feeds.map(row => ({...row, created_at: moment(row.created_at).format("DD/MM/YYYY HH:MM:ss")})))
            
            })
            .catch((err) => {
              console.log(err)
            }
            )
      }
      getData1()
  },[])

  useEffect(() => {
    const getData2 = () => {
          fetch("https://api.thingspeak.com/channels/1384648/feeds.json?timezone=Asia/Kolkata&results=100000")
          .then(response => response.json())
          .then(data => {
            // console.log(data.feeds)
            setData2(data.feeds.map(row => ({...row, created_at: moment(row.created_at).format("DD/MM/YYYY HH:MM:ss")})))
          
          })
          .catch((err) => {
            console.log(err)
          }
          )
    }
    getData2()
},[])

useEffect(() => {
  const getDataAgg = () => {
        fetch("https://api.thingspeak.com/channels/1384648/feeds.json?timezone=Asia/Kolkata&results=100000")
        .then(response => response.json())
        .then(data => {
          // console.log(data.feeds)
          setDataAgg(data.feeds.map(row => ({...row, created_at: moment(row.created_at).format("DD/MM/YYYY HH:MM:ss")})))
        
        })
        .catch((err) => {
          console.log(err)
        }
        )
  }
  getDataAgg()
},[])



    
// console.log("This is CSV LIST 1",data1)
  
  

  const headers = [
    { label: "Time (DD/MM/YY HH:MM:ss)", key: "created_at" },
    { label: "Temperature (°c)", key: "field1" },
    { label: "Humidity (%)", key: "field2" },
    { label: "Pressure (hPa)", key: "field3" },
    { label: "Soil Moisture (%)", key: "field4" },
    { label: "UV Index", key: "field5" },
    { label: "AQI (ppm)", key: "field6" },
   
  ];
  // data1 = data1.map(row => ({...row, created_at: moment(row.created_at).format("YYYY-MM-DD")}))
  return (

    <div className="App">
      <h1>Micro Weather Station</h1>
      <p>The below links are the data from Micro Weather Station Node 1, Node 2 and aggregate of both the nodes.</p><br />
      <div className="data1">
      <CSVLink style={{ textDecoration: 'none' }} data ={data1} headers={headers} filename = {'MWSNode1.csv'}  >
        <Button
        // style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px'}}
        variant="contained"
        color="primary"
       
        className={classes.button}
        startIcon={<SaveIcon />}
      >Node 1 Data</Button></CSVLink>
      </div>
      <div className="data2">
      <CSVLink style={{ textDecoration: 'none' }} data ={data2} headers={headers} filename = {'MWSNode2.csv'} >
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >Node 2 Data</Button></CSVLink>
      </div>
      <div className="dataAgg">
      <CSVLink style={{ textDecoration: 'none' }} data ={dataAgg} headers={headers} filename = {'MWSNodeAgg.csv'} >
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >Aggregate Data</Button></CSVLink>
      </div>
      
    </div>
  );
}



export default App;
