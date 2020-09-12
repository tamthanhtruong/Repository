import { GatewayTimeoutException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { ExportResponseInterface } from '../../interface/export/export.response';
import { ExportInterface } from './export.model';

@Injectable()
export class ExportService {

  constructor(@InjectModel('exports') private readonly model: Model<ExportInterface>,) {}

  /* Additional functions */
  async findExport(id: string): Promise<ExportInterface> {
    let exportDoc;
    try {
      exportDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ExportID: ${id} is not exist `);
    }
    if(!exportDoc) throw new NotFoundException(` ExportID: ${id} is not exist `);
    return exportDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
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
                status: string): Promise<ExportResponseInterface> {

    try {
      const newExport = new this.model({receiver,invoiceNumber,note,createdUserId,accountantUserId,accConfirmedDate,stockKeeperUserId,stockConfirmedDate,status});
      return await newExport.save();
    } catch(e) {
      throw new GatewayTimeoutException('ExportService: create() Query Error.');
    }
  }

  async getAll(): Promise<ExportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('ExportService: getAll() Query Error.');
    }
  }

  async getAllLock(): Promise<ExportResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Lock' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('ExportService: getAllLock() Query Error.');
    }
  }

  async getAllOpen(): Promise<ExportResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Open' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('ExportService: getAllOpen() Query Error.');
    }
  }

  async getAllPaid(): Promise<ExportResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Paid' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('ExportService: getAllPaid() Query Error.');
    }
  }

  async getAllExported(): Promise<ExportResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Exported' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('ExportService: getAllExported() Query Error.');
    }
  }

  async getSingle(id: string): Promise<ExportResponseInterface> {
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

    const exportDoc = await this.findExport(id);
    try {
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
      throw new GatewayTimeoutException('ExportService: update() Query Error.');
    }
  }

  async delete(id: string): Promise<boolean> {
    const exportDoc =  await this.findExport(id);
    try {
      exportDoc.deletedAt = Date.now();
      await exportDoc.save();
      return true;
    } catch(e) {
      throw new GatewayTimeoutException('ExportService: delete() Query Error.');
    }
  }

  async getAllSoftDelete(): Promise<ExportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new GatewayTimeoutException('ExportService: getAllSoftDelete() Query Error.');
    }
  }
}
