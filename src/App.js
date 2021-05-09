import {React,useState,useLayoutEffect} from 'react';
import './App.css';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  return <span>Window size: {width} x {height}</span>;
}

const iframe1 = '<iframe width="450" height="260" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/3?bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Temperature&type=line"></iframe>';
const iframe2 = '<iframe width="450" height="260" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/2?bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Humidity&type=line"></iframe>';
const iframe3 = '<iframe width="450" height="260" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/4?bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Pressure&type=line"></iframe>';
const iframe4 = '<iframe width="450" height="260" style="border: 3px solid #666666;" src="https://thingspeak.com/channels/1384648/charts/5?bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=30&title=Soil+moisture&type=line"></iframe>';

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
