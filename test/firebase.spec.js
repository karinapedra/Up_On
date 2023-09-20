
import { async } from 'regenerator-runtime';
import {
  createUserEmailAndPassword,
  loginEmailAndPassword,
  loginGoogle,
  checkIfUserIsLogged,
  addPost,
  getPosts,
  editPost,
  deletePost,
  getUserInfo,
  logOut,
  votePost
} from '../src/firebase/firebase.js';

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth, setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  }
  from 'firebase/auth';

  import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    getFirestore,
    updateDoc, 
    doc,
  }
  from 'firebase/firestore'

  import { db } from "../src/firebase/configFirebase.js"
jest.mock("firebase/auth");
jest.mock("firebase/firestore");


describe('run all the tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('createUserEmailAndPassword', () => {
    it('must return createUserWithEmailAndPassword correctly', async () => {
      createUserWithEmailAndPassword.mockResolvedValue();
      getAuth.mockReturnValue({ currentUser: 'user' });
      const email = 'test@email.com';
      const password = '123456';
      const nickname = 'testMock';
      const icon = 'littlePotato';

      await createUserEmailAndPassword(email, password, nickname, icon)
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({ currentUser: 'user' }, email, password)
    });

    it('should return a Error mensage', async () => {
      const errorMessage = 'This is an error message';
      createUserWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));
      const email = 'test@email.com';
      const password = '123456';
      const nickname = 'testMock';
      const icon = 'littlePotato';

      try {
        await createUserWithEmailAndPassword(email, password, nickname, icon);
        fail('Expected an error');
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('loginEmailAndPassword', () => {
    it('shuould call setPersistence and signInWithEmailAndPassword', async () => {
      setPersistence.mockResolvedValue();
      getAuth.mockReturnValue({ userCredential: 'user' });
      const email = 'test@email.com';
      const password = '123456';

      await loginEmailAndPassword(email, password);
      expect(setPersistence).toHaveBeenCalledWith({ userCredential: 'user' }, browserLocalPersistence);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({ userCredential: 'user' }, email, password);
    })
    it('should return a Error mensage', async () => {
      const errorMessage = 'This is an error message';
      setPersistence.mockRejectedValue(new Error(errorMessage));
      const email = 'test@email.com';
      const password = '123456';
      try {
        await setPersistence(email, password);
        fail('Expected an error');
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
  describe('loginGoogle', () => {
    it('shuould call signInWithPopup with correct parameters', async () => {
      const mockProvider = new GoogleAuthProvider();
      getAuth.mockReturnValue(1)
      signInWithPopup.mockResolvedValue();
      await loginGoogle();
      expect(signInWithPopup).toHaveBeenCalledWith(1, mockProvider);
    })
    it('should return a success case', async () => {
      const result = { user: { uid: '123' } };
      signInWithPopup.mockResolvedValue(result);

      await loginGoogle();
      expect(GoogleAuthProvider.credentialFromResult).toHaveBeenCalledWith(result);
    });
    it('should return an error massage', async () => {
      const error = { code: 'auth/error-code', massage: 'Error massage', customData: { email: 'test@email.com' } };
      signInWithPopup.mockRejectedValue(error);
      await loginGoogle();
      expect(GoogleAuthProvider.credentialFromError).toHaveBeenCalledWith(error);
    })
  });

  describe('checkIfUserIsLogged', () => {
    it('should redirect to time line if user is logged in', () => {
      const user = { uid: '123' };
      const errorMessage = 'This is an error message';
      onAuthStateChanged.mockImplementation((auth, callback) => callback(user));

      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
      });
      try {
      checkIfUserIsLogged();
      expect(window.location.href).toBe('#timeline');
      throw new Error(errorMessage);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
    });
    it('should redirect to login if user is not logged in', () =>{
      onAuthStateChanged.mockImplementation((auth, callback) => callback(null));

      Object.defineProperty(window, 'location', {
        value: { href: ''},
        writable: true,
      });
      checkIfUserIsLogged()
      expect(window.location.href).toBe('#login');
    });
  });

  describe('addPost', () => {
    it('shuould call addDoc with the correct arguments', async () => {
      const content = 'This is an test post';
      const nickname =  'testNickname';
      const photoURL = 'testPhoto';
      const userUID = 'user123';

      addDoc.mockResolvedValue()
      collection.mockReturnValue(1);
      serverTimestamp.mockReturnValue('timestamp');

      await addPost(content, nickname, photoURL, userUID);
      expect(collection).toHaveBeenCalledWith(db, 'Posts');
      expect(addDoc).toHaveBeenCalledWith(1, {
        content: content,
        nickname: nickname,
        data: 'timestamp',
        photoURL: photoURL,
        userUID: userUID,
        votes: [],
      });
    })
    it('should return error from addDoc', async () => {
      const errorMessage = 'Error adding document';
      addDoc.mockRejectedValue(new Error(errorMessage));
      const content = 'This is an test post';
      const nickname =  'testNickname';
      const photoURL = 'testPhoto';
      const user = 'user123';
      try {
        await addPost(content, nickname, photoURL, user);
        fail('Expected an error');
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
  
  describe('getPosts', () => {
    it('shuould call createAllPosts with data from Firebase', async () => {
      const createAllPosts = jest.fn();
      const mockQuery =  {};
        const mockCollection = { docs: 
        [{ id: '1', data: () => ({data: 'Post1' }) },
         { id: '2', data: () => ({data: 'Post2' }) }] 
        
        };

      const db = getFirestore();
      collection.mockReturnValue(mockCollection);
      query.mockReturnValue(mockQuery);
      orderBy.mockReturnValue('data');
      onSnapshot.mockImplementation((query, callback) => callback(mockCollection));

      getPosts(createAllPosts);

      expect(collection).toHaveBeenCalledWith(db, 'Posts');
      expect(query).toHaveBeenCalledWith(mockCollection, expect.anything());
      expect(orderBy).toHaveBeenCalledWith('data', 'desc');
      expect(onSnapshot).toHaveBeenCalledWith(mockQuery, expect.any(Function));

      expect(createAllPosts).toHaveBeenCalledTimes(2);
      expect(createAllPosts).toHaveBeenCalledWith(expect.objectContaining({ data: 'Post1', docRef: '1' }));
      expect(createAllPosts).toHaveBeenCalledWith(expect.objectContaining({ data: 'Post2', docRef: '2' }));
    });
    it('should return error from onSnaphot', () => {
      const createAllPosts = jest.fn();
      const mockError = new Error('Error getting documents');
      onSnapshot.mockImplementation(() => {
        throw mockError;
      });
         try {
       getPosts(createAllPosts);
        fail('Expected an error');
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });
  describe ('editPost', () => {
    it('should call updateDoc whith the correct arguments', async () => {
      const docRef = 'post123';
      const newContent = 'update content';

      await editPost(docRef, newContent);

      expect(updateDoc).toHaveBeenCalledWith(doc(db, 'Posts', docRef), {
        content: newContent,
      });
    });
  });
  describe('deletePost', () => {
    it('is a function', () => {
      expect(typeof deletePost).toBe('function');
    });
  });
  describe('getUserInfo', () => {
    it('is a function', () => {
      expect(typeof getUserInfo).toBe('function');
    });
  });
  describe('logOut', () => {
    it('is a function', () => {
      expect(typeof logOut).toBe('function');
    });
  });
  describe('votePost', () => {
    it('is a function', () => {
      expect(typeof votePost).toBe('function');
    });
  });
});
