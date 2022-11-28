import { Args, Authorized, Resolver, Mutation, Ctx, Query } from "type-graphql";
import Session from "../models/Session";

import User from "../models/User";
import LoginInput from "./input/user/LoginInput";
import SessionUtils from "../models/utils/SessionUtils";
import { Context } from "../apollo-server";
import DeleteSessionInput from "./input/session/DeleteSessionInput";
import Cookies from "cookies";

@Resolver(Session)
class SessionResolver {
  @Mutation(() => User)
  async signIn(
    @Ctx() context: Context,
    @Args() { email, password }: LoginInput
  ) {
    const { sessionId } = context;

    return SessionUtils.signIn({
      email,
      password,
      sessionId,
      res: context.res,
    });
  }

  @Query(() => User)
  async userInfo(@Ctx() context: Context) {
    const { sessionId } = context;

    const session = await SessionUtils.userInfo({ sessionId });

    return session;
  }

  @Query(() => User)
  async userWithRelations(@Ctx() context: Context) {
    const { sessionId } = context;

    return await SessionUtils.userWithRelations({ sessionId });
  }

  @Mutation(() => Session)
  async deleteSession(@Ctx() context: Context) {
    const cookies = new Cookies(context.req, context.res, {
      secure: process.env.NODE_ENV === "production",
    });

    cookies.set("sessionId", "", {});
    console.log(context.user);
    return SessionUtils.deleteSession({ user: context.user?.id as number });
  }
}

export default SessionResolver;
