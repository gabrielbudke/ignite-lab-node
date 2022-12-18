import { Controller, Body, Post, Delete } from '@nestjs/common';
import { SendNotification } from "src/application/use-cases/send-notification";
import { CreateNotificationBody } from "../dtos/create-notification-body";

@Controller("notifications")
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content, category, recipientId
    });

    return { notification };
  }
}
