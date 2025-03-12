import { Test, TestingModule } from '@nestjs/testing';
import { ShopInfoController } from './shop-info.controller';

describe('ShopInfoController', () => {
  let controller: ShopInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopInfoController],
    }).compile();

    controller = module.get<ShopInfoController>(ShopInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
