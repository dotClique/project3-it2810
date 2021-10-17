import { User } from ".prisma/client";
import { Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { HelloAPI } from "../../project3-common/src/types";
import { AppService } from "./app.service";
import { AsyncAPIRes } from "./helpers/types";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): HelloAPI {
    return this.appService.getHello();
  }

  @Post("user")
  async createUser(): AsyncAPIRes<User> {
    try {
      const result = await this.appService.createUser();
      return result;
    } catch {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
  }

  @Get("user")
  async getUser(): AsyncAPIRes<User> {
    try {
      const result = await this.appService.getUser();
      if (result == null) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      return result;
    } catch {
      throw new HttpException("Error in getting user", HttpStatus.BAD_REQUEST);
    }
  }
}
