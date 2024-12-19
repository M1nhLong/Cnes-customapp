import { Injectable } from '@nestjs/common';
import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { db } from 'src/firebase.server';
import { IShopifyMerchant, IWebhook } from 'src/types/shopify.type';
import { BaseRepository } from './base.repository';

const merchantRef = db.collection('merchants');

@Injectable()
export class MerchantRepository extends BaseRepository {
  constructor() {
    super();
    this.ref = merchantRef;
  }

  async findMerchantByShop(shop: string): Promise<IShopifyMerchant[]> {
    try {
      const snapshot = await this.ref.where('shop', '==', shop).get();
      if (snapshot.empty) return [];
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
        } as IShopifyMerchant;
      });
    } catch (error) {
      console.error('Error finding merchant by shop: ', error);
      return [];
    }
  }

  async createMerchant(merchant: IShopifyMerchant) {
    const existingMerchant = (await this._getByID(
      merchant.shop
    )) as unknown as IShopifyMerchant;
    if (!existingMerchant.shop) {
      return await this._create({ ...merchant }, merchant.shop);
    }

    return true;
  }

  async insertWebhook(shop: string, webhook: IWebhook) {
    const merchant = await this.getMerchant(shop);
    if (merchant.length === 0) {
      throw new Error('Error: Merchant not found');
    }

    const merchantData = merchant[0];
    merchantData.webhooks.push(webhook);

    await this.ref.doc(shop).update({
      webhooks: merchantData.webhooks,
    });

    return true;
  }

  async removeAllWebhooks(shop: string) {
    const merchant = await this.getMerchant(shop);
    if (merchant.length === 0) {
      throw new Error('Error: Merchant not found');
    }

    await this.ref.doc(shop).update({
      webhooks: [],
    });

    return true;
  }

  async getMerchant(shop: string) {
    const snapshot = await this.ref.where('shop', '==', shop).get();

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        ...data,
      } as IShopifyMerchant;
    });
  }
}
