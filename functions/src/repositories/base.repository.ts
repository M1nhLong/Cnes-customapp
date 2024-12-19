import { Injectable } from '@nestjs/common';
import { db } from 'src/firebase.server';

@Injectable()
export class BaseRepository {
  ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  db: FirebaseFirestore.Firestore;
  validFirestoreOperators = [
    '--',
    '==',
    '!=',
    '>=',
    '<=',
    '>',
    '<',
    'array-contains',
    'in',
    'not-in',
    'array-contains-any',
  ];

  constructor() {
    this.db = db;
  }
  async _create(doc: any, docName?: string) {
    if (docName) {
      return await this.ref.doc(docName).set(doc);
    } else {
      return await this.ref.add(doc);
    }
  }

  async _getAll() {
    const snapshot = await this.ref.get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async _getByID(id: string) {
    const snapshot = await this.ref.doc(id).get();
    return { ...snapshot.data(), id: snapshot.id };
  }

  async _updateByID(id: string, doc: any) {
    return await this.ref.doc(id).update(doc);
  }

  async _get(wheres: any, limit = null) {
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      this.ref;
    if (Array.isArray(wheres)) {
      const numWheres = wheres.length;
      for (let i = 0; i < numWheres; i++) {
        const [field, operator, value] = wheres[i];

        if (!field || !operator || !value) {
          throw new Error('baseRepository.get Invalid wheres');
        }

        if (!this.validFirestoreOperators.includes(operator)) {
          throw new Error('baseRepository.get: Invalid operator');
        }

        query = query.where(field, operator, value);
      }
    }

    if (parseInt(limit)) {
      query = query.limit(parseInt(limit));
    }

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async _delete(id: string) {
    if (!id) {
      return true;
    }

    return await this.ref.doc(id)?.delete();
  }
}
