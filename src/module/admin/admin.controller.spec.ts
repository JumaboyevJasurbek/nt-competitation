import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAssistantDto } from '../assistants/dto/create-assistant.dto';
import { Gender } from 'src/types';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  describe('create1', () => {
    it('should create a new admin', () => {
      const createAdminDto: CreateAdminDto = {
        username: 'Ali',
        password: '13234',
      };
      jest.spyOn(service, 'create').mockImplementation(() =>
        Promise.resolve({
          /* provide expected result */
        }),
      );

      const result = controller.create1(createAdminDto);

      expect(result).resolves.toEqual({
        /* provide expected result */
      });
      expect(service.create).toHaveBeenCalledWith(createAdminDto);
    });
  });

  describe('create', () => {
    it('should create a new assistant', () => {
      const createAssistantDto: CreateAssistantDto = {
        first_name: '',
        last_name: '',
        age: 0,
        position: '',
        username: '',
        tel_number: '',
        img: '',
        gender: Gender.male,
      };
      jest.spyOn(service, 'createAssistants').mockImplementation(() =>
        Promise.resolve({
          /* provide expected result */
        }),
      );

      const result = controller.create(createAssistantDto);

      expect(result).resolves.toEqual({
        /* provide expected result */
      });
      expect(service.createAssistants).toHaveBeenCalledWith(createAssistantDto);
    });
  });

  describe('findAll', () => {
    it('should return all admins', () => {
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve());


      const result = controller.findAll();

      expect(result).resolves.toEqual({
        /* provide expected result */
      });
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an admin by id', () => {
      const adminId = '1';
      jest.spyOn(service, 'findOne').mockImplementation(() =>
        Promise.resolve({
          /* provide expected result */
        }),
      );

      const result = controller.findOne(adminId);

      expect(result).resolves.toEqual({
        /* provide expected result */
      });
      expect(service.findOne).toHaveBeenCalledWith(+adminId);
    });
  });

  describe('update', () => {
    it('should update an admin', () => {
      const adminId = '1';
      const updateAdminDto: UpdateAdminDto = {
        username: '',
        password: ''
      };
      jest.spyOn(service, 'update').mockImplementation(() =>
        Promise.resolve({
          /* provide expected result */
        }),
      );

      const result = controller.update(adminId, updateAdminDto);

      expect(result).resolves.toEqual({
        /* provide expected result */
      });
      expect(service.update).toHaveBeenCalledWith(+adminId, updateAdminDto);
    });
  });

  describe('remove', () => {
    it('should remove an admin', () => {
      const adminId = '1';
      jest.spyOn(service, 'remove').mockImplementation(() =>
        Promise.resolve({
          /* provide expected result */
        }),
      );

      const result = controller.remove(adminId);

      expect(result).resolves.toEqual({
        /* provide expected result */
      });
      expect(service.remove).toHaveBeenCalledWith(+adminId);
    });
  });
});
