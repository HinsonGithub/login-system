// 配置Firebase

const firebaseConfig = {

  apiKey: "your_api_key",

  authDomain: "your_auth_domain",

  projectId: "your_project_id",

  storageBucket: "your_storage_bucket",

  messagingSenderId: "your_messaging_sender_id",

  appId: "your_app_id",

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
