import { ApolloServer } from "apollo-server-express";
import { AuthChecker, buildSchema } from "type-graphql";
import User from "./models/User";
import SessionUtils from "./models/utils/SessionUtils";
import FileResolver from "./resolvers/FileResolver";

import IssueResolver from "./resolvers/IssueResolver";
import ProjectResolver from "./resolvers/ProjectResolver";
import SessionResolver from "./resolvers/SessionResolver";
import UserResolver from "./resolvers/UserResolver";
import OrganizationResolver from "./resolvers/OrganizationResolver";
import ImageResolver from "./resolvers/ImageResolver";
import { Request, Response } from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

export interface Context {
  sessionId: string;
  user: User | null;
  res: Response;
}

export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

export default async function getServer() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      SessionResolver,
      ProjectResolver,
      FileResolver,
      OrganizationResolver,
      ImageResolver,
      IssueResolver,
    ],

    authChecker: customAuthChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }): Promise<Context> => {
      const sessionId = req.cookies.sessionId || "";

      const user = (await SessionUtils.userInfo({ sessionId })) || null;

      return { sessionId, user, res };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
  return apolloServer;
}
