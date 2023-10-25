import { Subjects } from './subjects';

interface Event {
    subject: Subjects,
    data: any
}
export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    private channel;
    private queue;

    constructor(channel: any, queue: string) {
        this.channel = channel;
        this.queue = queue;
    }


    publish(data: T['data']): any{
        this.channel.sendToQueue(
            this.queue,
            Buffer.from(
              JSON.stringify({
                ...data,
                date: new Date(),
              }),
            ),
          )
        return false
    }
}


