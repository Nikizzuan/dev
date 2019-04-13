import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// 
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//firebase deploy --only functions



exports.RequestQRPay = functions.firestore
    .document('QRrequest/{CustomerEmail}')
    .onCreate(async event => {
        
    

    let senderEmail: string;
    let retrieverEmail:  string = '';
    let pagetogo: string;
    let Dbid:  string = '';
    let CustomerNameref: string;
 //   let BillDueref: string = '';

    let titleMsg: string;
    let bodyMsg: string;

    if(event.data()!.QrStatus ===  'Request') {
      senderEmail =  event.data()!.CustomerEmail;
      retrieverEmail =  event.data()!.RetailerEmail;
      CustomerNameref =  event.data()!.CustomerName;
 
      Dbid =  event.data()!.RequestID;
      pagetogo =  'purchasedetail';
      titleMsg = 'New QR pay Request';
      bodyMsg = `${CustomerNameref} is Requesting to QR Pay!`;
    } else if (event.data()!.QrStatus ===  'Acception') {
      senderEmail =  event.data()!.RetailerEmail;
      retrieverEmail =  event.data()!.CustomerEmail;
      CustomerNameref =  event.data()!.CustomerName;
  
      Dbid =  event.data()!.RequestID;
      pagetogo =  'qrscan'; // x buat lgi
      titleMsg = 'Request Accept';
      bodyMsg = `${senderEmail} has accept your request!`;
    } else if (event.data()!.QrStatus ===  'Finish') {
      senderEmail =  event.data()!.CustomerEmail;
      retrieverEmail =  event.data()!.RetailerEmail;
      CustomerNameref =  event.data()!.CustomerName;
      Dbid =  event.data()!.RequestID;
      pagetogo =  'home';
      titleMsg = ' QR pay Request Successfully Process';
      bodyMsg = `Your Transaction is Successful`;
    } else {
      senderEmail =  event.data()!.RetailerEmail;
      retrieverEmail =  event.data()!.CustomerEmail;
      CustomerNameref =  event.data()!.CustomerName;
     Dbid =  event.data()!.RequestID;
      pagetogo =  'home';
      titleMsg = ' Request Decline';
      bodyMsg = `${senderEmail} has decline your request!`;
    }

     

    // Notification content
    const payload = {
      notification: {
          title: titleMsg,
          body: bodyMsg,
          sound:'default',
         click_action:'FCM_PLUGIN_ACTIVITY',
          icon: 'https://goo.gl/Fz9nrQ'
      },
  data:{
    landing_page: pagetogo,
 //   BillDue: BillDueref,
    CustomerName: CustomerNameref,
    QrCode: Dbid
  },
  //sentTime: 12566
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', retrieverEmail)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    let tokens = '';

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens = token
    })

    return admin.messaging().sendToDevice(tokens, payload)
    
});


exports.NotificationRequest = functions.firestore
    .document('notification/{notifiedStatus}')
    .onCreate(async event => {
        
    

    let pagetogo: string ='home';
    let titleMsg: string ='test from function';
    let bodyMsg: string ='test';
    let topic: string ='Users';

 



    const payload = {
      notification: {
          title: titleMsg,
          body: bodyMsg,
          sound:'default',
         click_action:'FCM_PLUGIN_ACTIVITY',
          icon: 'https://goo.gl/Fz9nrQ'
      },
  data:{
    landing_page: pagetogo,
  },
    }


    return admin.messaging().sendToTopic(topic, payload)
    
});
