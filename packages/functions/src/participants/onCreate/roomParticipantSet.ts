import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Participant from "@sentrei/types/models/Participant";
import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Set participant for room
 */
const roomParticipantSet = functions.firestore
  .document("rooms/{roomId}/participants/{participantId}")
  .onCreate((snap, context) => {
    const {roomId} = context.params;

    const data = snap.data() as Participant.Response;
    return db.doc(`rooms/${roomId}`).update(<Room.AdminUpdate>{
      participants: admin.firestore.FieldValue.arrayUnion(data.uid),
      participantCount: admin.firestore.FieldValue.increment(1),
    });
  });

export default roomParticipantSet;
