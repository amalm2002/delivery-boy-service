
import 'dotenv/config'

export default {
    rebbitMQ: {
        url: String(process.env.RABBITMQ_URL)
    },
    queue: {
        deliveryBoyQueue: 'deliveryBoy_queue'
    }
}