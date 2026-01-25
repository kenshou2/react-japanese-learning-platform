import { type User } from '../../types/User';

/* 
MOCK DATA — FOR FRONT-END DISPLAY ONLY. 
All information below is fabricated and does not represent real users or transactions. 
*/

let userId = 1;
let sessionId = 1;

let users: User[] = populateUsers();

export type UserRegistration = Omit<User, 'id' | 'account' | 'profile'> & {
    account: Pick<User['account'], 'username' | 'password' | 'email'>;
    profile: Pick<User['profile'], 'displayName'>;
}
export type AccountUpdate = Partial<User['account']>;
export type ProfileUpdate = Partial<User['profile']>;
export type ProgressUpdate = Partial<User['progress']>;

export const usersDb = {
    getById: (id: number) => {
        const user = users.find(u => u.id === id);
        if (!user) throw new Error(`User with id ${id} not found`);        
        return user;
    },
    create: (user: UserRegistration) => {
        const newUser: User = {
            id: userId++,
            account: {
                username: user.account.username,
                password: user.account.password,
                email: user.account.email,
                phoneNumber: null,
                subscriptionId: null,
                paymentMethods: [],
                billingHistory: [],
                twoFactorOn: {
                    enabled: false,
                    dateChanged: null,
                },
                activeSessions: [
                    {
                        id: sessionId++,
                        device: "IPhone 14",
                        deviceType: "mobile",
                        country: "USA",
                        city: "Washington",
                        firstSignedIn: new Date(),
                        lastActive: new Date("2025-09-25"),
                    }
                ],
            },
            profile: {
                displayName: user.profile.displayName,
                userPfpUrl: "",
                languageProficiency: null,
                achievements: null,
                about: null,
                learningGoals: [],
                statistics: null,
                visibility: 'public',
                customConfig: {
                    usernameVisible: {label: "Username", state: false},
                    displayNameVisible: {label: "Display name", state: false},
                    pfpVisible: {label: "Profile picture", state: false},
                    aboutVisible: {label: "About", state: false},
                    learningGoalsVisible: {label: "Learning goals", state: false},
                    statisticsVisible: {label: "Stastics", state: false},
                    achievementsVisible: {label: "Achievements", state: false},
                }
            },
            progress: {
              currentXp: 400,
              nextLanguageLevelXp: 1200,
              courseProgress: [],
            }
        };

        users.push(newUser);        
        return newUser;
    },
    updateAccount: (id: number, updates: AccountUpdate) => {
        const toUpdateIndex = users.findIndex(u => u.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`User with id ${id} not found`);
        users[toUpdateIndex] = {...users[toUpdateIndex], account: {...users[toUpdateIndex].account, ...updates}};        
        return users[toUpdateIndex];
    },
    updateProfile: (id: number, updates: ProfileUpdate) => {
        const toUpdateIndex = users.findIndex(u => u.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`User with id ${id} not found`);
        users[toUpdateIndex] = {...users[toUpdateIndex], profile: {...users[toUpdateIndex].profile, ...updates}};             
        return users[toUpdateIndex];
    },
    updateProgress: (id: number, updates: Partial<ProgressUpdate>) => {      
      const toUpdateIndex = users.findIndex(u => u.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`User with id ${id} not found`);
        if (users[toUpdateIndex].progress) {
          users[toUpdateIndex] = {...users[toUpdateIndex], progress: {...users[toUpdateIndex].progress, ...updates}};          
        }        
        return users[toUpdateIndex];
    },
    getProgress: (id: number) => {
      const user = users.find(u => u.id === id);
        if (!user) throw new Error(`User with id ${id} not found`);
      return user.progress;
    },
    delete: (id: number) => {
        const lengthBefore = users.length;
        users = users.filter(u => u.id !== id);        
        if (lengthBefore !== users.length)
            return true;
        else
            throw new Error(`User with id ${id} not found`);        
    },
}

