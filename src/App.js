import React, { useState, useEffect } from "react";
import { db, auth, provider } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import "./App.css"; 

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      setExpenses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchExpenses();
  }, []);

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!amount || !category) return;
    const docRef = await addDoc(collection(db, "expenses"), {
      amount,
      category,
      timestamp: new Date()
    });
    setExpenses([...expenses, { id: docRef.id, amount, category }]);
    setAmount("");
    setCategory("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
      {!user ? (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Sign in with Google
        </button>
      ) : (
        <div className="mt-4">
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
            Sign Out
          </button>
        </div>
      )}

      {user && (
        <div className="mt-6 w-full max-w-md">
          <form onSubmit={addExpense} className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Add Expense
            </button>
          </form>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Expense List</h2>
            {expenses.map((expense) => (
              <p key={expense.id} className="mt-2">
                {expense.category}: £{expense.amount}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
