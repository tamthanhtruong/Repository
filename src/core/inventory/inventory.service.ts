import { GatewayTimeoutException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { InventoryInterface } from './inventory.model';
import { InventoryResponseInterface } from '../../interface/inventory/inventory.response';

@Injectable()
export class InventoryService {

  constructor(@InjectModel('inventories') private readonly model: Model<InventoryInterface>,) {}

  /* Additional functions */
  async findInventory(id: string): Promise<InventoryInterface> {
    let inventoryDoc;
    try {
      inventoryDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` InventoryID: ${id} is not exist `);
    }
    if(!inventoryDoc) throw new NotFoundException(` InventoryID: ${id} is not exist `);
    return inventoryDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( invoiceNumber: number,
                note: string,
                createdUserId: string ): Promise<InventoryResponseInterface> {
    try {
      const newInventory = new this.model({invoiceNumber,note,createdUserId});
      return await newInventory.save();
    } catch(e) {
      throw new GatewayTimeoutException('InventoryService: create() Query Error.');
    }
  }

  async getAll(): Promise<InventoryResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('InventoryService: getAll() Query Error.');
    }
  }

  async getSingle(id: string): Promise<InventoryResponseInterface> {
      return await this.findInventory(id);
  }

  async update(  id: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string ): Promise<InventoryResponseInterface> {

    const findInventory = await this.findInventory(id);
    try {
      findInventory.invoiceNumber = invoiceNumber;
      findInventory.note = note;
      findInventory.createdUserId = createdUserId;
      findInventory.updatedAt = Date.now();

      return await findInventory.save();
    } catch(e) {
      throw new GatewayTimeoutException('InventoryService: update() Query Error.');
    }
  }

  async delete(id: string): Promise<boolean> {
    const findInventory =  await this.findInventory(id);
    try {
      findInventory.deletedAt = Date.now();
      await findInventory.save();
      return true;
    } catch(e) {
      throw new GatewayTimeoutException('InventoryService: delete() Query Error.');
    }
  }

  async getAllSoftDelete(): Promise<InventoryResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new GatewayTimeoutException('InventoryService: getAllSoftDelete() Query Error.');
    }
  }
}
