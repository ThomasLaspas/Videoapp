import { Client,Account, ID, Avatars, Databases,Query,Storage } from 'react-native-appwrite';
interface Props{
    email:string;
    password:string;
    username:string
}
interface Props2{
 
  thumnail:any;
  video:any;
  title:string;
  prompt:string;
  userId:string
}
export const appwriteConfig={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:"com.thomas.aora",
    projectId:"668d8fc300195fcd3894",
    databaseId:"668d9187001ccd34b20d",
    videocollectionId:"668d91ba003b0fb28f81",
    userscollectionId:"668d91a10004e667bfd0",
    storageid:"668d938300156c98f872"
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('668d8fc300195fcd3894') // Your project ID
    .setPlatform('com.thomas.aora') // Your application ID or bundle ID.
;

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser({email,password,username}:Props){
    try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
        );
    
        if (!newAccount) throw Error;
    
        const avatarUrl = avatars.getInitials(username);
    
        await signIn(email, password);
    
        const newUser = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userscollectionId,
          ID.unique(),
          {
            accountId: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
          }
        );
    
        return newUser;
      } catch (error:any) {
        throw new Error(error);
      }
}

export async function signIn(email:string, password:string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error:any) {
      throw new Error(error);
    }
  }
export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error:any) {
      throw new Error(error);
    }
  }
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error:any) {
      throw new Error(error);
    }
  }

  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
 
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userscollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );

      if (!currentUser) throw Error;
 
      return currentUser.documents[0];
    } catch (error:any) {
      console.log(error);
      return null;
    }
  }

  export async function uploadFile(file:any, type:string) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageid,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error:any) {
      throw new Error(error);
    }
  }

  export async function getFilePreview(fileId:string, type:string) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(appwriteConfig.storageid, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          appwriteConfig.storageid,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error:any) {
      throw new Error(error);
    }
  }

  // Create Video Post
export async function createVideoPost(form:Props2) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videocollectionId,
      ID.unique(),
      {
        tittle: form.title,
        thumbmeil: thumbnailUrl,
        video: videoUrl,
        Prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videocollectionId
    );

    return posts.documents;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId:string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videocollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query:string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videocollectionId,
      [Query.search("tittle", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videocollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error:any) {
    throw new Error(error);
  }
}