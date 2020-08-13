import { ImportInterface } from './import.model';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { ImportResponseInterface } from '../../interface/import/import.response';

@Injectable()
export class ImportService {
  constructor(@InjectModel('imports') private readonly model: Model<ImportInterface>,
              private readonly userService: UserService) {}

  /* Additional functions */
  async findImport(id: string): Promise<ImportInterface> {
    let importDoc;
    try {
      // Find Import document by id
       importDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ImportID: ${id} is not exist `); // 404
    }
    if(!importDoc) throw new NotFoundException(` ImportID: ${id} is not exist `); // 404

    return importDoc;
  }

  /* Main functions */
  async create( shipper: string,
                invoiceNumber: number,
                note: string,
                createdUserId: string,
                accountantUserId: string,
                accConfirmedDate: number,
                stockkeeperUserId: string,
                stockConfirmedDate: number,
                status: string) {

    // Check createdUser is existing
    await this.userService.findUser(createdUserId);
    // Check accountantUser is existing
    await this.userService.findUser(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findUser(stockkeeperUserId);
    try {
      // Create new import document
      const newImport = new this.model({shipper,invoiceNumber,note,createdUserId,accountantUserId,accConfirmedDate,stockkeeperUserId,stockConfirmedDate,status});
      return await newImport.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<ImportInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<ImportResponseInterface> {
      // Finds a single document by id
      return await this.findImport(id);
  }

  async update(  id: string,
                 shipper: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string,
                 accountantUserId: string,
                 accConfirmedDate: number,
                 stockkeeperUserId: string,
                 stockConfirmedDate: number,
                 status: string ): Promise<ImportResponseInterface> {

    // Find import document by id
    const importDoc = await this.findImport(id);
    // Check createdUser is existing
    await this.userService.findUser(createdUserId);
    // Check accountantUser is existing
    await this.userService.findUser(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findUser(stockkeeperUserId);
    try {
      // Then update
      importDoc.shipper = shipper;
      importDoc.invoiceNumber = invoiceNumber;
      importDoc.note = note;
      importDoc.createdUserId = createdUserId;
      importDoc.accountantUserId = accountantUserId;
      importDoc.accConfirmedDate = accConfirmedDate;
      importDoc.stockkeeperUserId = stockkeeperUserId;
      importDoc.stockConfirmedDate = stockConfirmedDate;
      importDoc.status = status;
      importDoc.updatedAt = Date.now();

      return await importDoc.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find import document by id
    const importDoc =  await this.findImport(id);
    try {
      // Add deletedAt field
      importDoc.deletedAt = Date.now();
      await importDoc.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
