<script lang="ts" setup>
import { RSocketClient, MAX_STREAM_ID, JsonSerializer, IdentitySerializer, BufferEncoders } from 'rsocket-core'
import RSocketWebSocketClient from 'rsocket-websocket-client'
import { onMounted } from 'vue';
import { ReactiveSocket } from 'rsocket-types';
import Buffer from "vue-buffer";

const websocketUrl = 'ws://localhost:6869'
const client = new RSocketClient({
    setup: {
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0'
    },
    transport: new RSocketWebSocketClient({
        url: websocketUrl
    }),
    serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer,
    },
})

const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        console.log(event.target.result);
    };

    reader.readAsText(file); // 以文本格式读取文件内容，也可以使用readAsArrayBuffer读取为ArrayBuffer格式
}

onMounted(() => {
    client.connect().then((socket: ReactiveSocket<any, any>) => {
        socket.connectionStatus().subscribe((event: any) => console.log(event));
        // console.log(fs.readFileSync("C:/Users/64466/Desktop/file.txt"));
        const data = Buffer.from("!@3")

        socket.requestResponse({
            data: JSON.stringify(data), // 请求数据
            metadata: String.fromCharCode('file.echo'.length) + 'file.echo' // 消息处理路径
        }).subscribe({
            onError: (e: any) => console.log(e), // 错误处理
            onNext: (payload: any) => { // 响应接收
                console.log(payload);
            },
            // onSubscribe: (subscription: any) => { // 订阅处理
            //   subscription.request(MAX_STREAM_ID); // 订阅请求
            // }
        });

    })
})
</script>

<template></template>

<style lang="less" scoped></style>