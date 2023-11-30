import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io'

@WebSocketGateway({ namespace: 'events', cors: true })
export class SocketGateway{
    private clientConnections: ClientConnection[] = []

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        console.log('received data from client', data)
        return data
    }

    @SubscribeMessage('register')
    registerClient(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket
    ): string {
        this.removeCurrentClient(data.id)
        this.addClientConnection({
            id: data.id,
            connection: client
        })

        // console.log('clients', this.clientConnections)
        return 'client registered'
    }

    @SubscribeMessage('sendMessage')
    sendMessage(
        @MessageBody() data: any
    ): string {
        const { sender_id, receiver_id, message } = data
        const receiverConnection = this.clientConnections.find((connection) => {
            return connection.id === receiver_id
        })

        console.log('receiverConnection', receiverConnection)
        if (receiverConnection) {
            receiverConnection.connection.emit('sendMessage', {
                sender_id: sender_id,
                receiver_id: receiver_id,
                message: message
            })
        }

        return `${sender_id} has sent a message to ${receiver_id}`
    }

    @SubscribeMessage('offer')
    sendOffer(
        @MessageBody() data: any
    ): string {
        const { sender_id, receiver_id, offer } = data
        const receiverConnection = this.clientConnections.find((connection) => {
            return connection.id === receiver_id
        })

        if (receiverConnection) {
            receiverConnection.connection.emit('offer', {
                sender_id: sender_id,
                receiver_id: receiver_id,
                offer: offer
            })
        }

        return `${sender_id} has sent offer to ${receiver_id}`
    }

    @SubscribeMessage('answer')
    sendAnswer(
        @MessageBody() data: any
    ): string {
        const { sender_id, receiver_id, answer } = data
        const receiverConnection = this.clientConnections.find((connection) => {
            return connection.id === receiver_id
        })

        if (receiverConnection) {
            receiverConnection.connection.emit('answer', {
                sender_id: sender_id,
                receiver_id: receiver_id,
                answer: answer
            })
        }

        return `${sender_id} has sent answer to ${receiver_id}`
    }

    @SubscribeMessage('new-ice-candidate')
    sendIceCandidate(
        @MessageBody() data: any
    ): string {
        const { sender_id, receiver_id, ice_candidate } = data
        const receiverConnection = this.clientConnections.find((connection) => {
            return connection.id === receiver_id
        })

        if (receiverConnection) {
            receiverConnection.connection.emit('new-ice-candidate', {
                sender_id: sender_id,
                receiver_id: receiver_id,
                ice_candidate: ice_candidate
            })
        }

        return `${sender_id} has sent new-ice-candidate to ${receiver_id}`
    }

    removeCurrentClient(id: string) {
        if (this.clientConnections.length > 0) {
            this.clientConnections = this.clientConnections.filter((connection) => {
                return connection.id !== id
            })
        }
    }

    addClientConnection(clientConnection: ClientConnection) {
        this.clientConnections.push(clientConnection)
    }
}

interface ClientConnection {
    id: string,
    connection: Socket
}