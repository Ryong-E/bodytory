import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export interface ResponseType {
  [key: string]: any;
}

type Method = "GET" | "POST" | "DELETE" | "PUT";
interface Config {
  methods: Method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
export default function withHandler({ methods, handler, isPrivate = true }: Config) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session?.user) {
      return res.status(401).json({ ok: false, message: "로그인이 필요합니다!" });
    }
    try {
      handler(req, res);
    } catch (err) {
      return res.status(500).json({ err });
    }
  };
}
