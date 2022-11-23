import { Request, Response } from "express";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
class SignInInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  sessionId!: string;

  @Field()
  res!: Response;
}

export default SignInInput;
