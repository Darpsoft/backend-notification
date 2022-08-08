import {Request, Response} from 'express';
import {getCertFirebase} from '../functions/messaging.functions';
import admin from 'firebase-admin';

// This is for Firebase

admin.initializeApp({
  credential: admin.credential.cert(
    getCertFirebase(process.env.NODE_ENV ?? 'production'),
  ),
});

const options = {
  // Required for background/quit data-only messages on iOS
  contentAvailable: true,
  // Required for background/quit data-only messages on Android
  priority: 'high',
  // Time-to-live in seconds
  timeToLive: 0,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function notification(req: Request, res: Response) {
  try {
    const response = await admin.messaging().sendToDevice(
      req.body.tokens,
      {
        data: req.body.data,
      },
      options,
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({error});
  }
}
