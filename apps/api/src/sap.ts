import {
  Client,
  Pool,
  RfcClientOptions,
  RfcConnectionParameters,
} from 'node-rfc';
import fs from 'fs';
import path from 'path';
/*
 <add key="SAP_NAME" value="WPA" />
    <add key="SAP_USERNAME" value="EFRFC005" />
    <add key="SAP_PASSWORD" value="EFMOVIL1" />
    <add key="SAP_CLIENT" value="100" />
    <add key="SAP_APPSERVERHOST" value="10.128.160.40" />
    <add key="SAP_SYSTEMNUM" value="00" />
    <add key="SAP_LANGUAGE" value="en" />
    <add key="SAP_POOLSIZE" value="10" />

*/

// ABAP system RFC connection parameters
const abapSystem: RfcConnectionParameters = {
  // SIGMA PRD
  // user: 'EFRFC005',
  // passwd: 'EFMOVIL1',
  // client: '100',
  // ashost: '10.128.160.40',
  // sysnr: '00',
  // lang: 'en'

  // ALLIAX PRD
  // user: 'enino',
  // passwd: 'Edy02817',
  // client: '100',
  // ashost: '140.140.61.83',
  // sysid: 'PRD',
  // sysnr: '00',
  // lang: 'en'

  //INDELPRO DES
  user: 'prgr05',
  passwd: 'Passindqas#20',
  ashost: '10.241.0.9',
  /*ashost: '140.140.60.211',*/
  client: '100',
  sysid: 'DES',
  sysnr: '00',
  lang: 'en',
};

const client: Client = new Client(abapSystem);
(async function () {
  try {
    await client.open();
    const result = await client.call('STFC_CONNECTION', {
      REQUTEXT: 'Hello SAP!',
    });
    result.ECHOTEXT += '#';
    await client.call('STFC_CONNECTION', { REQUTEXT: result.ECHOTEXT });
    console.log(result.ECHOTEXT); // 'H€llö SAP!#'
  } catch (err) {
    console.error(err);
  }

  return;
  // try {
  //   await client.open();
  //   const functionName = 'ZCS_EXTRACT_WBS_2';
  //   const WBS_RESULT = await client.call(functionName, {
  //     P_BUKRS: 'IN10',
  //   });
  //   fs.writeFileSync(
  //     __dirname + '/RegistrosWBS-20200318.json',
  //     JSON.stringify(WBS_RESULT.TWBS)
  //   );

  //   for (let i = 0; i < 10; i++) {
  //     try {
  //       const registro = WBS_RESULT.TWBS[i];
  //       console.log('Trying record ' + registro.PROJK);
  //       const tabla = await client.call('ZCS_INF_SAI_AF', {
  //         POSID: registro.PROJK,
  //       });
  //       const archivo: any = fs.readFileSync(
  //         __dirname + '/DetalleWBS-20200318.json',
  //         {
  //           encoding: 'utf-8',
  //         }
  //       );
  //       const json = JSON.parse(archivo);
  //       json[registro.PROJK] = tabla;
  //       fs.writeFileSync(
  //         __dirname + '/DetalleWBS-20200318.json',
  //         JSON.stringify(json)
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   console.log('TERMINÓ EL PROCESO');
  //   await client.close();
  // } catch (ex) {
  //   console.error(ex);
  // }
})();

// const pool = new Pool(abapSystem);
// pool
//   .acquire()
//   .then((client: any) => {
//     client
//       .call('STFC_CONNECTION', { REQUTEXT: 'H€llö SAP!' })
//       .then((res: any) => {
//         console.log('STFC_CONNECTION call result:', res.ECHOTEXT);
//         console.log(pool.status);
//         pool.release(client);
//         console.log(pool.status);
//       })
//       .catch((err: any) => {
//         console.error('Error invoking STFC_CONNECTION:', err);
//       });
//   })
//   .catch((err: any) => {
//     console.error('could not acquire connection', err);
//   });

// // // create new client
// // const client = new rfcClient(abapSystem);

// // // echo SAP NW RFC SDK and nodejs/RFC binding version
// // console.log('Client version: ', client.version);

// // // open connection
// // client.connect(function(err: any) {
// //   if (err) {
// //     // check for login/connection errors
// //     return console.error('could not connect to server', err);
// //   }

// //   // invoke ABAP function module, passing structure and table parameters

// //   // ABAP structure
// //   const structure = {
// //     RFCINT4: 345,
// //     RFCFLOAT: 1.23456789,
// //     // or RFCFLOAT: require('decimal.js')('1.23456789'), // as Decimal object
// //     RFCCHAR4: 'ABCD',
// //     RFCDATE: '20180625' // in ABAP date format
// //     // or RFCDATE: new Date('2018-06-25'), // as JavaScript Date object
// //   };

// //   // ABAP table
// //   const table = [structure];

// //   client.invoke(
// //     'STFC_STRUCTURE',
// //     { IMPORTSTRUCT: structure, RFCTABLE: table },
// //     function(error: any, res: any) {
// //       if (error) {
// //         return console.error('Error invoking STFC_STRUCTURE:', error);
// //       }
// //       console.log('STFC_STRUCTURE call result:', res);
// //     }
// //   );
// // });
