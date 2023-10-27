import { Subjects } from './subjects';


interface Event {
    subject: Subjects,
    data: any
}
export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract onMessage(data: T['data'], channel:any): void;
    private channel: any;
    private queue: any;

    constructor(channel: any, queue: string) {
        this.channel = channel;
        this.queue = queue;
    }

    async listen() {
        await this.channel.consume(this.queue, async (data: any) => {
            const msg = Buffer.from(data!.content)
            console.log(`Received ${msg}`)
            const parsedData = this.parseMessage(data)
            this.onMessage(parsedData, this.channel)
        })
    }

    parseMessage(msg: any) {
        try {
            return Buffer.from(msg!.content)
        } catch (error) {
            console.log(error)
        }
    }
}
