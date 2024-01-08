
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DropDown from './components/DropDown';

function App() {
const [languages , setLanguages] = useState([]);
const [toSet , setFrom] = useState("");
const [choose , setChoosed] = useState("");
const [res , setRes] = useState("");
const [input , setInput] = useState("")
const [isLoded , setIsLoded] = useState(false);


const fetchData = async() => {
const encodedParams = new URLSearchParams();
encodedParams.set('source_language', toSet);
encodedParams.set('target_language', choose);
encodedParams.set('text', input);

const options = {
  method: 'GET',
  url: 'https://text-translator2.p.rapidapi.com/getLanguages',
  headers: {
    'X-RapidAPI-Key': '36b9e1bcf6msh63a24f23f73d26cp1a69bejsn5858a2fe667b',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  }
};

    try {
      const response = await axios.request(options);
      if(response)
      setLanguages(response.data.data.languages);
    } catch (error) {
      console.error(error);
    }
}


const postData = async() => {

  if(toSet  === "" || input === "" || choose === ""){
    alert("please select the options || or write text");
    return;
  }else{

  const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '36b9e1bcf6msh63a24f23f73d26cp1a69bejsn5858a2fe667b',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: new URLSearchParams({
        source_language: toSet,
        target_language: choose,
        text: input
      })
    };

    try {
      setIsLoded(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setRes(result.data.translatedText);
      setIsLoded(false);
    } catch (error) {
      console.error(error);
    }
  }
}


  useEffect(() => {
    fetchData() 
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="containergap-1 w-3/6 m-auto mt-10 border p-6 flex flex-col gap-4 shadow-2xl rounded-lg">
    <div className="heading">Text Translator</div>
      <div>
        <DropDown languages={languages} setFrom={setFrom} setChoosed={setChoosed}/>
      </div>
      <div className="w-full text-areas flex  justify-around">
        <textarea name="" id="" cols="50" rows="5" className='text-xl border focus:outline-none resize-none p-2' onChange={(e) => setInput(e.target.value)}  value={input} placeholder='Write Something....'></textarea>
        <textarea name="" id="" cols="50" rows="5" className='border focus:outline-none resize-none p-3 pointer-events-none bg-opacity-10 bg-gray-400' value={isLoded ? "Loading..." : res} placeholder='result....'></textarea>
      </div>

      <button className='border p-2 w-full mt-4 hover:bg-white duration-200' onClick={postData}>Translate</button>
    </div>
  );
}

export default App;
