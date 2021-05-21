import {useState,Component,useEffect} from 'react'
import greenlightoff from '../img/Off_Green.png';
import greenlighton from '../img/On_Green.png';
import redlightoff from '../img/Off_Red.png';
import redlighton from '../img/On_Red.png';
import {
    Container, Col, Form,
    FormGroup, Label, Input,Button,Row
   
  } from 'reactstrap';
    import './ValvePop.css'
    import io from "socket.io-client";
    let socket;
    const CONNECTION_PORT = "localhost:5000/";
  

function ValvePop() {

    const[mode,setMode] =useState(null)
    const [stateVF,setStateVF] = useState([]);


    /// Connect 
    useEffect(() => {
      socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);
    ///State
  useEffect(() => {
    socket.on("VF", (data) => {
      setStateVF(data);
       
        
        });
 });

    ///Mode
    const btnSetClick =async()=>{
        
      await socket.emit('VAF_Mode',mode)}

    
    ///Set Open
    const btnOpenClick =async()=>{
     
      await socket.emit('Button','VAF_OPEN')}
      ///Set Close
    const btnCloseClick =async()=>{
        
      await socket.emit('Button','VAF_CLOSE')}
      ///Set Reset
    const btnResetClick =async()=>{
        await socket.emit('Button','VAF_RESET')}
       
    
    return (
        <Container>
     

        <Form className='valvepop'>
        <Row form>
          <div className='select-mode'>
          <Col >
            <FormGroup >
            
              <Label>Mode :</Label>
              <Input className='valve-select-mode' type="select" name="Mode" id="modeSelect" onChange={(e)=>setMode(e.target.value)}>
              <option value ='2'> Auto </option>
             <option value ='1'> Man </option>
             </Input>
             <Button onClick={btnSetClick} className ='btnset'> SET </Button>
             
             
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
            <div className="controlbtn">
                <Label>Control : </Label>
                <Button className='btnopen'  onClick={btnOpenClick} >Open</Button> {' '}
                <Button className='btnclose' onClick={btnCloseClick} >Close</Button> 
                <Button className='btnreset'onClick={btnResetClick} >Reset</Button>
              </div>
            </FormGroup>
          </Col>
          </div>
          <div className="valve-running">
          <Col>
            {/* <Label>Running Time</Label> */}
            <FormGroup>
                
              <Label>Position</Label>
              <Input placeholder="0.00%" />
            </FormGroup>
            
          </Col>
          </div>
          
        </Row>
        <Row form>
          <Col>
            <FormGroup>
            <div className='valve-status-light'>
            <Label> High limit </Label>
            <img className="valvehighlight" src ={stateVF ?  redlighton : redlightoff } />
            <Label>Low limit </Label>
            <img className="valvelowlight" src ={stateVF ?  redlighton : redlightoff } />


            <Label>Opened</Label>
            <img className="valveopenlight" src ={stateVF.OPENED? greenlighton : greenlightoff}/>
             <Label>Closed</Label>
            <img className="valvecloselight" src ={stateVF.CLOSED ? greenlighton : greenlightoff}/>


             <Label> Fault </Label>
            <img className="valvefaultlight" src ={stateVF.FAULT ?  redlighton : redlightoff } />
             </div>
            </FormGroup>
          </Col>
        </Row>
         
        </Form>
      </Container>
    )
}

export default ValvePop