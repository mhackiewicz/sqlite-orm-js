# sqlite-orm-js
> This is simple, javascript library for doing sqlite transactions with promises.

## Uses
``` bash
npm install sqlite-orm-js
```

## Methods
* connect(name, version, description, size) - connection to local sqlite database

**Example**
```javascript
    SQLite.connect('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
```

* create(tableName , columnDef) - create table with column definitions

**Example**
```javascript
    SQLite.create('pets', {
      'id': 'INTEGER PRIMARY KEY AUTOINCREMENT',
      'name': "TEXT"
    }).then(function(){
        console.log("OK");
    }).catch(function(error){
        console.log("ERROR");
        console.log(error);
    });
```

* destroy(tableName) - drop table

**Example**
```javascript
    SQLite.destroy('pets')
```

* add(tableName,dataDefe) - insert values into table 

**Example**
```javascript
    SQLite.add('pets',{
      'name': 'Chris'
    }).then(function(){
        console.log("ADD OK");
    }).catch(function(error){
        console.log("ERROR");
        console.log(error);
    });
```

* edit(tableName,dataDef, whereStatement) - update table with 'where' statement

**Example**
```javascript
    SQLite.edit('pets',{
      'name': 'Christopher'
    },{
      'name': 'Chris'
    }).then(function(){
        console.log("EDIT OK");
    }).catch(function(error){
        console.log("ERROR");
        console.log(error);
    });
```

* find(tableName,whereStatement) - find rows with 'where' statemant 

**Example**
```javascript
    SQLite.find('pets',{
      'name': 'Christopher'
    }).then(function(result){
        console.log("FINDED:");
        console.log(result);
    }).catch(function(error){
        console.log("ERROR");
        console.log(error);
    });
```

* findAll(tableName) - find all rows in table 

**Example**
```javascript
    SQLite.findAll('pets').then(function(result){
        console.log("FINDED ALL:");
        console.log(result);
    }).catch(function(error){
        console.log("ERROR");
        console.log(error);
    });
```

* remove(tableName, whereStatement) - delete from table with 'where' statemant 

**Example**
```javascript
   SQLite.remove('pets',{
      'name': 'Chris'
    }).then(function(){
        console.log("REMOVE OK");
    }).catch(function(error){
        console.log("ERROR");
        console.log(error);
    });
```

