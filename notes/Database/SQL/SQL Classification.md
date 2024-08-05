---
sidebar_position: 1
---
# SQL

SQL（Structured Query Language）是一种用于管理和操作关系数据库的标准语言。SQL语句根据其功能和用途可以分为以下几类：

## SQL语句分类总结

1. **DDL（Data Definition Language）**：

   - 作用：定义和修改数据库结构。
   - 常见语句：`CREATE`、`ALTER`、`DROP`、`TRUNCATE`
   - 特点：自动提交，不可回滚，影响数据库对象。
2. **DML（Data Manipulation Language）**：

   - 作用：操作数据库表中的数据。
   - 常见语句：`INSERT`、`UPDATE`、`DELETE`
   - 特点：可回滚，频繁使用，影响数据内容。
3. **DQL（Data Query Language）**：

   - 作用：查询和检索数据库中的数据。
   - 常见语句：`SELECT`
   - 特点：只读操作，灵活性高，可组合使用多种子句。
4. **DCL（Data Control Language）**：

   - 作用：控制数据库的访问权限。
   - 常见语句：`GRANT`、`REVOKE`
   - 特点：影响数据库安全，由DBA执行。
5. **TCL（Transaction Control Language）**：

   - 作用：管理数据库事务。
   - 常见语句：`COMMIT`、`ROLLBACK`、`SAVEPOINT`、`SET TRANSACTION`
   - 特点：确保数据一致性和完整性，控制提交和回滚。

## 数据定义语言（DDL - Data Definition Language）

#### 功能

DDL用于定义和管理数据库结构和对象，如表、索引、视图和存储过程。

#### 常见语句

- **CREATE**：创建数据库对象（如表、索引、视图等）。
  ```sql
  CREATE TABLE employees (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      salary DECIMAL(10, 2)
  );
  ```
- **ALTER**：修改已有的数据库对象。
  ```sql
  ALTER TABLE employees ADD COLUMN address VARCHAR(255);
  ```
- **DROP**：删除数据库对象。
  ```sql
  DROP TABLE employees;
  ```
- **TRUNCATE**：删除表中所有记录，但保留表结构。
  ```sql
  TRUNCATE TABLE employees;
  ```

#### 特点

- 影响数据库结构。
- 通常自动提交（不能回滚）。
- 结构性的操作，通常不涉及数据内容。

## 数据操作语言（DML - Data Manipulation Language）

#### 功能

DML用于对数据库表中的数据进行查询和操作（增、删、改）。

#### 常见语句

- **SELECT**：查询数据。
  ```sql
  SELECT * FROM employees;
  ```
- **INSERT**：插入数据。
  ```sql
  INSERT INTO employees (id, name, salary) VALUES (1, 'Alice', 50000.00);
  ```
- **UPDATE**：更新数据。
  ```sql
  UPDATE employees SET salary = 60000.00 WHERE id = 1;
  ```
- **DELETE**：删除数据。
  ```sql
  DELETE FROM employees WHERE id = 1;
  ```

#### 特点

- 操作数据库中的数据内容。
- 可回滚（事务控制）。
- 常用语句在应用程序中频繁使用。

## 数据控制语言（DCL - Data Control Language）

#### 功能

DCL用于定义数据库的访问权限和安全级别。

#### 常见语句

- **GRANT**：授予用户权限。
  ```sql
  GRANT SELECT, INSERT ON employees TO user_name;
  ```
- **REVOKE**：撤销用户权限。
  ```sql
  REVOKE SELECT, INSERT ON employees FROM user_name;
  ```

#### 特点

- 控制用户访问和权限。
- 影响数据库安全性。
- 通常由数据库管理员（DBA）执行。

## 事务控制语言（TCL - Transaction Control Language）

#### 功能

TCL用于管理数据库事务，确保数据的一致性和完整性。

#### 常见语句

- **COMMIT**：提交事务，保存所有变更。
  ```sql
  COMMIT;
  ```
- **ROLLBACK**：回滚事务，撤销所有未提交的变更。
  ```sql
  ROLLBACK;
  ```
- **SAVEPOINT**：设置保存点，允许部分回滚。
  ```sql
  SAVEPOINT savepoint_name;
  ```
- **SET TRANSACTION**：设置事务特性。
  ```sql
  SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  ```

#### 特点

- 管理事务的原子性、一致性、隔离性和持久性（ACID特性）。
- 控制数据的提交和回滚。
- 确保数据操作的安全和完整。

## 数据定义语言（DDL - Data Definition Language）

#### 功能

DQL用于查询和检索数据库中的数据，是数据库操作中最常用的部分。

#### 常见语句

- **SELECT**：查询数据，这是DQL中唯一且最主要的语句。通过`SELECT`语句，可以从一个或多个表中检索数据。

#### SELECT 语句的基本用法

```sql
SELECT column1, column2, ...
FROM table_name;
```

#### 示例

```sql
SELECT name, salary FROM employees;
```

#### 特点

- **查询数据**：用于从数据库中提取数据。
- **灵活性高**：可以使用各种子句、运算符和函数来过滤、排序和分组数据。
- **只读操作**：`SELECT`语句不修改数据，只读取数据。
- **组合其他子句**：
  - **WHERE**：条件过滤
    ```sql
    SELECT name, salary FROM employees WHERE salary > 50000;
    ```
  - **ORDER BY**：排序
    ```sql
    SELECT name, salary FROM employees ORDER BY salary DESC;
    ```
  - **GROUP BY**：分组
    ```sql
    SELECT department, AVG(salary) FROM employees GROUP BY department;
    ```
  - **HAVING**：过滤分组结果
    ```sql
    SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 50000;
    ```
  - **JOIN**：连接多个表
    ```sql
    SELECT employees.name, departments.name 
    FROM employees
    JOIN departments ON employees.department_id = departments.id;
    ```
