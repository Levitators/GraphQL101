import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  Generated
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

  @PrimaryColumn("integer")
  @Generated()
  id: number;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text")
  googleUserId: string;

  @Column("text")
  facebookUserId: string;

  @Column("varchar", { length: 255 }) 
  username: string;
  
}
