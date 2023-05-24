// import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import rootReducer from './rootReducer';
// // import { authReducer } from './auth/authSlice';
// // import { dateReducer } from './date/dateSlice';
// // import { tasksReducer } from './tasks/tasksSlice';

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   //   whitelist: ['token'],
// };
// // const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedReducer = persistReducer(persistConfig);

// const store = configureStore({
//   reducer: {
//     //  auth: persistedReducer,
//     //  date: dateReducer,
//     //  tasks: tasksReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// const persistor = persistStore(store);

// export default { store, persistor };
