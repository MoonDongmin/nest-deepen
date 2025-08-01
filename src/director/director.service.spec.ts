import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { Repository } from 'typeorm';
import { Director } from './entity/director.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';
import { NotFoundException } from '@nestjs/common';

const mockDirectorRespository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('DirectorService', () => {
  let directorService: DirectorService;
  let directorRepository: Repository<Director>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorService,
        {
          provide: getRepositoryToken(Director),
          useValue: mockDirectorRespository,
        },
      ],
    }).compile();

    directorService = module.get<DirectorService>(DirectorService);
    directorRepository = module.get<Repository<Director>>(
      getRepositoryToken(Director),
    );
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(directorService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new director', async () => {
      const createDirectorDto = {
        name: 'dongmin',
      };

      jest
        .spyOn(mockDirectorRespository, 'save')
        .mockResolvedValue(createDirectorDto);

      const result = await directorService.create(
        createDirectorDto as CreateDirectorDto,
      );

      expect(directorRepository.save).toHaveBeenCalledWith(createDirectorDto);
      expect(result).toEqual(createDirectorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of directors', async () => {
      const directors = [
        {
          id: 1,
          name: 'dongmin',
        },
      ];

      jest.spyOn(mockDirectorRespository, 'find').mockResolvedValue(directors);

      const result = await directorService.findAll();

      expect(directorRepository.find).toHaveBeenCalled();
      expect(result).toEqual(directors);
    });
  });

  describe('findOne', () => {
    it('should return a single director by id', async () => {
      const director = {
        id: 1,
        name: 'donmin',
      };

      jest
        .spyOn(mockDirectorRespository, 'findOne')
        .mockResolvedValue(director as Director);

      const result = await directorService.findOne(director.id);

      expect(directorRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(result).toEqual(director);
    });
  });

  describe('update', () => {
    it('should update a director', async () => {
      const updateDirectorDto = { name: 'dongmin' };
      const existingDirector = {
        id: 1,
        name: 'dongmin',
      };
      const updatedDirector = {
        id: 1,
        name: 'dongmin2',
      };

      jest
        .spyOn(mockDirectorRespository, 'findOne')
        .mockResolvedValueOnce(existingDirector);
      jest
        .spyOn(mockDirectorRespository, 'findOne')
        .mockResolvedValueOnce(updatedDirector);

      const result = await directorService.update(1, updateDirectorDto);

      expect(directorRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(directorRepository.update).toHaveBeenCalledWith(
        {
          id: 1,
        },
        updateDirectorDto,
      );
      expect(result).toEqual(updatedDirector);
    });

    it('should throw NotFoundException if director does not exist', () => {
      jest.spyOn(mockDirectorRespository, 'findOne').mockResolvedValue(null);

      expect(
        directorService.update(1, { name: 'code factory' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('shouuld remove a director by id', async () => {
      const director = {
        id: 1,
        name: 'code factory',
      };

      jest
        .spyOn(mockDirectorRespository, 'findOne')
        .mockResolvedValue(director);

      const result = await directorService.remove(1);

      expect(directorRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(directorRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(1);
    });

    it('should throw NotFoundException if director does not exist', async () => {
      jest.spyOn(mockDirectorRespository, 'findOne').mockResolvedValue(null);

      expect(directorService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
