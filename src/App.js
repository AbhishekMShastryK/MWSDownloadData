import {React,useEffect,useState} from 'react';
import './App.css';
import { CSVLink } from "react-csv";
import moment from "moment";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Map from './Map';
import "leaflet/dist/leaflet.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  root1: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  button: {
    margin: theme.spacing(1),
    fontSize:25,
    fontWeight:'bold',
    backgroundColor:'#111111',
    
  },
}));

function App() {
  const classes = useStyles();
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [dataAgg, setDataAgg] = useState([])
  const [startDate, setStartDate] = useState(0)
  const [coord1, setCoord1] = useState(["12.9141", "74.856"])
  const [coord2, setCoord2] = useState(["12.9141", "74.856"])
  

  useEffect(() => {
      const getData1 = () => {
            fetch("https://api.thingspeak.com/channels/1384648/feeds.json?timezone=Asia/Kolkata&results=100000")
            .then(response => response.json())
            .then(data => {
              console.log(data)
              setCoord1([data.channel.latitude,data.channel.longitude])
              setData1(data.feeds.map(row => ({...row, created_at: moment(row.created_at).format("DD/MM/YYYY HH:mm:ss")})))
              
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
            setCoord2([data.channel.latitude,data.channel.longitude])
            setData2(data.feeds.map(row => ({...row, created_at: moment(row.created_at).format("DD/MM/YYYY HH:mm:ss")})))
          
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
          setDataAgg(data.feeds.map(row => ({...row, created_at: moment(row.created_at).format("DD/MM/YYYY HH:mm:ss")})))
          setStartDate(moment(data.feeds[0].created_at).format("DD/MM/YYYY HH:mm:ss"))

        })

        .catch((err) => {
          console.log(err)
        }
        )
  }
  getDataAgg()
},[])

    
  const headers = [
    { label: "Time (DD/MM/YY HH:mm:ss)", key: "created_at" },
    { label: "Temperature (°c)", key: "field1" },
    { label: "Humidity (%)", key: "field2" },
    { label: "Pressure (hPa)", key: "field3" },
    { label: "Soil Moisture (%)", key: "field4" },
    { label: "UV Index", key: "field5" },
    { label: "AQI (ppm)", key: "field6" },
   
  ];
  return (

    <div className="App">
      <h1>Micro Weather Station</h1>
      <div className="para1">
      <p>The below links are the data from Micro Weather Station Node 1, Node 2 and aggregate of both the nodes.</p><br />
      </div>
      <div className="para2">
      <p>Data collected from {startDate} with a total of {dataAgg.length} entries.</p>
      </div>
      <div className="gridView">
      <Grid container className={classes.root1} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={5} >
          
            <Grid key={0} item>
              <CSVLink style={{ textDecoration: 'none' }} data ={data1} headers={headers} filename = {'MWSNode1.csv'}  >
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >Node 1 Data</Button></CSVLink>
            </Grid>
            <Grid key={1} item>
            <CSVLink style={{ textDecoration: 'none' }} data ={data2} headers={headers} filename = {'MWSNode2.csv'} >
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >Node 2 Data</Button></CSVLink>
            </Grid>
            <Grid key={2} item>
            <CSVLink style={{ textDecoration: 'none' }} data ={dataAgg} headers={headers} filename = {'MWSAgg.csv'} >
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >Aggregate Data</Button></CSVLink>
            </Grid>
        </Grid>
      </Grid>
      </Grid>
      </div>
      <div className="nodeLocation">
        <p>MWS Node Location</p>
      </div>
      <div>
      <Map coord1={coord1} coord2={coord2}/>
     
      </div>
      
    </div>
  );
}



export default App;
