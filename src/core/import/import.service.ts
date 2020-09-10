import { ImportInterface } from './import.model';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImportResponseInterface } from '../../interface/import/import.response';

@Injectable()
export class ImportService {

  constructor(@InjectModel('imports') private readonly model: Model<ImportInterface>,) {}

  /* Additional functions */
  async findImport(id: string): Promise<ImportInterface> {
    let importDoc;
    try {
       importDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ImportID: ${id} is not exist `);
    }
    if(!importDoc) throw new NotFoundException(` ImportID: ${id} is not exist `);
    return importDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( shipper: string,
                invoiceNumber: number,
                note: string,
                createdUserId: string,
                accountantUserId: string,
                accConfirmedDate: number,
                stockKeeperUserId: string,
                stockConfirmedDate: number,
                status: string ): Promise<ImportResponseInterface> {

    try {
      const newImport = new this.model({shipper,invoiceNumber,note,createdUserId,accountantUserId,accConfirmedDate,stockKeeperUserId,stockConfirmedDate,status});
      return await newImport.save();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(): Promise<ImportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSingle(id: string): Promise<ImportResponseInterface> {
      return await this.findImport(id);
  }

  async update(  id: string,
                 shipper: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string,
                 accountantUserId: string,
                 accConfirmedDate: number,
                 stockKeeperUserId: string,
                 stockConfirmedDate: number,
                 status: string ): Promise<ImportResponseInterface> {

    const importDoc = await this.findImport(id);
    try {
      importDoc.shipper = shipper;
      importDoc.invoiceNumber = invoiceNumber;
      importDoc.note = note;
      importDoc.createdUserId = createdUserId;
      importDoc.accountantUserId = accountantUserId;
      importDoc.accConfirmedDate = accConfirmedDate;
      importDoc.stockKeeperUserId = stockKeeperUserId;
      importDoc.stockConfirmedDate = stockConfirmedDate;
      importDoc.status = status;
      importDoc.updatedAt = Date.now();

      return await importDoc.save();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    const importDoc =  await this.findImport(id);
    try {
      importDoc.deletedAt = Date.now();
      await importDoc.save();
      return true;
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllSoftDelete(): Promise<ImportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
