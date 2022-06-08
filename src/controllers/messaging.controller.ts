import {Request, Response} from 'express';
import {getCertFirebase} from '../functions/messaging.functions';

// This is for Firebase
const admin = require('firebase-admin');

const options = {
  // Required for background/quit data-only messages on iOS
  contentAvailable: true,
  // Required for background/quit data-only messages on Android
  priority: 'high',
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function notification(req: Request, res: Response) {
  /*  
    #swagger.tags = ['Messaging']
    #swagger.description = 'Send notification by topic' 


    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Body Notification', 
      required: true,
      schema: { $ref: "#/definitions/messaging-sendToTopic-req" }
    }

    #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/messaging-sendToTopic-res" },
      description: "Success send to notification"
    }
  */
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        getCertFirebase(process.env.NODE_ENV ?? 'production'),
      ),
    });

    const messaging = req.body;

    const notificationData = {
      data: messaging.data,
    };

    const response = await admin
      .messaging()
      .sendToTopic(messaging.topic, notificationData, {
        ...options,
        timeToLive: 3600,
      });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({error});
  }
}
