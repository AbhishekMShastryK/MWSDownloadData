import {React,useEffect,useState} from 'react';
import './App.css';
import { CSVLink } from "react-csv";
import moment from "moment";

function App() {
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
    { label: "Time", key: "created_at" },
    { label: "Temperature", key: "field1" },
    { label: "Humidity", key: "field2" },
    { label: "Pressure", key: "field3" },
    { label: "Soil Moisture", key: "field4" },
    { label: "UV Index", key: "field5" },
    { label: "AQI", key: "field6" },
   
  ];
  // data1 = data1.map(row => ({...row, created_at: moment(row.created_at).format("YYYY-MM-DD")}))
  return (
    <div className="App">
      <h1>Micro Weather Station</h1>
      <p>The below links are the data from Micro Weather Station Node 1, Node 2 and aggregate of both the nodes.</p><br />
      <div className="data1">
      <CSVLink data ={data1} headers={headers} filename = {'MWSNode1.csv'} >Download Node 1</CSVLink>
      </div>
      <div className="data2">
      <CSVLink data ={data2} headers={headers} filename = {'MWSNode2.csv'} >Download Node 2</CSVLink>
      </div>
      <div className="dataAgg">
      <CSVLink data ={dataAgg} headers={headers} filename = {'MWSNodeAgg.csv'} >Download Node Aggregate</CSVLink>
      </div>
      
    </div>
  );
}



export default App;
