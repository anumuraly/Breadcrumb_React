import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [breadCrumb,setbreadCrumb] = useState([]);
  const [initData,setInitData] = useState();
  const [folderData,setFolderData] = useState();
  const [displayData,setDisplayData]=useState();
  useEffect(() => {
   fetch('https://anumuraly.github.io/breadcrumb.json')
        .then(response => response.json())
        .then(data =>{
          setInitData(data.children);
          setFolderData(Object.keys(data.children));
          setDisplayData(data.children);
        });
  },[]);

const handleNav = (data)=>{
  const index = breadCrumb.findIndex(b=>b ===data);
  let breadCrumbUpdated = breadCrumb.slice(0, index+1);
  let t = initData;
  for (const element of breadCrumbUpdated) {
      t = t[element].children;
  }
  setDisplayData(t);
  setFolderData(Object.keys(t));
  setbreadCrumb(breadCrumbUpdated)

}
const handleFolder = (data)=>{
  setbreadCrumb([...breadCrumb,data]);
  setFolderData(Object.keys(displayData[data].children))
  setDisplayData(displayData[data].children);
}
  return (
    
    <div className="App">
      <header>
  <i className="material-icons icon-menu">menu</i>
  <h1>Files </h1>
  <span></span>
  <i className="material-icons">add</i>
  <i className="material-icons">more_vert</i>
</header>

<main>
  <ul>
    {
      breadCrumb.map(b=>{
        return <li key={b} onClick={()=>handleNav(b)}>{b}</li>
      }
      )
    }
  </ul>
 
   {
    folderData && folderData.map(folder=>{
      if(displayData[folder].type === 'dir'){
 return(<div  key={folder} onClick={()=>handleFolder(folder)} className="folder">
        <i className="material-icons">folder</i>
        <h1>{folder}</h1>
      </div>)
      }else{
  return (<div  key={folder} className="folder">
        <i className="material-icons">insert_drive_file</i>
        <h1>{folder}</h1>
      </div>)
      }
      
    })
  } 
  
  
  
</main>
    </div>
  );
}

export default App;
