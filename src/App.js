import {React} from 'react';
import './App.css';


const iframe1 = '<iframe width="400" height="250" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/3?height=250&width=400&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Temperature&type=line"></iframe>';
const iframe2 = '<iframe width="400" height="250" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/2?height=250&width=400&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Humidity&type=line"></iframe>';
const iframe3 = '<iframe width="400" height="250" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/4?height=250&width=400&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Pressure&type=line"></iframe>';
const iframe4 = '<iframe width="400" height="250" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/5?height=250&width=400&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Soil+moisture&type=line"></iframe>';

function Iframe(props) {
  return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
}

function App() {
  return (
    <div className="App">
      <h1>Micro Weather Station</h1>
      <div className="graph">
        <Iframe iframe={iframe1} />
      </div>
      <div className="graph">
        <Iframe iframe={iframe2} />
      </div>
      <div className="graph">
        <Iframe iframe={iframe3} />
      </div>
      <div className="graph">
        <Iframe iframe={iframe4} />
      </div>
    </div>
  );
}



export default App;
