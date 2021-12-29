import { load, save } from '../../src/src'
import { DataBaseBase } from '../../src/src/mariadb-base'
import { SqlCondition } from '../../src/src/sql-condition'
import { ClWithMApping } from '../testmodels/cl-with-mapping'
import { TestModel } from '../testmodels/test-model'

export async function testlaodCalls() {

    const cl1 = new ClWithMApping()
    cl1.test.push(new TestModel(1, "123"))
    cl1.test.push(new TestModel(2, "1232"))

    const cl2 = new ClWithMApping()
    cl2.test.push(new TestModel(3, "1233"))
    cl2.test.push(new TestModel(4, "124"))

    const saved = await save([cl1, cl2])

    let queryCount = DataBaseBase.queryCt
    const loaded = await load(ClWithMApping, "TRUE=TRUE", undefined, {
        deep: ["test"]
    })
    const newCount = DataBaseBase.queryCt
    if (queryCount + 2 !== newCount) {
        throw "didnt load stuff efficiently"
    }

    const loadedWithCondition = await load(ClWithMApping, SqlCondition.ALL, undefined, {
        deep: ["test"]
    })
    if (newCount + 2 !== DataBaseBase.queryCt) {
        throw "didnt load stuff efficiently"
    }
    for (const loadedMappings of [loaded, loadedWithCondition]) {
        if (loadedMappings.length != 2) {
            throw "didnt load all"
        }

        if (loadedMappings[0].test.length !== 2) {
            throw "didnt load nested"
        }
        if (loadedMappings[1].test.length !== 2) {
            throw "didnt load nested"
        }
    }



    let queryCount2 = DataBaseBase.queryCt
    const loadedObj = await load(ClWithMApping, {
        options: {
            deep: ["test"]
        }
    });
    const newCount2 = DataBaseBase.queryCt
    if (queryCount2 + 2 !== newCount2) {
        throw "didnt load stuff efficiently"
    }

    if (loadedObj.length != 2) {
        throw "didnt load all"
    }

    if (loadedObj[0].test.length !== 2) {
        throw "didnt load nested"
    }
    if (loadedObj[1].test.length !== 2) {
        throw "didnt load nested"
    }
}