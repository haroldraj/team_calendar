import { Test, TestingModule } from '@nestjs/testing';
import { TypeActionController } from './type-action.controller';
import { TypeActionService } from './type-action.service';

describe('TypeActionController', () => {
  let controller: TypeActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeActionController],
      providers: [TypeActionService],
    }).compile();

    controller = module.get<TypeActionController>(TypeActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
