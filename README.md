# hibernateTS
typescript clone for hiberante/persistance API

currently only support for mariadb dabases 

set up with 
```javascript
const db = process.env.DB_NAME;
const port = +process.env.DB_PORT;
const user = process.env.DB_USER;
const url = process.env.DB_URL;
const password = process.env.DB_PASSWORD;
```
env varaibles


configure database with annotations
```javascript
import {database} from "hibernatets"

@table("test")
class TestModel{

  @primary()
  id:number
  
  @column()
  randomcolumn:string
  
  @mapping(Mappings.OneToMany,OtherModel,"reverseforeignkey")
  othermodels:Array<OtherModel>
  
  //...
}
```

objects can then be laoded with 

```javascript
const obj=database.load(TestModel,t=>t.randomcolumn="test"); //assignment here
```

or 
```javascript
const obj:Array<TestModel>=database.load(TestModel,"`randomcolumn = ?`",\["test"]);
```
or
```javascript
const obj:TestModel=await database.load(TestModel,1) // primary key
```


assignemnts to loaded objects get automatically persisted and can be awaited with 
```javascript
await database.queries(obj)
```
save and delete can also be done
```javascript
database.delete()
database.save()
```

