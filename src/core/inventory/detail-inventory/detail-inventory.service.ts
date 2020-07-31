import { Injectable, NotFoundException } from '@nestjs/common';
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
    } catch(error) {
      throw new NotFoundException('Could not find product.'); // 404
    }
    if(!detailDoc) {
      throw new NotFoundException('Could not find product.'); // 404
    }
    return detailDoc;
  }

  /* Main function */
  async create( inventoryId: string, productId: string, unitProductId: string, quantity: number, price: number): Promise<DetailInventoryResponseInterface> {
    // Check Inventory is existing
    await this.inventoryService.findInventory(inventoryId);
    // Check Product is existing
    await this.productService.findProduct(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findUnitProduct(unitProductId);
    // Create new inventory document
    const newDetail = new this.model({inventoryId, productId, unitProductId, quantity, price});
    return await newDetail.save();
  }

  async getAll(): Promise<DetailInventoryInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<DetailInventoryResponseInterface> {
    // Find detail-inventory document by id
    return this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check inventory is existing
    await this.findDetail(id);
    // Then delete
    await this.model.deleteOne({_id: id}).exec();
    return true;
  }

  async getDetail(inventoryId: string): Promise<DetailInventoryInterface[]> {
    // Check inventory is existing
    await this.inventoryService.findInventory(inventoryId);
    // Then find documents that same inventoryId
    return await this.model.find({ inventoryId : inventoryId }).exec();
  }
}
