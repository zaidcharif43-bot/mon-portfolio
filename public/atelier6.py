from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client["atelierPythonMongo"] 

print(db.list_collection_names())
for u in db.utilisateurs.find():
    print(u) 
db.utilisateurs.insert_one({
 "nom": "Karim",
 "email": "karim@test.com",
 "age": 26,
 "ville": "Agadir",
 "hobbies": ["surf", "musique"]
}) 

for u in db.utilisateurs.find({"age": {"$gt": 28}}):
 print(u)

db.utilisateurs.update_one(
 {"nom": "Ali"},
 {"$set": {"age": 24}}
)
db.utilisateurs.update_one(
 {"nom": "Ali"},
 {"$push": {"hobbies": "cinéma"}}
) 
for u in db.utilisateurs.find():
    print(u) 
db.utilisateurs.delete_one({"nom": "Hassan"}) 


# db.utilisateurs.create_index([("email", 1)], unique=True)
# print("tres bien")

pipeline = [
 {"$group": {"_id": "$ville", "age_moyen": {"$avg": "$age"}}},
 {"$sort": {"age_moyen": -1}}
]
for doc in db.utilisateurs.aggregate(pipeline):
 print(doc) 

pipeline = [
 {
 "$lookup": {
 "from": "utilisateurs",
 "localField": "idUtilisateur",
 "foreignField": "_id",
 "as": "detailsUtilisateur"
 }
 },
 {
 "$lookup": {
 "from": "produits",
 "localField": "idProduit",
 "foreignField": "_id",
 "as": "detailsProduit"
 }
 }
]
for doc in db.commandes.aggregate(pipeline):
 print(doc) 

