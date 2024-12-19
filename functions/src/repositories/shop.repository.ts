import { Injectable } from '@nestjs/common';
import { db } from 'src/firebase.server';
import { BaseRepository } from './base.repository';
import { IShopifyShop } from 'src/types/shopify.type';
import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';

const shopRef = db.collection('shops');

@Injectable()
export class ShopRepository extends BaseRepository {
  constructor() {
    super();
    this.ref = shopRef;
  }

  async createShop(shop: IShopifyShop) {
    const existingShop = (await this._getByID(
      shop.myshopify_domain
    )) as unknown as IShopifyShop;
    if (existingShop.myshopify_domain) {
      return await this._updateByID(existingShop.myshopify_domain, { ...shop });
    } else {
      return await this._create({ ...shop }, shop.myshopify_domain);
    }
  }

  async findShopByShopifyDomain(shop: string): Promise<IShopifyShop[]> {
    try {
      const snapshot = await this.ref
        .where('myshopify_domain', '==', shop)
        .get();

      if (snapshot.empty) return [];

      return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
          ...data,
        } as IShopifyShop;
      });
    } catch (error) {
      console.error('Error finding shop by shopify domain: ', error);
      return [];
    }
  }
}
