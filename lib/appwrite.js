import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.nayon.aora",
  projectId: "66c54a5b0013e61dc32d",
  databaseId: "66c55be200316aa4cfe2",
  userCollectionId: "66c55c26002edd0b6de4",
  videoCollectionId: "66c55c72001ed69d4054",
  storageId: "66c55e97001dd47fa00d",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async(email,password,username,) => {
 try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )

    if(!newAccount) throw new Error("Account not created")
    
    const avatarUrl = avatars.getInitials()

    await signIn(email,password)
    const  newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar:avatarUrl

        }
    )
    return newUser;
 } catch (error) {
    console.log(error)
    throw new Error(error)
 }
};

export const signIn = async(email,password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
      
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () =>{
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]

    } catch (error) {
      console.log(error)  
    }
}