import amqp from 'amqplib'
import { config } from 'dotenv';
config()
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
    get queue() {
        if (!this._queue) {
            throw new Error('cannot access rabbitMQ queue before connecting')
        }
        return this._queue;
    }

    async connect(host: string, port: string, queue: string) {
        this._queue = queue;
        const amqpServer = `amqp://${host}:${port}` || 'amqp://localhost:5673';
        this._client = await amqp.connect(amqpServer);
        this._channel = await this._client.createChannel();
        await this._channel.assertQueue(queue);
    }
}


export const rabbitWrapper = new RabbitWrapper()