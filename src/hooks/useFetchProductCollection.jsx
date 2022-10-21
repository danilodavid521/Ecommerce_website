import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//Firebase
import { doc, collection, query, orderBy, onSnapshot, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";

const useFetchProductCollection = (collectionName) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	function fetchProductCollection() {
		setIsLoading(true);
		try {
			const docRef = collection(db, collectionName);
			const q = query(docRef, orderBy("createdAt", "desc"));
			onSnapshot(q, (querySnapshot) => {
				const allData = [];
				querySnapshot.forEach((doc) => {
					allData.push({ id: doc.id, ...doc.data() });
				});
				setData(allData);
				setIsLoading(false);
			});
		} catch (error) {
			toast.error(error.code, error.message);
			setIsLoading(false);
		}
	}
	useEffect(() => {
		fetchProductCollection();
	}, []);
	return { data, isLoading };
};

export default useFetchProductCollection;
