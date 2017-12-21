var SQLite = (function() { 

	var DB= null;
	var dataTypes = {
		NULL: 'NULL',
		AUTO: 'INTEGER PRIMARY KEY AUTOINCREMENT',
		INTEGER: 'INTEGER',
		REAL: 'REAL',
		TEXT: 'TEXT'
	};
	var connect =function(name, version, description,size){
		if(window.sqlitePlugin){
			DB = window.sqlitePlugin.openDatabase({name: "local.db", location: 'default'});
		}else{
			DB = openDatabase(name, version, description, size);
		}
	}
	var create = function(tableName , columnDef){
		return new Promise(function(resolve, reject){
			DB.transaction(function (tx) {
				var statement = 'CREATE TABLE  IF NOT EXISTS ' +tableName+ ' (';
				for (var name in columnDef) {
				    if (columnDef.hasOwnProperty(name)) {
				       statement+= name +" " + columnDef[name]+ ",";
				    }
				}
				statement = statement.slice(0,-1);
				statement+=")";				
	  			tx.executeSql(statement, [] ,function(tx,result){
					resolve();
	  			},function(tx,e){
	  				reject(e);
	  			});
			});
		});				
	}

	var add = function(tableName, dataDef){		
		return new Promise(function(resolve, reject){
			DB.transaction(function (tx) {
				var statement = 'INSERT INTO ' +tableName+ ' (';
				for (var name in dataDef) {
				    if (dataDef.hasOwnProperty(name)) {
				       statement+= name + ",";
				    }
				}
				statement = statement.slice(0,-1);
				statement+=") VALUES ("
				for (var name in dataDef) {
				    if (dataDef.hasOwnProperty(name)) {
				    	if(typeof dataDef[name] === 'number')
				       		statement+= dataDef[name] + ",";
				       	else
				       		statement+= "'"+ dataDef[name] + "',";
				    }
				}
				statement = statement.slice(0,-1);
				statement +=")";			
	  			tx.executeSql(statement, [] ,function(tx,result){
					resolve();
	  			},function(tx,e){
	  				reject(e);
	  			});
			});
		})
	}

	var remove = function(tableName, whereStatement){
		return new Promise(function(resolve, reject){
			DB.transaction(function (tx) {
				var statement = 'DELETE FROM ' +tableName+ ' ';
				if(whereStatement){
					statement+="WHERE ";
					for (var column in whereStatement) {
					    if (whereStatement.hasOwnProperty(column)) {
					    	if(typeof whereStatement[column] === "string"){
					    		statement+= column +" = '"+ whereStatement[column]+ "' AND ";
					    	}else{
					    		statement+= column +" = "+ whereStatement[column]+ " AND ";
					    	}
					       
					    }
					}
					statement = statement.slice(0,-4);	
				}				
	  			tx.executeSql(statement, [] ,function(tx,result){
					resolve();
	  			},function(tx,e){
	  				reject(e);
	  			});
			});
		});		
	}
	var edit = function(tableName, dataDef, whereStatement){
		return new Promise(function(resolve, reject){
			DB.transaction(function (tx) {
				var statement = 'UPDATE ' +tableName+ ' SET ';						
				for (var column in dataDef) {
					if (dataDef.hasOwnProperty(column)) {
						if(typeof dataDef[column] === 'number')
					    	statement+= column +" = "+ dataDef[column]+ ",";
					   	else
					   		statement+= column +" = '"+ dataDef[column]+ "',";
					}
				}			
				
				statement = statement.slice(0,-1);

				if(whereStatement){
					statement+=" WHERE ";
					for (var column in whereStatement) {
					    if (whereStatement.hasOwnProperty(column)) {
					       if(typeof whereStatement[column] === "string"){
					    		statement+= column +" = '"+ whereStatement[column]+ "' AND ";
					    	}else{
					    		statement+= column +" = "+ whereStatement[column]+ " AND ";
					    	}
					    }
					}
					statement = statement.slice(0,-4);
				}				
	  			tx.executeSql(statement, [] ,function(tx,result){
					resolve();
	  			},function(tx,e){
	  				reject(e);
	  			});
			});
		});
	}

	var destroy = function(tableName){
		return new Promise(function(resolve, reject){
			DB.transaction(function (tx) {
				var statement = 'DROP TABLE ' +tableName;				
	  			tx.executeSql(statement, [] ,function(tx,result){
					resolve();
	  			},function(tx,e){
	  				reject(e);
	  			});
			});
		});
	}

	var find = function(tableName, whereStatement){
		return new Promise(function(resolve, reject){
			DB.transaction(function (tx) {
				var statement = 'SELECT * FROM ' +tableName+ ' ';
				if(whereStatement){
					statement+="WHERE ";
					for (var column in whereStatement) {
					    if (whereStatement.hasOwnProperty(column)) {
					       if(typeof whereStatement[column] === "string"){
					    		statement+= column +" = '"+ whereStatement[column]+ "' AND ";
					    	}else{
					    		statement+= column +" = "+ whereStatement[column]+ " AND ";
					    	}
					    }
					}
					statement = statement.slice(0,-4);	
				}
				
	  			tx.executeSql(statement, [] ,function(tx,result){
					var table = [];
	  				for(var i=0;i<result.rows.length;i++){
	  					table.push(result.rows[i])
	  				}
	  				
					resolve(table);
	  			},function(tx,e){
	  				reject(e);
	  			});
			});
		});

	}

	var findAll = function(tableName){
		return new Promise(function(resolve, reject){
			DB.transaction(function (tx) {
				var statement = 'SELECT * FROM ' +tableName+ ';';													
	  			tx.executeSql(statement, [] ,function(tx,result){	  				
	  				var table = [];
	  				for(var i=0;i<result.rows.length;i++){
	  					table.push(result.rows[i])
	  				}	  				
					resolve(table);
	  			},function(tx,e){
	  				reject(e);
	  			});
			});
		});		
	}



	return {
		dataTypes: dataTypes,
		connect:connect,
		create:create,
		add: add,
		destroy: destroy,
		edit: edit,
		remove: remove,
		find: find,
		findAll: findAll
	}
	
}());