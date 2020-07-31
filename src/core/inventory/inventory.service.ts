import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { UserService } from '../user/user.service';
import { InventoryInterface } from './inventory.model';
import { InventoryResponseInterface } from '../../interface/inventory/inventory.response';

@Injectable()
export class InventoryService {
  constructor(@InjectModel('inventories') private readonly model: Model<InventoryInterface>,
              private readonly userService: UserService) {}

  /* Additional functions */
  async findInventory(id: string): Promise<InventoryInterface> {
    let inventoryDoc;
    try {
      // Find Inventory document by id
      inventoryDoc = await this.model.findById(id).exec();
    } catch(error) {
      throw new NotFoundException('Could not find inventory.'); // 404
    }
    if(!inventoryDoc) {
      throw new NotFoundException('Could not find inventory.'); // 404
    }
    return inventoryDoc;
  }

  /* Main function */
  async create( invoiceNumber: number,
                note: string,
                createdUserId: string,
                status: string) {

    // Check createdUser is existing
    await this.userService.findUser(createdUserId);
    // Create new inventory document
    const newInventory = new this.model({invoiceNumber,note,createdUserId,status});
    return await newInventory.save();
  }

  async getAll(): Promise<InventoryInterface[]> {
    // Find documents
    return await this.model.find().exec();
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
    // Check createdUser is existing
    await this.userService.findUser(createdUserId);

    // Then update
    findInventory.invoiceNumber = invoiceNumber;
    findInventory.note = note;
    findInventory.createdUserId = createdUserId;
    findInventory.status = status;
    findInventory.updatedAt = Date.now();

    return await findInventory.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find inventory document by id
    const findInventory =  await this.findInventory(id);
    // Add deletedAt field
    findInventory.deletedAt = Date.now();
    await findInventory.save();
    return true;
  }


}
