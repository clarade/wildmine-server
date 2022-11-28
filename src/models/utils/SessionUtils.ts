import md5 from "md5";
import SignInInput from "../../resolvers/input/user/SignInInput";
import User from "../User";
import Session from "../Session";
import DeleteSessionInput from "../../resolvers/input/session/DeleteSessionInput";
import UserInfoInput from "../../resolvers/input/user/UserInfoInput";
import bcrypt from "bcryptjs";

class SessionUtils extends Session {
  static async signIn({ email, password, sessionId }: SignInInput) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (!bcrypt.compareSync(password, user?.password)) {
      throw new Error("Invalid email or password");
    } else if (!sessionId) {
      throw new Error("A problem occured");
    } else {
      const session = new Session();

      session.uid = sessionId;
      session.user = user;

      await session.save();

      return user;
    }
  }

  static async userInfo({ sessionId }: UserInfoInput) {
    const userSession = await Session.findOne(
      { uid: sessionId },
      { relations: ["user"] }
    );

    return userSession?.user;
  }

  static async userWithRelations({ sessionId }: UserInfoInput) {
    const userSession = await Session.findOne(
      { uid: sessionId },
      { relations: ["user"] }
    );

    const currentUser = await User.findOne({
      where: { id: userSession?.user.id },
      relations: ["project_assigned", "issues_assigned"],
    });

    return currentUser;
  }

  static async deleteSession({ user }: DeleteSessionInput) {
    const session = await Session.findOneOrFail({
      where: {
        user: {
          id: user,
        },
      },
    });

    try {
      await Session.remove(session);
    } catch (error) {
      console.log(error);
    }
    console.log("SESSION TO REMOVE", session);

    return { uid: "Session removed" };
  }
}

export default SessionUtils;
