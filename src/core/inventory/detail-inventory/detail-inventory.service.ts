import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitProductService } from '../../unit-product/unit-product.service';
import { ProductService } from '../../product/product.service';
import { DetailInventoryInterface } from './detail-inventory.model';
import { DetailInventoryResponseInterface } from '../../../interface/inventory/detail-inventory/detail-inventory.response';
import { InventoryService } from '../inventory.service';

@Injectable()
export class DetailInventoryService {
  constructor(@InjectModel('detail-inventories') private readonly model: Model<DetailInventoryInterface>,
              private readonly inventoryService: InventoryService,
              private readonly productService: ProductService,
              private readonly unitProductService: UnitProductService) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailInventoryInterface> {
    let detailDoc;
    try {
      // Find Detail-Inventory document by id
      detailDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` DetailID: ${id} is not exist `); // 404
    }
    if(!detailDoc) throw new NotFoundException(` DetailID: ${id} is not exist `); // 404

    return detailDoc;
  }

  /* Main functions */
  async create( inventoryId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number): Promise<DetailInventoryResponseInterface> {
    // Check Inventory is existing
    await this.inventoryService.findInventory(inventoryId);
    // Check Product is existing
    await this.productService.findProduct(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findUnitProduct(unitProductId);
    try {
      // Create new inventory document
      const newDetail = new this.model({inventoryId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<DetailInventoryInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<DetailInventoryResponseInterface> {
      // Find detail-inventory document by id
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check inventory is existing
    await this.findDetail(id);
    try {
      // Then delete
      await this.model.deleteOne({_id: id}).exec();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getDetail(inventoryId: string): Promise<DetailInventoryInterface[]> {
    // Check inventory is existing
    await this.inventoryService.findInventory(inventoryId);
    try {
      // Then find documents that same inventoryId
      return await this.model.find({ inventoryId : inventoryId }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
