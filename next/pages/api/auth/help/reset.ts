import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { LoginForm } from "pages/auth/login";
import smtpTransport from "@utils/server/email";
import { HelpForm } from "pages/auth/help/find-pw";
import bcrypt from "bcrypt";
import { passwordEncryption } from "utils/server/passwordHelper";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, accountId } = req.body;
  const hashedPassword = await passwordEncryption(password);
  console.log(email, password);
  const foundUser = await client.user.update({
    where: {
      accountId,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!foundUser) {
    return res.status(401).end();
  }

  return res.status(201).end();
}

export default withApiSession(withHandler({ methods: ["PUT"], handler, isPrivate: false }));