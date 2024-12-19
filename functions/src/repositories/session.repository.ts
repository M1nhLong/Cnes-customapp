import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { db } from 'src/firebase.server';
import { Session } from '@shopify/shopify-api';

const sessionRef = db.collection('sessions');

@Injectable()
export class SessionRepository extends BaseRepository {
  constructor() {
    super();
    this.ref = sessionRef;
  }

  async storeSession(session: Session): Promise<boolean> {
    try {
      await this.ref.doc(session.id).set(session.toObject());
      return true;
    } catch (error) {
      console.error('Error storing session: ', error);
      return false;
    }
  }

  async loadSession(id: string): Promise<Session | undefined> {
    try {
      const doc = await this.ref.doc(id).get();
      if (!doc.exists) return undefined;
      return new Session(doc.data() as any);
    } catch (error) {
      console.error('Error loading session: ', error);
      return undefined;
    }
  }

  async deleteSession(id: string): Promise<boolean> {
    try {
      await this.ref.doc(id).delete();
      return true;
    } catch (error) {
      console.error('Error deleting session: ', error);
      return false;
    }
  }

  async deleteSessions(ids: string[]): Promise<boolean> {
    try {
      const batch = db.batch();
      ids.forEach((id) => batch.delete(this.ref.doc(id)));
      await batch.commit();
      return true;
    } catch (error) {
      console.error('Error deleting sessions: ', error);
      return false;
    }
  }

  async findSessionsByShop(shop: string): Promise<Session[]> {
    try {
      const snapshot = await this.ref.where('shop', '==', shop).get();
      if (snapshot.empty) return [];
      return snapshot.docs.map((doc) => new Session(doc.data() as any));
    } catch (error) {
      console.error('Error finding sessions by shop: ', error);
      return [];
    }
  }
}
