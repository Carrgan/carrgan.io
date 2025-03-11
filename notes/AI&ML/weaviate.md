# How to use the weaviate DB

## Pull and run the docker

```yaml title="weaviate.yml"
version: 'latest'
services:
  weaviate:
    command:
      - --host
      - 0.0.0.0
      - --port
      - '8080'
      - --scheme
      - http
    image: cr.weaviate.io/semitechnologies/weaviate:1.29.0
    ports:
      - "4001:8080"
      - "50051:50051"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
    volumes:
      - ./weaviate-db:/var/lib/weaviate
    restart: on-failure:0
```

Start the docker

```shell
docker-compose -f ./weaviate.yml up -d
```

## Python clint

```python
from sentence_transformers import SentenceTransformer
import weaviate
from weaviate.classes.config import Configure
```


```python
model = SentenceTransformer("./paraphrase-multilingual-mpnet-base-v2")
```


```python
client = weaviate.connect_to_local(host="localhost", port=4001, grpc_port=50051)
```


```python
client.is_ready()
```


```python
from weaviate.collections.classes.config import DataType, Property, VectorDistances

client.collections.create(
    name="Document",
    properties=[
        Property(
            name="text",
            data_type=DataType.TEXT
        )
    ],
    vectorizer_config=Configure.Vectorizer.none(),
    vector_index_config=Configure.VectorIndex.flat(
        distance_metric=VectorDistances.COSINE  # Use the COSINE simulation
    )
)
```


```python
sentences = [
    "我喜欢吃苹果",
    "苹果公司的总部在美国",
    "深度学习和机器学习是人工智能的一部分",
    "Python是一种流行的编程语言",
    "Je aime manger des pommes",
    "Bonjour le monde!",
]

embeddings = model.encode(sentences, convert_to_numpy=True)
```


```python
doc_collection = client.collections.get("Document")
with doc_collection.batch.dynamic() as batch:
    for sentence, embedding in zip(sentences, embeddings):
        batch.add_object(
            properties={"text": sentence},
            vector=embedding.tolist()  # 转换为Python list格式
        )
```


```python
def semantic_search(query, k=3):
    query_embedding = model.encode([query], convert_to_numpy=True)
    query_vector = query_embedding[0].tolist()
    
    results = []
    response = doc_collection.query.near_vector(
        near_vector=query_vector,
        limit=k,
        return_metadata=["distance"]
    )
    
    for obj in response.objects:
        results.append({
            "text": obj.properties["text"],
            "cosine_similarity": 1 - obj.metadata.distance
        })
    return results
```


```python
queries = [
    "苹果",
    "machine learning",
    "Bonjour",
]

for query in queries:
    print(f"\nQuery: '{query}'")
    results = semantic_search(query, k=2)
    for res in results:
        print(f"- {res['text']} (相似度: {res['cosine_similarity']:.4f})")
```

    
    Query: '苹果'
    - 我喜欢吃苹果 (相似度: 0.7459)
    - Je aime manger des pommes (相似度: 0.7168)
    
    Query: 'machine learning'
    - 深度学习和机器学习是人工智能的一部分 (相似度: 0.8378)
    - Python是一种流行的编程语言 (相似度: 0.1669)
    
    Query: 'Bonjour'
    - Bonjour le monde! (相似度: 0.8217)
    - Je aime manger des pommes (相似度: 0.2203)

