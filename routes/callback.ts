import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "kv_oauth";
import { oauth2Client } from "../utils/oauth2_client.ts";
import { UserEntity, createOrUpdateUser, deleteUserBySession, getUser } from "../utils/db.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers = {
  async GET(req) {
    const { response, accessToken, sessionId } = await handleCallback(req, oauth2Client);

    const githubResponse = await fetch("https://api.github.com/user", {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    });

    const githubUser: User = await githubResponse.json();

    const user = await getUser(githubUser.login);
    if (user) {
      await deleteUserBySession(user.sessionId);
      await createOrUpdateUser({...user, sessionId});
    } else {
      const newUser: UserEntity = {
        login: githubUser.login,
        sessionId
      };
      await createOrUpdateUser(newUser);
    }
    return response;
  },
};