function populateUsers(): User[] {return [
  {
    id: userId++,
    account: {
      username: "wordsmith88",
      password: "hashed_pw_123",
      email: "wordsmith88@example.com",
      phoneNumber: "+1234567890",
      subscriptionId: 1,
      paymentMethods: [
          { id: 1, cardNumber: "**** **** **** 0123", provider: "visa", isDefault: true, cardColor: "#0B124A" },
          { id: 2, cardNumber: "**** **** **** 1234", provider: "mastercard", isDefault: false, cardColor: "#07332E" },
          { id: 3, cardNumber: "**** **** **** 5678", provider: "visa", isDefault: false, cardColor: "#340809" },
          { id: 4, cardNumber: "**** **** **** 1234", provider: "mastercard", isDefault: false, cardColor: "#071f33ff" },
      ],
      billingHistory: [
            {
              date: new Date("2025-10-01"),              
              subscriptionId: 1,
              invoice: {
                  id: "INV-1001",
                  url: "/invoices/INV-1001.pdf",
                  amount: 10,
                  currency: "USD",
                  issuedDate: new Date("2025-10-01"),
                  dueDate: new Date("2025-10-05")
              }
            },
            {
              date: new Date("2025-10-05"),              
              subscriptionId: 2,
              invoice: {
                  id: "INV-1001",
                  url: "/invoices/INV-1001.pdf",
                  amount: 10,
                  currency: "USD",
                  issuedDate: new Date("2025-10-01"),
                  dueDate: new Date("2025-10-05")
              }
            },
            {
              date: new Date("2025-09-01"),              
              subscriptionId: 3,
              invoice: {
                  id: "INV-1001",
                  url: "/invoices/INV-1001.pdf",
                  amount: 10,
                  currency: "USD",
                  issuedDate: new Date("2025-10-01"),
                  dueDate: new Date("2025-10-05")
              }
            },
        ],
      twoFactorOn: {
        enabled: true,
        dateChanged: new Date("2024-10-12"),
      },
      activeSessions: [
        {
          id: 1,
          device: "PC, Windows",
          deviceType: 'desktop',
          country: "USA",
          city: "Washington",
          firstSignedIn: new Date("2025-09-01"),
          lastActive: new Date("2025-09-25"),
        },
        {
          id: 2,
          device: "IPhone 14",
          deviceType: 'mobile',
          country: "USA",
          city: "Washington",
          firstSignedIn: new Date("2025-09-23"),
          lastActive: new Date("2025-09-25"),
        },
        {
          id: 3,
          device: "IPad Pro",
          deviceType: 'tablet',
          country: "USA",
          city: "Washington",
          firstSignedIn: new Date("2025-09-14"),
          lastActive: new Date("2025-09-25"),
        },
      ],
    },
    profile: {
      displayName: "John T.",
      userPfpUrl: "/storage/users/userAvatars/0.png",
      languageProficiency: "B1",
      achievements: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}],      
      about: "Passionate about learning and exploring new languages, I enjoy discovering different cultures and connecting with people through conversation. Always curious and eager to improve, I combine study with real-life practice to make learning meaningful and enjoyable.",
      learningGoals: [
        { id: 1, description: "Improve listening comprehension", completion: 80 },
        { id: 2, description: "Improve reading comprehension", completion: 20 },
        { id: 3, description: "Improve speaking proficiency", completion: 30 },
      ],
      statistics: {
        coursesPassed: {label: "Courses passed", value: 3},
        wordsLearned: {label: "Words learned", value: 85},
        studyStreak: {label: "Study streak", value: 1},
        averageWordRetention: {label: "Average word Retention", value: 78}
      },
      visibility: "private",
      customConfig: {
        usernameVisible: {label: "Username", state: false},
        displayNameVisible: {label: "Display name", state: false},
        pfpVisible: {label: "Profile picture", state: false},
        aboutVisible: {label: "About", state: false},
        learningGoalsVisible: {label: "Learning goals", state: false},
        statisticsVisible: {label: "Stastics", state: false},
        achievementsVisible: {label: "Achievements", state: false},
      }
    },
    progress: {
      currentXp: 800,
      nextLanguageLevelXp: 1200,
      courseProgress: [
        {
          courseId: 0,
          checkpoint: {
            moduleId: 0,
            lessonId: 0,
          },
          currentHours: 22,
          currentProgress: 50,
        }
      ],
    }
  },
]};