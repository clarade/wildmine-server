import { Field, ID, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	// ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Project from './Project';


@Entity()
@ObjectType()
class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id!: number;

	@Column()
	@Field()
	name!: string;

	@ManyToOne(() => Project, project => project.images, { onDelete: 'CASCADE' })
	@Field(() => Project, { nullable: true })
	project!: Project;

    @Column()
	@Field()
	created_at!: string;
}

export default Image;
