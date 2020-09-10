import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product/product.model';
import { CategorySchema } from './product/category/category.model';
import { UnitProductSchema } from './unit-product/unit-product.model';
import { UserSchema } from './user/user.model';
import { RoleSchema } from './user/role/role.model';
import { ImportSchema } from './import/import.model';
import { DetailImportSchema } from './import/detail-import/detail-import.model';
import { ExportSchema } from './export/export.model';
import { DetailExportSchema } from './export/detail-export/detail-export.model';
import { InventorySchema } from './inventory/inventory.model';
import { DetailInventorySchema } from './inventory/detail-inventory/detail-inventory.model';
import { ProductController } from './product/product.controller';
import { CategoryController } from './product/category/category.controller';
import { UnitProductController } from './unit-product/unit-product.controller';
import { UserController } from './user/user.controller';
import { RoleController } from './user/role/role.controller';
import { ImportController } from './import/import.controller';
import { DetailImportController } from './import/detail-import/detail-import.controller';
import { ExportController } from './export/export.controller';
import { DetailExportController } from './export/detail-export/detail-export.controller';
import { InventoryController } from './inventory/inventory.controller';
import { DetailInventoryController } from './inventory/detail-inventory/detail-inventory.controller';
import { ProductService } from './product/product.service';
import { CategoryService } from './product/category/category.service';
import { UnitProductService } from './unit-product/unit-product.service';
import { UserService } from './user/user.service';
import { RoleService } from './user/role/role.service';
import { ImportService } from './import/import.service';
import { DetailImportService } from './import/detail-import/detail-import.service';
import { ExportService } from './export/export.service';
import { DetailExportService } from './export/detail-export/detail-export.service';
import { InventoryService } from './inventory/inventory.service';
import { DetailInventoryService } from './inventory/detail-inventory/detail-inventory.service';
import { IdCategoryExist } from '../validators/category.validator';
import { IdExportExist } from '../validators/export.validator';
import { IdImportExist } from '../validators/import.validator';
import { IdInventoryExist } from '../validators/inventory.validator';
import { IdProductExist } from '../validators/product.validator';
import { IdRoleExist } from '../validators/role.validator';
import { IdUnitProductExist } from '../validators/unit-product.validator';
import { IdUserExist } from '../validators/user.validator';
import { IdDetailImportExist } from '../validators/detail-import.validator';
import { IdDetailExportExist } from '../validators/detail-export.validator';
import { IdDetailInventoryExist } from '../validators/detail-inventory.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'products', schema: ProductSchema}]),
    MongooseModule.forFeature([{name: 'categories', schema: CategorySchema}]),
    MongooseModule.forFeature([{name: 'unit-products', schema: UnitProductSchema}]),
    MongooseModule.forFeature([{name: 'users', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'roles', schema: RoleSchema}]),
    MongooseModule.forFeature([{name: 'imports', schema: ImportSchema}]),
    MongooseModule.forFeature([{name: 'detail-imports', schema: DetailImportSchema}]),
    MongooseModule.forFeature([{name: 'exports', schema: ExportSchema}]),
    MongooseModule.forFeature([{name: 'detail-exports', schema: DetailExportSchema}]),
    MongooseModule.forFeature([{name: 'inventories', schema: InventorySchema}]),
    MongooseModule.forFeature([{name: 'detail-inventories', schema: DetailInventorySchema}]),
  ],
  controllers: [
    ProductController,
    CategoryController,
    UnitProductController,
    UserController,
    RoleController,
    ImportController,
    DetailImportController,
    ExportController,
    DetailExportController,
    InventoryController,
    DetailInventoryController,
  ],
  providers: [
    ProductService,
    CategoryService,
    UnitProductService,
    UserService,
    RoleService,
    ImportService,
    DetailImportService,
    ExportService,
    DetailExportService,
    InventoryService,
    DetailInventoryService,

    IdCategoryExist,
    IdExportExist,
    IdImportExist,
    IdInventoryExist,
    IdProductExist,
    IdRoleExist,
    IdUnitProductExist,
    IdUserExist,
    IdDetailImportExist,
    IdDetailExportExist,
    IdDetailInventoryExist,
  ],
  exports: [
    ProductService,
    CategoryService,
    UnitProductService,
    UserService,
    RoleService,
    ImportService,
    DetailImportService,
    ExportService,
    DetailExportService,
    InventoryService,
    DetailInventoryService,
  ],
})
export class CoreStoreModule {}
