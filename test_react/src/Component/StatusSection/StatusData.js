import { useState, Component, useEffect } from "react";
import "./StatusData.css";

import {
  Container,
  Col,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import DailyReport from "../ReportPage/DailyReport";

// import Select from 'react-select'
import io from "socket.io-client";
let socket;
const CONNECTION_PORT = "localhost:5000/";

function StatusData() {
  const [pressure1, setPressure1] = useState(null);
  const [pressure2, setPressure2] = useState(null);
  const [pressure3, setPressure3] = useState(null);

  const [timecovert23, setTimecovert23] = useState(null);
  const [timecovert45, setTimecovert45] = useState(null);
  const [timeRinse, setTimeRinse] = useState(null);
  const [timeBackwash, setTimeBackwash] = useState(null);

  /// Connect
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);
  ///State
  useEffect(() => {
    socket.on('ns=3;s="DataSystem"."PS_Filter1_Set"', (data) => {
      setPressure1(data);
    });
    socket.on('ns=3;s="DataSystem"."PS_Filter2_Set"', (data) => {
      setPressure2(data);
    });
    socket.on('ns=3;s="DataSystem"."PS_RO_Set"', (data) => {
      setPressure3(data);
    });
    socket.on('ns=3;s="DataSystem"."TimeInvertPump23"', (data) => {
      setTimecovert23(data);
    });
    socket.on('ns=3;s="DataSystem"."TimeInvertPump45"', (data) => {
      setTimecovert45(data);
    });
    socket.on('ns=3;s="DataSystem"."Time_Rinse"', (data) => {
      setTimeRinse(data);
    });
    socket.on('ns=3;s="DataSystem"."Time_Backwash"', (data) => {
      setTimeBackwash(data);
    });
  });

  return (
    <div className="mid-container">
      <h2 className="report-status">Daily Report</h2>
      <div className="daily-report">
        <DailyReport />
      </div>
      <Form className="set-container">
        <h2 className="report-status">Parameters Setting</h2>
        <FormGroup className="timeclean-container">
          <Row>
            <ul className="time-clean">
              Time Clean
              <li>Time Backwash: {timeRinse / 1000} minutes</li>
              <li>Time Rinse: {timeBackwash / 1000} minutes</li>
            </ul>
          </Row>
          <Row>
            <ul className="time-convert">
              Time Convert
              <li>Convert Pump 2,3 : {timecovert23 / 1000} minutes</li>
              <li>Convert Pump 4,5 : {timecovert45 / 1000} minutes</li>
            </ul>
          </Row>
        </FormGroup>
        <FormGroup className="pressure-container">
          <Row>
            <ul className="set-pressure">
              Realtime Data
              <br></br>
              <br></br>
              <li>Filter Tank 1 Pressure: {pressure1} Bar</li>
              <li>Filter Tank 2 Pressure: {pressure2} Bar</li>
              <li>RO Pressure:{pressure3} Bar</li>
              <br></br>
              <li>Filter Tank 1 Flow: {pressure1} m3/s</li>
              <li>Filter Tank 2 Flow: {pressure2} m3/s</li>
              <li>RO Flow:{pressure3} m3/s</li>
            </ul>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
}

export default StatusData;
