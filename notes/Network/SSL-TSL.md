---
sidebar_label: SSL/TSL Certificate
sidebar_position: 1
title: SSL/TSL
---

import Video from "@site/src/components/video/video"

# SSL/TSL与CA(X.509)证书

## SSL/TSL

SSL(Secure Sockets Layer)是TLS(Transport Layer Security)的前身，其两者是使用非对称加密确保传输安全的传输协议，在网络模型中位于传输层和应用层之间。

TLS协议可以服务于HTTP，SMTP及POP3客户端，可以携带证书进行非匿名通信，也可以不携带证书进行匿名通信。

协议加密的过程如下：

<Video src="https://f.video.weibocdn.com/o0/M3dYGuVXlx07UMSOhUiQ01041200607s0E010.mp4?label=mp4_1080p&template=1920x1080.25.0&media_id=4751376396517406&tp=8x8A3El:YTkl0eM8&us=0&ori=1&bf=4&ot=h&lp=00002njT6N&ps=mZ6WB&uid=3VOy30&ab=3915-g1,6377-g0,1192-g0,1191-g0,1046-g2,1258-g0,3601-g19&Expires=1648312076&ssig=8vt3tHYNFa&KID=unistore,video" />

## CA证书

### CA证书的格式

一般采用X.509标准，有「PEM」和「DER」两种编码格式，其中.pem最为常见，都以*UTF-8*文本进行储存。

:::caution
其中可能包含一个证书或者一个证书链(pkcs 证书中，因包含整个证书链)
:::

将「PEM」或「DER」拓展名换成 *.crt*(UNIX)* .cer*(Windows)，就可以被操作系统识别成证书文件，即可被操作系统安装。

PKCS #12(.pfx)：是公钥加密标准的一种，它定义描述了个人信息交换语法的标准（确定了信息在交换时的安全性、一般应用于Windows），可以将包含了公钥的X.509证书和证书对应的私钥以及其他信息打包，进行数据交换。为了确保安全性

:::caution
在打包和解包的时候需要使用一个密码
:::

### CA证书里的信息

<details>
  <summary>证书基本信息(subject)</summary>
  <ul>
    <li>域名CN</li>
    <li>机构或个人O</li>
    <li>国家C</li>
    <li>省市或区S</li>
    <li>城市L</li>
  </ul>
</details>
<div className="alert--info alert i-details">
  颁发机构信息和签名算法信息(issuer)
</div>
<details>
  <summary>证书签名(----BEGIN CERTIFICATE---)</summary>
  <div>用CA私钥签名后的证书所有者公钥</div>
</details>

### CA证书的验证流程

1. 每个客户端都安装有CA机构的根证书
2. CA证书里包含CA机构用私钥进行的签名，和CA机构的信息
3. 客户端用对应CA机构的公钥验证签名，即可判断证书的合法性

### CA证书生成流程：

1. 客户端自己配置好证书信息，并生成自己的私钥
2. 客户端用自己的私钥给配置信息签名，生成`CERTIFICATE REQUEST`（只有客户端拥有私钥，就保证的该证书的所有权）
3. 客户端上传`CERTIFICATE REQUEST`到CA机构
4. CA机构根据配置文件生成证书，并用自己的根证书私钥对证书进行签名

### 用Open SSL生成生成CERTIFICATE REQUEST

```shell title="Config File"
[ req ]
default_bits = 2048
distinguished_name = req_distinguished_name
req_extensions = req_ext
prompt = no
[ req_distinguished_name ]
countryName = CN
stateOrProvinceName = SOPN
localityName = LN
organizationName = ON
organizationalUnitName = OUN
commonName = Domain
[ req_ext ]
subjectAltName = @alt_names
[alt_names]
DNS.1 = Domain

```

```shell title="Generation RSA Private Key"
openssl genrsa -out "KEY_NAME.key" 2048
```

```shell title="Generation New CERTIFICATE REQUEST"
openssl req -new -key "KEY_NAME.key" -out "OUT_PUT_FILE_NAME.csr" -config "CONFIG_FILE.cnf"
```

```shell title="Convert .pem or .cer to #PK12"
openssl pkcs12 -export -out "${OUT_PUT_NAME}.pfx" -inkey "${PRIVATE_KEY}.key" -in ${"CERTIFICATION_NAME"}.pem
```
:::caution
Certification必须保证包含父级证书，pem里面保存的并不是单一证书，此处的私钥为生成Certificate Request文件的私钥，即与证书中公钥配套的那个私钥。
:::