
import { useState } from "react";
import axios from 'axios';
import Notification from "./Notification";

const FileUpload = () => {
    const [file, setFile] = useState(null) 
    const [uploadProg, setUploadProg] = useState({started: false, percent: 0})
    const [notification, setNotification] = useState({open: false})
    

    const handleUpload = () => {
        if (!file) {
            console.log("no file was selected");
            return 
        }
        const fd = new FormData(); 
        fd.append("file", file)
        setUploadProg((prevState)=> {return {...prevState, started: true}})
        console.log(process.env.REACT_APP_RUN_SETUP)
        const url = process.env.REACT_APP_RUN_SETUP === 'production' ? process.env.REACT_APP_PROD_SERVER_URL : process.env.REACT_APP_DEV_SERVER_URL
        axios.post(`${url}/api/upload`, fd , {
            onUploadProgress: (progressEvent) => {
                setUploadProg((prevState) => {return {...prevState, percent: progressEvent.progress *100 }})
            },
        }).then(res =>{
            console.log(res.status)
            console.log(res.data)
        }).catch(err => {
            console.error(err)
            setNotification(() => { return {open: true, vertical: "top", horizontal: "right", severity: "error", message:"could not upload file"}})
            console.log(notification)
        })
    }

 
    return (
        <div>
            <p>Upload File here</p>
            <input type="file" onChange={(e)=> { setFile(e.target.files[0])}} />
            {uploadProg.started && <progress max="100" value={uploadProg.percent}/>}
            <button onClick={handleUpload}> Submit </button>
            {notification.open && <Notification props={notification}/>}
        </div>
    )

}
export default FileUpload;