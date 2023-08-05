import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";

export const listMenus = () =>
  new Promise((resolve) => {
    const colRef = collection(firestore, "menus");
    getDocs(colRef).then((res) => {
      const menus = [];
      res.docs.forEach((doc) => {
        menus.push(doc.data());
      });
      resolve(menus);
    });
  });

export const searchMenus = (keyword) =>
  new Promise((resolve) => {
    const lowerKeyword = keyword.toLowerCase();
    const colRef = collection(firestore, "menus");
    const queryRef = query(colRef, where("nama", "<=", lowerKeyword));
    getDocs(queryRef).then((res) => {
      const menus = [];
      res.docs.forEach((doc) => {
        const data = doc.data();
        if (data.nama.toLowerCase().includes(lowerKeyword)) {
          menus.push(data);
        }
      });
      resolve(menus);
    });
  });

export const listMenuFav = () =>
  new Promise((resolve) => {
    const colRef = collection(firestore, "menus");
    const favRef = query(colRef, where("isFav", "==", true));
    getDocs(favRef).then((res) => {
      const menus = [];
      res.docs.forEach((doc) => {
        menus.push(doc.data());
      });
      resolve(menus);
    });
  });

export const getMenu = (mId) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    const docRef = doc(firestore, "menus", mId);
    const docSnap = await getDoc(docRef);

    resolve(docSnap.data());
  });

export const addCarts = async (cart) => {
  const colRef = collection(firestore, "carts");
  const res = await addDoc(colRef, cart);
  const docRef = doc(firestore, "carts", res.id);

  await updateDoc(docRef, { cId: res.id });
};

export const listCarts = () =>
  new Promise((resolve) => {
    const colRef = collection(firestore, "carts");
    getDocs(colRef).then((res) => {
      const carts = [];
      res.docs.forEach((doc) => {
        carts.push(doc.data());
      });
      resolve(carts);
    });
  });

export const deleteCart = (cId) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    const docRef = doc(firestore, "carts", cId);

    await deleteDoc(docRef);
    resolve("Todo deleted");
  });

export const deleteAllCart = () =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    const colRef = collection(firestore, "carts");
    const res = await getDocs(colRef);
    res.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    resolve("All Todo deleted");
  });

export const addOrders = async (order) => {
  const colRef = collection(firestore, "orders");
  const res = await addDoc(colRef, order);
  const docRef = doc(firestore, "orders", res.id);

  await updateDoc(docRef, { oId: res.id });
};
