import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class DeleteSessionInput {
  @Field()
  user!: number;
}

export default DeleteSessionInput;