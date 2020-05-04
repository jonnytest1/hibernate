# hibernateTS
typescript clone for hiberante/persistance API


configure database with annotations
```javascript
import {database} from "hibernatets"

@table("test")
class TestModel{

  @primary()
  id:number
  
  @column()
  randomcolumn:string
  
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

