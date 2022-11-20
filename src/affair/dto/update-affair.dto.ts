import { PartialType } from '@nestjs/swagger';
import { CreateAffairDto } from './create-affair.dto';

export class UpdateAffairDto extends PartialType(CreateAffairDto) {}
