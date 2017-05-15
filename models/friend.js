//Simple DS for storage.
/*
Friend :
{
  email:"john@example.com",
  friends:Set,
  subscribes:Set,
  blocks:Set
}



*/
let friends = [];

function removeAll(){
  console.log("removing all data");
  friends.length = 0;
}

function findByEmail(email){
  for (let f of friends){
    if ( f.email == email){
      return f;
    }
  }
  return null;
}

function isBlockingEmail(friend, email){
  return friend.blocks.has(email);
}

function create(email){
  let existingCount = friends.length;
  let newFriend = {
      email: email,
      friends: new Set(),
      subscribes: new Set(),
      blocks: new Set()
    };
  friends.push(newFriend);
  return newFriend;
}

module.exports = {friends,findByEmail, removeAll, create, isBlockingEmail};