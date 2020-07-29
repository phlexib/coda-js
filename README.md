<h2 align="center">Coda - Node API</h2>

An eloquent Node API for interacting with your Coda Docs. This API utilizes the [Coda REST API (beta)](https://coda.io/developers/apis/v1).

![npm](https://img.shields.io/npm/dw/coda-js)
![npm type definitions](https://img.shields.io/npm/types/typescript)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/coda-js)

---

## Features

- list or get specific Folder, Section, Doc, Table, Column, Row, and Control information
- query, insert, update, or delete table data
- more formatting options than Coda's REST API for inserting or retrieving row values
- an eloquent API (see examples)
- handle Coda error types

## Installation

```bash
# yarn
$ yarn add coda-js

# npm
$ npm install --save coda-js
```

## Usage

This API uses the same method names as found in the [Coda Docs (beta)](https://coda.io/developers/apis/v1). Review them for additional methods.
Note that using item IDs is best (doesn't change), but each parameter that accepts an ID also accepts the name for convenience.
All methods can be used from the base instance or from their respective parent.
For example:

```js
// uses two requests, but makes sense when you don't know all information ahead of time
const doc = await coda.getDoc('O7d9JvX0GY');
const table = await doc.getTable('grid-_14oaR8gdM');
```

could be consolidated into:

```js
// uses only one request, which is best when you already know the exact IDs to get the item(s) directly
await coda.getTable('O7d9JvX0GY', 'grid-_14oaR8gdM');
```

## Notice

Be aware that inserting, updating, and deleting methods are not synchronous. They return true if the operation
successfully added the request to Coda's API queue. It does not directly mean that the operation was successful or that
it is complete. Because of this, it is strongly discouraged (in Coda docs) to query after performing one of these operations because
the inserted/updated/deleted data may not have been processed yet.

## Token

Generate your token in your Coda profile settings. Notice: Everyone with this token has full access to all your docs! It is recommended to not use this client-side or anywhere your API token could be found.

## TODOs

- [ ] add formulas API

## Examples

Please note that the examples are currently only displaying async/await usage. You may use any strategy to handle the returned promises.

#### Testing Connection

```js
import { Coda } from 'coda-js';

const coda = new Coda('**********-********-*********'); // insert your token

// trick for using async in a script
(async () => {
  const whoAmI = await coda.whoAmI();
  console.log(whoAmI);
})().catch((error) => console.log(error));
```

#### Retrieving Data (List/Get)

```js
const docs = await coda.listDocs();
console.log(docs);

const firstDoc = docs[0];
const firstDocTables = await firstDoc.listTables();
console.log(firstDocTables);

const columns = await firstDocTables[0].listColumns();
console.log(columns.map((column) => column.name)); // list column names

const table = docs.getTable('grid-**********'); // insert/inject table name or ID here
const rows = await table.listRows({
  useColumnNames: true, // param to display column names rather than key
});
const firstRow = rows[0];
console.log(firstRow.values); // column/value pairs
console.log(firstRow.listValues()); // each column is object with column and value properties

const tableType =table.tableType; //get tableType
const parentTable = tableType==="view" ? return table.parentTable : table; // if the table is a view, we can access its parent Table.
console.log(parentTable.id)

const controls = await coda.listControls('some-doc-ID');
// or
const controls = await firstDoc.listControls();
```

#### Inserting

Inserting also has a second parameter of keyColumns that allows for an "upsert". See Coda documentation for details.

```js
// inserting using object
await table.insertRows([
  {
    Name: 'Jacob',
    Action: 'Take out the trash',
    Completed: true,
  },
]);

// inserting via column objects
await table.insertRows([
  [
    { column: 'Name', value: 'Alexis' },
    { column: 'Action', value: 'Do the dishes' },
  ],
  [
    { column: 'Name', value: 'Parker' },
    { column: 'Action', value: 'Make dinner' },
    { column: 'Completed', value: true },
  ],
]);
```

#### Updating

```js
// updating (using column name instead of ID)
await table.updateRow('i-cpDDo9hAEU', {
  Completed: false,
});

// updating via column objects
await table.updateRow('i-dF2-OoiiUi', [
  { column: 'Action', value: 'Make the bed' },
]);

// updating off of an already fetched row
await row2.update({
  'ai-dRD9afcc8': 'To the moon, Alice!',
});
```

#### Deleting

```js
// delete row directly
const row4 = await table.getRow('i-Ef2-OoZxIi');
await row4.delete();

// delete row from table
await table.deleteRow('i-cpDDoshUEU');

// deleting multiple rows from table
await table.deleteRows(['i-cpDDoshUEU', 'i-jj81vtosO1']);
```

#### Error Handling

Error types:

- BadRequestError (400)
- UnauthorizedError (401)
- ForbiddenError (403)
- NotFoundError (404)
- GoneError (410)
- TooManyRequestsError (429)

```js
import { Coda, UnauthorizedError, NotFoundError } from '../index';
const coda = new Coda(process.env.TOKEN);

// doesn't have access to view docs
try {
  await coda.listDocs();
} catch (error) {
  // error is instance of UnauthorizedError
  // can also determine based on (error.name === 'UnauthorizedError')
}

// fails to find a doc with a bad ID
try {
  const BAD_DOC_ID = 'd-ckjd1013kkk';
  await coda.listTables(BAD_DOC_ID);
} catch (error) {
  // error is instance of NotFoundError
  // can also determine based on (error.name === 'NotFoundError')
}
```
