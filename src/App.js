
  
import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, Button} from '@material-ui/core';
import QrReader from 'react-qr-reader';
import emailjs from 'emailjs-com';

  
//npm install react-qr-reader
//npm install @material-ui/core
function App() {
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);
  const templateID =  `template_vik2k6t`;
  const userID =  `user_jqPsmvHaIIb77uz5RM6hm`;



  
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
          
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorCamera= (error) => {
    console.log(error);
  }
  const handleScanCamera = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }
   var templateParams = {
     qrcode: scanResultFile
     
};

   const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default refresh by the browser
    emailjs.send("service_logistics_ES", templateID,templateParams,userID).then(function(response) {
      console.log(scanResultFile);
      console.log('SUCCESS!', response.status, response.text);
   }, function(error) {
      console.log('FAILED...', error);
   })};

  return (
    <Container className={classes.conatiner}>
          <Card>
              <h2 className={classes.title}>Logistics ES Company</h2>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button className={classes.btn} variant="contained" onClick={onScanFile}>Scan Qr Code</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>Scanned QR Code URL:</h3>
                        <a href={scanResultFile}> {scanResultFile} </a>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                         
                         <h2 className={classes.h1}>Qr Code Scan by Camera</h2>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorCamera}
                         onScan={handleScanCamera}
                         />
                         <h3>Scanned QR Code by camera URL:</h3>
                         <a href={scanResultWebCam}> {scanResultWebCam} </a>
                      </Grid>

                      <Button className={classes.btn} onClick={handleSubmit}>Send Confirmation</Button>
                  </Grid>
              </CardContent>
          </Card>
    </Container>
  );
  
}


const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 'auto'
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3366ff',
      color: '#fff',
      padding: 20
    },
    btn : {
      font_family: "Helvetica",
      font_size: 28,
      marginTop: 10,
      marginBottom: 20,
      color: "#ffffff",
      background: '#002266',
    },
    h1 : {
      font_family: "Helvetica",
      font_size: 28,
      marginTop: 10,
      marginBottom: 30,
      marginLeft: 50,
      justifyContent: 'center',
      color: "#002266",
      //background: '#002266',
      
      //logisticsES21
      //es20202021
   }
}));

export default App;
