import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { Roles, KeyRole } from '../enums/Roles';

export const Authorization = (rol: Roles): CustomDecorator<typeof KeyRole> => SetMetadata(KeyRole, rol);
