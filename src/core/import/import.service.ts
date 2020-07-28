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
    await this.userService.findId(createdUserId);
    // Check accountantUser is existing
    await this.userService.findId(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findId(stockkeeperUserId);
    // Create new import document
    const newImport = new this.model({shipper,invoiceNumber,note,createdUserId,accountantUserId,accConfirmedDate,stockkeeperUserId,stockConfirmedDate,status});
    return await newImport.save();
  }

  async getAll(): Promise<ImportInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<ImportResponseInterface> {
      const gg = await this.model.findById(id);
      if(!gg) throw new HttpException(`Not found importId ${id}`, HttpStatus.NOT_FOUND);
      return gg
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
    const findImport = await this.model.findById(id);
    if (!findImport) throw new HttpException(`Not found findImport ${id}`, HttpStatus.NOT_FOUND);
    // Check createdUser is existing
    await this.userService.findId(createdUserId);
    // Check accountantUser is existing
    await this.userService.findId(accountantUserId);
    // Check stockkeeperUser is existing
    await this.userService.findId(stockkeeperUserId);

    // Then update
    findImport.shipper = shipper;
    findImport.invoiceNumber = invoiceNumber;
    findImport.note = note;
    findImport.createdUserId = createdUserId;
    findImport.accountantUserId = accountantUserId;
    findImport.accConfirmedDate = accConfirmedDate;
    findImport.stockkeeperUserId = stockkeeperUserId;
    findImport.stockConfirmedDate = stockConfirmedDate;
    findImport.status = status;
    findImport.updatedAt = Date.now();

    return await findImport.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find import document by id
    const findImport =  await this.model.findById(id);
    if (!findImport) throw new HttpException(`Not found findImport ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt field
    findImport.deletedAt = Date.now();
    await findImport.save();
    return true;
  }

  /* Additional functions */
  async findId(id: string): Promise<ImportResponseInterface> {
    // Find Import document by id
    const importInfo = await this.model.findById(id);
    if(!importInfo) throw new NotFoundException(`importInfo [${id}] not exist.`);

    return importInfo;
  }
}
