import { Test, TestingModule } from '@nestjs/testing';
import { TypeActionService } from './type-action.service';

describe('TypeActionService', () => {
  let service: TypeActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeActionService],
    }).compile();

    service = module.get<TypeActionService>(TypeActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
