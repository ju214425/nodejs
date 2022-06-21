const mongodb = require('mongodb');

const db = require('../data/database');

class User {
    constructor(name, email, password, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
    }

    static async getAllUsers() {
        const userDocument = await db.getDb().collection('users').find().toArray();
        
        return userDocument.map(function(userDocument) {
            return new User(userDocument.name, userDocument.email, 
                userDocument.password,userDocument._id);
        });
    }

    save() {
        if(this.id) {
            const userId = new mongodb.ObjectId(this.id);
            return db.getDb().collection('users').updateOne({_id: userId }, {
                $set: { 
                    name: this.name, 
                    email: this.email, 
                    password: this.password}});
        } else {
            return db.getDb().collection('users').insertOne({
                name: this.name, 
                email: this.email, 
                password: this.password});
        }
    }

    delete() {
        if(!this.id) {
            throw new Error('Trying to delete users without id!');
        }
        const userId = new mongodb.ObjectId(this.id);
        return db.getDb().collection('users').deleteOne({ _id: userId })
    }
}

module.exports = User;