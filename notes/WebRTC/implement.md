# 实现一个WEB RTC应用

## 信令服务器

## ICE 服务器

### 自托管的STUN（Session Traversal Utilities for NAT）和TURN（Traversal Using Relays around NAT）服务器

STUN/TURN是一种自行搭建和维护的服务器，用于帮助WebRTC应用程序在存在NAT（Network Address Translation）和防火墙的网络环境中建立连接。以下是一些常见的自托管STUN和TURN服务器选项：

1. **coturn（rfc5766-turn-server）**：
    - **网址**: https://github.com/coturn/coturn
    - **开源性质**: 是
    - **说明**: coturn 是一个非常流行的开源TURN服务器，完全符合RFC 5766标准。它支持Linux、Windows和macOS等操作系统。coturn还具有丰富的配置选项，可用于满足各种应用程序的需求。

2. **RFC 5766 TURN Server**：
    - **网址**: https://tools.ietf.org/html/rfc5766
    - **开源性质**: 不是
    - **说明**: 这是TURN协议的RFC 5766参考实现，可以作为参考用于构建自托管的TURN服务器。虽然它不是一个完整的开源项目，但RFC文档提供了有关如何实现RFC 5766标准的详细信息。

3. **restund**：
    - **网址**: https://github.com/sctplab/turnserver
    - **开源性质**: 是
    - **说明**: restund 是一个开源的STUN/TURN服务器，支持Linux和其他POSIX系统。它设计简洁，易于配置和扩展。虽然它不如coturn那样强大，但对于基本的STUN和TURN需求来说可能是足够的。

4. **PJNATH**：
    - **网址**: https://github.com/pjsip/pjproject
    - **开源性质**: 是
    - **说明**: PJNATH是一个开源的NAT穿越库，它包含了STUN和TURN服务器的实现。它可以用于构建自己的STUN和TURN服务器，并且可以与PJSIP等VoIP库集成。

5. **CoTURN Docker镜像**：
    - **网址**: https://hub.docker.com/r/coturn/coturn
    - **开源性质**: 是
    - **说明**: 你还可以使用Docker容器来部署coturn。在Docker Hub上有coturn的官方镜像，这使得部署和管理变得更加容易。

请注意，自托管STUN和TURN服务器的选择取决于你的具体需求、部署环境和技术栈。在选择服务器之前，你应该考虑服务器的性能、配置选项、可维护性以及与你的应用程序的集成。此外，确保配置服务器以提供所需的安全性和隐私保护措施，以确保用户数据的安全。

> Google提供了免费的STUN（Session Traversal Utilities for NAT）服务器，用于帮助WebRTC设备发现其公共IP地址和端口。这些服务器的地址通常是： 
>
> stun.l.google.com:19302
> 
> stun.l.google.com:19302
> 
> stun.l.google.com:19302
> 
> stun.l.google.com:19302
> 
> stun.l.google.com:19302
> 
> **请注意，这些服务器仅用于获取公共地址，不能用于中继数据流量。**