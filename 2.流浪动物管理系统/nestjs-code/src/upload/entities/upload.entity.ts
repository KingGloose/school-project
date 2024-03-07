import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Uplaod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  fileName: string;

  @Column({
    length: 20,
  })
  fileSize: string;

  @Column({
    length: 80,
  })
  fileMd5: string;
}
