import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { UserService } from '../user/user.service';
import { ExportResponseInterface } from '../../interface/export/export.response';
import { ExportInterface } from './export.model';

@Injectable()
export class ExportService {
  constructor(@InjectModel('exports') private readonly model: Model<ExportInterface>,
              private readonly userService: UserService) {}

  /* Additional functions */
  async findExport(id: string): Promise<ExportInterface> {
    let exportDoc;
    try {
      // Find Export document by id
      exportDoc = await this.model.findById(id).exec();
    } catch(error) {
      throw new NotFoundException('Could not find export.'); // 404
    }
    if(!exportDoc) {
      throw new NotFoundException('Could not find export.'); // 404
    }
    return exportDoc;
  }

  /* Main function */
  async create( receiverId: string,
                invoiceNumber: number,
                note: string,
                createdUserId: string,
                accountantUserId: string,
                accConfirmedDate: number,
                stockkeeperUserId: string,
                stockConfirmedDate: number,
                status: string) {

    // Check receiver is existing
    await this.userService.findUser(receiverId);
    // Check createdUser is existing
    await this.userService.findUser(createdUserId);
    // Check accountantUser is existing
    await this.userService.findUser(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findUser(stockkeeperUserId);
    // Create new import document
    const newExport = new this.model({receiverId,invoiceNumber,note,createdUserId,accountantUserId,accConfirmedDate,stockkeeperUserId,stockConfirmedDate,status});
    return await newExport.save();
  }

  async getAll(): Promise<ExportInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<ExportResponseInterface> {
    // Finds a single document by id
    return await this.findExport(id);
  }

  async update(  id: string,
                 receiverId: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string,
                 accountantUserId: string,
                 accConfirmedDate: number,
                 stockkeeperUserId: string,
                 stockConfirmedDate: number,
                 status: string ): Promise<ExportResponseInterface> {

    // Find export document by id
    const exportDoc = await this.findExport(id);
    // Check receiver is existing
    await this.userService.findUser(receiverId);
    // Check createdUser is existing
    await this.userService.findUser(createdUserId);
    // Check accountantUser is existing
    await this.userService.findUser(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findUser(stockkeeperUserId);

    // Then update
    exportDoc.receiverId = receiverId;
    exportDoc.invoiceNumber = invoiceNumber;
    exportDoc.note = note;
    exportDoc.createdUserId = createdUserId;
    exportDoc.accountantUserId = accountantUserId;
    exportDoc.accConfirmedDate = accConfirmedDate;
    exportDoc.stockkeeperUserId = stockkeeperUserId;
    exportDoc.stockConfirmedDate = stockConfirmedDate;
    exportDoc.status = status;
    exportDoc.updatedAt = Date.now();

    return await exportDoc.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find export document by id
    const exportDoc =  await this.findExport(id);
    // Add deletedAt field
    exportDoc.deletedAt = Date.now();
    await exportDoc.save();
    return true;
  }
}
