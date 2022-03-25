---
sidebar_label: SSL/TSL Certificate
sidebar_position: 1
title: SSL/TSL
---

# SSL/TSL

SSL(Secure Sockets Layer)是TLS(Transport Layer Security)的前身，


# Generation Certificate Request Open SSL

Config file

```shell
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

1. Generation RSA Private Key

```shell
openssl genrsa -out "KEY_NAME.key" 2048
```

2. Generation New CERTIFICATE REQUEST

```shell
openssl req -new -key "${KEY_NAME}.key" -out "${OUT_PUT_FILE_NAME}.csr" -config "${CONFIG_FILE}.cnf"
```

3. Convert .pem or .cer to #PK12

Certification必须保证包含父级证书，pem里面保存的并不是单一证书

```shell
openssl pkcs12 -export -out "${OUT_PUT_NAME}.pfx" -inkey "${PRIVATE_KEY}.key" -in ${"CERTIFICATION_NAME"}.pem
```
