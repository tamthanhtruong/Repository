import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { UserService } from '../user/user.service';
import { ExportInterface } from './export.model';
import { ExportResponseInterface } from '../../interface/export/export.response';

@Injectable()
export class ExportService {
  constructor(@InjectModel('exports') private readonly model: Model<ExportInterface>,
              private readonly userService: UserService) {}

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
    await this.userService.findId(receiverId);
    // Check createdUser is existing
    await this.userService.findId(createdUserId);
    // Check accountantUser is existing
    await this.userService.findId(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findId(stockkeeperUserId);
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
    const exportInfo = await this.model.findById(id);
    if(!exportInfo) throw new HttpException(`Not found exportId ${id}`, HttpStatus.NOT_FOUND);
    return exportInfo;
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
    const findExport = await this.model.findById(id);
    if (!findExport) throw new HttpException(`Not found findExport ${id}`, HttpStatus.NOT_FOUND);
    // Check receiver is existing
    await this.userService.findId(receiverId);
    // Check createdUser is existing
    await this.userService.findId(createdUserId);
    // Check accountantUser is existing
    await this.userService.findId(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findId(stockkeeperUserId);

    // Then update
    findExport.receiverId = receiverId;
    findExport.invoiceNumber = invoiceNumber;
    findExport.note = note;
    findExport.createdUserId = createdUserId;
    findExport.accountantUserId = accountantUserId;
    findExport.accConfirmedDate = accConfirmedDate;
    findExport.stockkeeperUserId = stockkeeperUserId;
    findExport.stockConfirmedDate = stockConfirmedDate;
    findExport.status = status;
    findExport.updatedAt = Date.now();

    return await findExport.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find export document by id
    const findExport =  await this.model.findById(id);
    if (!findExport) throw new HttpException(`Not found findExport ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt field
    findExport.deletedAt = Date.now();
    await findExport.save();
    return true;
  }

  /* Additional functions */
  async findId(id: string): Promise<ExportResponseInterface> {
    // Find Export document by id
    const exportInfo = await this.model.findById(id);
    if(!exportInfo) throw new NotFoundException(`exportId [${id}] not exist.`);

    return exportInfo;
  }

}
