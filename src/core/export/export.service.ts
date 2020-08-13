import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
      // Find Product document by id
      exportDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ExportID: ${id} is not exist `); // 404
    }
    if(!exportDoc) throw new NotFoundException(` ExportID: ${id} is not exist `); // 404

    return exportDoc;
  }

  /* Main functions */
  async create( receiver: string,
                invoiceNumber: number,
                note: string,
                createdUserId: string,
                accountantUserId: string,
                accConfirmedDate: number,
                stockKeeperUserId: string,
                stockConfirmedDate: number,
                status: string) {

    // Check createdUser is existing
    await this.userService.findUser(createdUserId);
    // Check accountantUser is existing
    await this.userService.findUser(accountantUserId);
    // Check stockKeeperUser is existing
    await this.userService.findUser(stockKeeperUserId);
    try {
      // Create new import document
      const newExport = new this.model({receiver,invoiceNumber,note,createdUserId,accountantUserId,accConfirmedDate,stockKeeperUserId,stockConfirmedDate,status});
      return await newExport.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<ExportInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<ExportResponseInterface> {
      // Finds a single document by id
      return await this.findExport(id);
  }

  async update(  id: string,
                 receiver: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string,
                 accountantUserId: string,
                 accConfirmedDate: number,
                 stockKeeperUserId: string,
                 stockConfirmedDate: number,
                 status: string ): Promise<ExportResponseInterface> {

    // Find export document by id
    const exportDoc = await this.findExport(id);
    // Check createdUser is existing
    await this.userService.findUser(createdUserId);
    // Check accountantUser is existing
    await this.userService.findUser(accountantUserId);
    // Check stockKeeperUser is existing
    await this.userService.findUser(stockKeeperUserId);
    try {
      // Then update
      exportDoc.receiver = receiver;
      exportDoc.invoiceNumber = invoiceNumber;
      exportDoc.note = note;
      exportDoc.createdUserId = createdUserId;
      exportDoc.accountantUserId = accountantUserId;
      exportDoc.accConfirmedDate = accConfirmedDate;
      exportDoc.stockKeeperUserId = stockKeeperUserId;
      exportDoc.stockConfirmedDate = stockConfirmedDate;
      exportDoc.status = status;
      exportDoc.updatedAt = Date.now();

      return await exportDoc.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find export document by id
    const exportDoc =  await this.findExport(id);
    try {
      // Add deletedAt field
      exportDoc.deletedAt = Date.now();
      await exportDoc.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
