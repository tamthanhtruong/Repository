import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
      // Find Inventory document by id
      inventoryDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` InventoryID: ${id} is not exist `); // 404
    }
    if(!inventoryDoc) throw new NotFoundException(` InventoryID: ${id} is not exist `); // 404

    return inventoryDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( invoiceNumber: number,
                note: string,
                createdUserId: string,
                status: string ) {
    try {
      // Create new inventory document
      const newInventory = new this.model({invoiceNumber,note,createdUserId,status});
      return await newInventory.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<InventoryInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<InventoryResponseInterface> {
      // Finds a single document by id
      return await this.findInventory(id);
  }

  async update(  id: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string,
                 status: string ): Promise<InventoryResponseInterface> {

    // Find inventory document by id
    const findInventory = await this.findInventory(id);
    try {
      // Then update
      findInventory.invoiceNumber = invoiceNumber;
      findInventory.note = note;
      findInventory.createdUserId = createdUserId;
      findInventory.status = status;
      findInventory.updatedAt = Date.now();

      return await findInventory.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find inventory document by id
    const findInventory =  await this.findInventory(id);
    try {
      // Add deletedAt field
      findInventory.deletedAt = Date.now();
      await findInventory.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
