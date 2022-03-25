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

