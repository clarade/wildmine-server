import { ArgsType, Field } from 'type-graphql';
import Project from '../../models/Project';

@ArgsType()
class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  project!: number;

  @Field()
  created_at!: string;
}

export default CreateUserInput;