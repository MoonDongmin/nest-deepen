import { Test, TestingModule } from '@nestjs/testing';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';

const mockDirectorService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('DirectorController', () => {
  let directorController: DirectorController;
  let directorService: DirectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectorController],
      providers: [
        {
          provide: DirectorService,
          useValue: mockDirectorService,
        },
      ],
    }).compile();

    directorController = module.get<DirectorController>(DirectorController);
    directorService = module.get<DirectorService>(DirectorService);
  });

  it('should be defined', () => {
    expect(directorController).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method from DirectorService', () => {
      const result = [
        {
          id: 1,
          name: 'codefactory',
        },
      ];
      jest.spyOn(mockDirectorService, 'findAll').mockResolvedValue(result);

      expect(directorController.findAll()).resolves.toEqual(result);
      expect(directorService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call findOne method from DirectorService with correct ID', () => {
      const result = {
        id: 1,
        name: 'codefactory',
      };

      jest.spyOn(mockDirectorService, 'findOne').mockResolvedValue(result);

      expect(directorController.findOne(1)).resolves.toEqual(result);
      expect(directorService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call create method from DirectorService with correct DTO', () => {
      const createDirectoDto = { name: 'code factory' };
      const result = {
        id: 1,
        name: 'code factory',
      };

      jest.spyOn(mockDirectorService, 'create').mockResolvedValue(result);

      expect(
        directorController.create(createDirectoDto as CreateDirectorDto),
      ).resolves.toEqual(result);
      expect(directorService.create).toHaveBeenCalledWith(createDirectoDto);
    });
  });

  describe('update', () => {
    it('should call update method from DirectorService with correct ID and DTO', async () => {
      const updateDirectorDto = { name: 'Code Factory' };
      const result = {
        id: 1,
        name: 'Code Factory',
      };
      jest.spyOn(mockDirectorService, 'update').mockResolvedValue(result);

      expect(directorController.update(1, updateDirectorDto)).resolves.toEqual(result);
      expect(directorService.update).toHaveBeenCalledWith(1, updateDirectorDto);
    });
  });

  describe('remove', () => {
    it('should call remove method from DirectorService with correct ID', async () => {
      const result = 1;
      jest.spyOn(mockDirectorService, 'remove').mockResolvedValue(result);

      expect(directorController.remove(1)).resolves.toEqual(result);
      expect(directorService.remove).toHaveBeenCalledWith(1);
    });
  });
});
