import { User } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { prisma } from "../../project3-common/src/prisma/";
import { HelloAPI } from "../../project3-common/src/types";
import { AsyncAPIRes } from "./helpers/types";

@Injectable()
export class AppService {
  getHello(): HelloAPI {
    return { message: "Hello world man say!" };
  }

  async createUser(): AsyncAPIRes<User> {
    const res = await prisma.user.create({
      data: {
        name: "Ola Nordmann",
      },
    });
    return res;
  }
}