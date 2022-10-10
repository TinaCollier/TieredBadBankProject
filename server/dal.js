
const uri = process.env.MONGODB_URI;

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tinacollier:B1RsnSpltJaEP9mo@badbankinstance.wpy6j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


let db;

// create an account
async function create( name, email, password ){
    const doc = { name, email, password, balance: 0 };
    console.log ('doc', doc)
    const connection = await client.connect();
    const db         = await connection.db( 'tieredbadbank' );
    const collection = await db.collection( 'Users' );
    const results    = await collection.insertOne( doc, { w:1 } );
    return results;
}


// find account by email
async function findOneByEmail( email ) {
    const connection = await client.connect();
    const db         = await connection.db( 'tieredbadbank' );
    const collection = await db.collection( 'Users' );
    const results    = await collection.findOne( { email } );

    return results;
}


// update account balance
async function update( email, amount ){
    const connection = await client.connect();
    const db         = await connection.db( 'tieredbadbank' );
    const collection = await db.collection( 'Users' );
    const results    = await collection.findOneAndUpdate(
        { email: email },
        { $set: { balance: amount } },
        { returnOriginal: false });
    return results;
}


// return all accounts
async function all(){
    const connection   = await client.connect();
    const db           = await connection.db( 'tieredbadbank' );
    const collection   = await db.collection( 'Users' );
    const results      = await collection.find( {} );
    const resultsArray = await results.toArray();
    return resultsArray;
}

// delete an account
async function remove( email ){
    const connection   = await client.connect();
    const db           = await connection.db( 'tieredbadbank' );
    const collection   = await db.collection( 'Users' );
    const results      = await collection.find( {} ).deleteMany({ email: email });
    return results;
}

module.exports = { create, findOneByEmail, update, all, remove };