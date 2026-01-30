import './index.css';
import  App  from './App';
import { PreviewProvider } from "../../../context/PreviewContext";


function index() {
  return (
    <PreviewProvider>
       <App />
    </PreviewProvider>
  )
}

export default index
