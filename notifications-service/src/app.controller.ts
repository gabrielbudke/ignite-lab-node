import { Controller, Get, Post, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from "./prisma.service";
import { randomUUID } from "node:crypto";
import { Body } from "@nestjs/common/decorators";
import { CreateNotificationBody } from "./create-notification-body";

@Controller("notifications")
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    // return this.appService.getHello();
    const notifications = await this.prisma.notification.findMany();  
    return notifications;
    // return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content, 
        category, 
        recipientId
      }
    });
  }

  @Delete()
  async delete() {
    await this.prisma.notification.deleteMany();
  }
}
