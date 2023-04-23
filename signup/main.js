// 配置Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBIhGCLOGOy74X9qpzIogToFhYqYJ-wnnc",

  authDomain: "auth-548b8.firebaseapp.com",

  projectId: "auth-548b8",

  storageBucket: "auth-548b8.appspot.com",

  messagingSenderId: "424765931773",

  appId: "1:424765931773:web:4a7694bb7bb1e57d0fbe94",

  measurementId: "G-MQTH77MNTG"

};

// 初始化Firebase

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

// 問卷註冊功能

const registrationForm = document.getElementById('registration-form');

if (registrationForm) {

  registrationForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    try {

      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      await db.collection('members').doc(userCredential.user.uid).set({ email });

      alert('註冊成功');

      registrationForm.reset();

    } catch (error) {

      console.error('註冊失敗:', error);

      alert('註冊失敗');

    }

  });

}

// 管理員後台功能

const signOutButton = document.getElementById('sign-out');

const membersList = document.getElementById('members-list');

if (signOutButton && membersList) {

  signOutButton.addEventListener('click', () => {

    auth.signOut();

  });

  auth.onAuthStateChanged(async (user) => {

    if (user) {

      constmembersQuerySnapshot = await db.collection('members').get();

      membersList.innerHTML = '';

      membersQuerySnapshot.forEach((doc) => {

        const listItem = document.createElement('li');

        listItem.textContent = doc.data().email;

        membersList.appendChild(listItem);

      });

    } else {

      window.location.replace('index.html');

    }

  });

}

// 管理員登入功能

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
