import { Subjects } from './subjects';


interface Event {
    subject: Subjects,
    data: any
}
export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract onMessage(data: T['data']): void;
    private channel: any;
    private queue: any;

    constructor(channel: any, queue: string) {
        this.channel = channel;
        this.queue = queue;
    }

    async listen() {
        await this.channel.consume(this.queue, async (data: any) => {
            const parsedData = this.parseMessage(data)
            this.onMessage(parsedData)
        })
    }

    parseMessage(msg: any) {
        try {
            const data = msg!.content;
            return typeof data === 'string'
              ? JSON.parse(data)
              : JSON.parse(data.toString('utf8'));
        } catch (error) {
            console.log(error)
        }
    }
}
