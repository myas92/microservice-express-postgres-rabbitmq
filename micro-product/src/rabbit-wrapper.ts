import amqp from 'amqplib'
import { config } from 'dotenv';
config()
const QUEUE: any = {
    order: 'order_queue',
    product: 'product_queue'
}
class RabbitWrapper {
    private _client: any;
    private _channel: any;
    private _queue: any;
    get client() {
        if (!this._client) {
            throw new Error('cannot access rabbitMQ client before connecting')
        }
        return this._client;
    }
    get channel() {
        if (!this._channel) {
            throw new Error('cannot access rabbitMQ channel before connecting')
        }
        return this._channel;
    }
    get orderQueue() {
        return QUEUE.order;
    }
    get productQueue() {
        return QUEUE.product;
    }
    
    async insertQueues() {
        for (const key of Object.keys(QUEUE)) {
            await this._channel.assertQueue(QUEUE[key]);
        }
    }

    async connect(host: string, port: string) {
        const amqpServer = `amqp://${host}:${port}` || 'amqp://localhost:5673';
        this._client = await amqp.connect(amqpServer);
        this._channel = await this._client.createChannel();
        await this.insertQueues()
    }


}


export const rabbitWrapper = new RabbitWrapper()