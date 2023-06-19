import prisma from "@/lib/prisma";
import { Event, User } from "@prisma/client";
import * as bcrypt from "bcrypt";




async function getEvents(userId: number): Promise<Event[] | []> {
    let events = await prisma.event.findMany({ where: { ownerId: userId } });
    return events;
}
async function updateEvent(event: Event): Promise<Event | null> {
    let updatedEvent = await prisma.event.update({ where: { id: event.id }, data: event });
    return updatedEvent;
}
async function deleteEvent(eventId: number): Promise<Event | null> {
    let deletedEvent = await prisma.event.delete({ where: { id: eventId } });
    return deletedEvent;
}
async function createEvent(event: Event): Promise<Event | null> {
    let createdEvent = await prisma.event.create({ data: event });
    return createdEvent;
}
async function createUser(user:User) {
    user.password=await bcrypt.hash(user.password, 10);
    let createdUser=await prisma.user.create({data:user});
    return createdUser;
}

export { getEvents, updateEvent, deleteEvent, createEvent,createUser };