import {registeredTouch} from '@/api'

import {encrypt, decrypt} from './jsencrypt'
import {getToken, setToken, removeToken} from "./token"


export {getToken, setToken, removeToken, encrypt, decrypt}

interface TouchIDOptions {
    publicKey: {
        rp: { name: string } // 网站信息
        user: {
            name: string // 用户名
            id: ArrayBuffer // 用户id(ArrayBuffer)
            displayName: string // 用户名
        }
        pubKeyCredParams: [
            {
                type: 'public-key'
                alg: number // 接受的算法 -7
            }
        ]
        challenge: ArrayBuffer // 凭证(touchIDOptions)
        authenticatorSelection: {
            authenticatorAttachment: 'platform'
        }
    }
}

const touchIDRegistered = async function (userName: string, userId: string, certificate: string) {
    // 校验设备是否支持touchID
    const hasTouchID = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
    if (hasTouchID) {
        // 更新注册凭证
        const touchIdOptions: TouchIDOptions = {
            publicKey: {
                rp: {name: 'moyun'}, // 网站信息
                user: {
                    name: '', // 用户名
                    id: new ArrayBuffer(0), // 用户id(ArrayBuffer)
                    displayName: '' // 用户名
                },
                pubKeyCredParams: [
                    {
                        type: 'public-key',
                        alg: -7 // 接受的算法
                    }
                ],
                challenge: new ArrayBuffer(0), // 凭证(touchIDOptions)
                authenticatorSelection: {
                    authenticatorAttachment: 'platform'
                }
            }
        }

        touchIdOptions.publicKey.challenge = base64ToArrayBuffer(certificate)
        // 更新用户名、用户id
        touchIdOptions.publicKey.user.name = userName
        touchIdOptions.publicKey.user.displayName = userName
        touchIdOptions.publicKey.user.id = base64ToArrayBuffer(userId)

        // 调用指纹设备，创建指纹
        const publicKeyCredential = await navigator.credentials.create(touchIdOptions)
        if (
            publicKeyCredential &&
            'rawId' in publicKeyCredential &&
            'response' in publicKeyCredential
        ) {
            // 将rowId转为base64
            const rawId = publicKeyCredential['rawId'] as ArrayBuffer
            const touchId = arrayBufferToBase64(rawId)
            // 获取客户端信息
            const response = publicKeyCredential['response'] as { clientDataJSON: ArrayBuffer }
            const clientDataJSON = arrayBufferToString(response['clientDataJSON'])
            // 调用注册TouchID接口
            await registeredTouch({
                touchId,
                ...JSON.parse(clientDataJSON)
            }).then((res: any) => {
                if (res.code === 200) {
                    // 保存touchId用于指纹登录
                    // localStorage.setItem('touchId', touchId)
                    return
                }
                alert(res.msg)
            })
        }
    }
}

const base64ToArrayBuffer = function (base64: string) {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
}

const arrayBufferToBase64 = function (buffer: ArrayBuffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
}

const arrayBufferToString = function (buffer: ArrayBuffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return binary
}

export {touchIDRegistered, base64ToArrayBuffer, arrayBufferToBase64, arrayBufferToString}
