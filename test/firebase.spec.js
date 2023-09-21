import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth, setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import {
  createUserEmailAndPassword,
  loginEmailAndPassword,
  loginGoogle,
  checkIfUserIsLogged,
  addPost,
  getPosts,
  editPost,
  deletePost,
  db,
  recoverPassword,
  logOut,
  votePost,
} from '../src/firebase/firebase.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('createUserEmailAndPassword', () => {
  it('must return createUserWithEmailAndPassword correctly', async () => {
    createUserWithEmailAndPassword.mockResolvedValue();
    getAuth.mockReturnValue({ currentUser: 'user' });
    const email = 'test@email.com';
    const password = '123456';
    const nickname = 'testMock';
    const icon = 'littlePotato';

    await createUserEmailAndPassword(email, password, nickname, icon);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({ currentUser: 'user' }, email, password);
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
  });
  it('should return a Error mensage', async () => {
    const errorMessage = 'This is an error message';
    setPersistence.mockRejectedValue(new Error(errorMessage));
    const email = 'test@email.com';
    const password = '123456';
    try {
      await setPersistence(email, password);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
describe('recoverPassword', () => {
  it('should call sendPasswordResetEmail with correct arguments', () => {
    getAuth.mockReturnValue({ currentUser: 'user' });
    const email = 'test@email.com';

    recoverPassword(email);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith({ currentUser: 'user' }, email);
  });
});
describe('loginGoogle', () => {
  it('shuould call signInWithPopup with correct parameters', async () => {
    const mockProvider = new GoogleAuthProvider();
    getAuth.mockReturnValue(1);
    signInWithPopup.mockResolvedValue();
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledWith(1, mockProvider);
  });
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
  it('should redirect to login if user is not logged in', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => callback(null));

    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
    checkIfUserIsLogged();
    expect(window.location.href).toBe('#login');
  });
});
describe('logOut', () => {
  it('should call signOut with correct arguments', () => {
    getAuth.mockReturnValue({ currentUser: 'user' });

    logOut({ currentUser: 'user' });
    expect(signOut).toHaveBeenCalledWith({ currentUser: 'user' });
  });
});
describe('addPost', () => {
  it('shuould call addDoc with the correct arguments', async () => {
    const postContent = 'This is an test post';
    const userNickname = 'testNickname';
    const userPhotoURL = 'testPhoto';
    const useruid = 'user123';

    addDoc.mockResolvedValue();
    collection.mockReturnValue(1);
    serverTimestamp.mockReturnValue('timestamp');

    await addPost(postContent, userNickname, userPhotoURL, useruid);
    expect(collection).toHaveBeenCalledWith(db, 'Posts');
    expect(addDoc).toHaveBeenCalledWith(1, {
      content: postContent,
      nickname: userNickname,
      data: 'timestamp',
      photoURL: userPhotoURL,
      userUID: useruid,
      votes: [],
    });
  });
  it('should return error from addDoc', async () => {
    const errorMessage = 'Error adding document';
    addDoc.mockRejectedValue(new Error(errorMessage));
    const content = 'This is an test post';
    const nickname = 'testNickname';
    const photoURL = 'testPhoto';
    const user = 'user123';
    try {
      await addPost(content, nickname, photoURL, user);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});

describe('getPosts', () => {
  it('shuould call onSnapshot from Firebase', async () => {
    const createPosts = jest.fn();
    const mockCollection = {
      docs:
      [{ id: '1', data: () => ({ data: 'Post1' }) },
        { id: '2', data: () => ({ data: 'Post2' }) }],
    };

    collection.mockReturnValue(mockCollection);
    orderBy.mockReturnValue('data');
    onSnapshot.mockResolvedValue(mockCollection);

    getPosts(createPosts);

    expect(collection).toHaveBeenCalledWith(db, 'Posts');
    expect(query).toHaveBeenCalledWith(mockCollection, expect.anything());
    expect(orderBy).toHaveBeenCalledWith('data', 'desc');
    expect(onSnapshot).toHaveBeenCalledTimes(1);
  });
  it('should return error from onSnaphot', () => {
    const createPosts = jest.fn();
    const mockError = new Error('Error getting documents');
    onSnapshot.mockImplementation(() => {
      throw mockError;
    });
    try {
      getPosts(createPosts);
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });
});
describe('editPost', () => {
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
  it('should call deleteDoc whith the correct arguments', async () => {
    const docRef = 'dsjadjasdhd';
    await deletePost(docRef);
    expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'Posts', docRef));
  });
});

describe('votePost', () => {
  const mockDocID = 'mockDocID';
  const mockUserUID = 'mockUserUID';
  const mockVotes = [mockUserUID];
  const mockData = { votes: mockVotes };
  beforeEach(() => {
    doc.mockReturnValue('docPath');
    getDoc.mockResolvedValue({
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue(mockData),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should remove userUID from votes if it already exists', async () => {
    await votePost(mockDocID, mockUserUID);
    expect(updateDoc).toHaveBeenCalledWith('docPath', {
      votes: arrayRemove(mockUserUID),
    });
  });
  it('should add userUID to votes if it does not exist', async () => {
    mockData.votes = [];
    await votePost(mockDocID, mockUserUID);
    expect(updateDoc).toHaveBeenCalledWith('docPath', {
      votes: arrayUnion(mockUserUID),
    });
  });
});
