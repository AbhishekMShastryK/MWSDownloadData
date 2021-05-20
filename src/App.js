import {React,useEffect,useState} from 'react';
import './App.css';
import { CSVLink } from "react-csv";


function App() {
  const [data1, setData1] = useState(null)
  const [channelDataLastEntryID1, setChannelDataLastEntryID1] = useState(0)
  const [data2, setData2] = useState(null)
  const [channelDataLastEntryID2, setChannelDataLastEntryID2] = useState(0)
  const [dataAgg, setDataAgg] = useState(null)
  const [channelDataLastEntryIDAgg, setChannelDataLastEntryIDAgg] = useState(0)
  useEffect(()=>{
    load()
  },[channelDataLastEntryID1])
  
  async function load() {
    const res1 = await fetch(`https://api.thingspeak.com/channels/1384648/feeds.json`)
    const resJson1 = await res1.json()
    const channelDataLastEntryID1 = resJson1.channel.last_entry_id
    setChannelDataLastEntryID1(channelDataLastEntryID1)
    const res2 = await fetch(`https://api.thingspeak.com/channels/1392064/feeds.json`)
    const resJson2 = await res2.json()
    const channelDataLastEntryID2 = resJson2.channel.last_entry_id
    setChannelDataLastEntryID2(channelDataLastEntryID2)
    const resAgg = await fetch(`https://api.thingspeak.com/channels/1392796/feeds.json`)
    const resJsonAgg = await resAgg.json()
    const channelDataLastEntryIDAgg = resJsonAgg.channel.last_entry_id
    setChannelDataLastEntryIDAgg(channelDataLastEntryIDAgg)
    const csvUrll =  await fetch(`https://api.thingspeak.com/channels/${1384648}/feeds.json?timezone=Asia/Kolkata&results=${channelDataLastEntryID1}`)
    const csvData1 =  await csvUrll.json()
    setData1(csvData1)
    const csvUrl2 =  await fetch(`https://api.thingspeak.com/channels/${1392064}/feeds.json?timezone=Asia/Kolkata&results=${channelDataLastEntryID2}`)
    const csvData2 =  await csvUrl2.json()
    setData2(csvData2)
    const csvUrlAgg =  await fetch(`https://api.thingspeak.com/channels/${1392796}/feeds.json?timezone=Asia/Kolkata&results=${channelDataLastEntryIDAgg}`)
    const csvDataAgg =  await csvUrlAgg.json()
    setDataAgg(csvDataAgg)
   
  }
  
  const csvList1 = []
  const csvList2 = []
  const csvListAgg = []
  const headers = [
    { label: "Time", key: "created_at" },
    { label: "Temperature", key: "field1" },
    { label: "Humidity", key: "field2" },
    { label: "Pressure", key: "field3" },
    { label: "Soil Moisture", key: "field4" },
    { label: "UV Index", key: "field5" },
   
  ];
  
  for (let i=0;i<channelDataLastEntryID1;i++) {
    csvList1.push(data1.feeds[i])
 
}
console.log(csvList1)

  for (let j=0;j<channelDataLastEntryID2;j++) {
    csvList2.push(data2.feeds[j])
  }


  for (let k=0;k<channelDataLastEntryIDAgg;k++) {
    csvListAgg.push(dataAgg.feeds[k])
  }


  const csvReport1 = {
    data: csvList1,
    headers: headers,
    filename: 'MWSNode1.csv'
  };
  const csvReport2 = {
    data: csvList2,
    headers: headers,
    filename: 'MWSNode2.csv'
  };
  const csvReportAgg = {
    data: csvListAgg,
    headers: headers,
    filename: 'MWSAggregate.csv'
  };

  return (
    <div className="App">
      <h1>Micro Weather Station</h1>
      <p>The below links are the data from Micro Weather Station Node 1, Node 2 and aggregate of both the nodes.</p><br />
      <div className="data1">
      <CSVLink {...csvReport1}>Download Node 1</CSVLink>
      </div>
      <div className="data2">
      <CSVLink {...csvReport2}>Download Node 2</CSVLink>
      </div>
      <div className="dataAgg">
      <CSVLink {...csvReportAgg}>Download Aggregate</CSVLink>
      </div>
      
    </div>
  );
}



export default App;
