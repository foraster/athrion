import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { useEffect } from 'react';
import { fetchOrderByUserId } from '../http/orderAPI';
import { useState } from 'react';
import { formatDate, formatOrderId, fromCents } from '../utils/helpers';
import {statusMap} from '../utils/consts'; 
import { fetchName } from '../http/userAPI';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await fetchOrderByUserId(user.user.id);
      setOrders(data);
    } catch (error) {
      console.error("Fehler beim Laden der Bestellungen:", error);
    }
  };

  if (user.isAuth && user.user.id) {
    fetchData();
  }
  }, [user.user.id])

  

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 md:px-12">
  <div className="max-w-5xl mx-auto space-y-8">
    
    {/* Welcome */}
    <header className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight">
        Willkommen zurück, {user.firstName}
      </h1>
      <p className="text-gray-400 text-md">Du verwaltest gerade dein persönliches Athrion-Konto.</p>
    </header>

    {/* Account Overview */}
    <section className="grid md:grid-cols-2 gap-6">
      <div className="bg-[#161616] rounded-2xl p-6 border border-neutral-800 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Persönliche Daten</h2>
        <div className="space-y-3 text-md">
          <p><span className="text-gray-400">Name:</span> {user.firstName} {user.lastName}</p>
          <p><span className="text-gray-400">E-Mail:</span> {user.email}</p>
          <p><span className="text-gray-400">Password: </span>●●●●●●●●●●</p>
        </div>
        
      </div>

      <div className="bg-[#161616] rounded-2xl p-6 border border-neutral-800 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Kontoaktionen</h2>
        <div className="flex flex-col gap-3 text-sm">
          <div className='flex mt-4'>
            <button
              className="mr-2 w-full py-2 border border-white rounded hover:bg-white hover:text-black transition text-sm"
              onClick={() => navigate('/change-password')}
            >
              Passwort ändern
            </button>
            <button
              className="mx-2 w-full py-2 border border-white rounded hover:bg-white hover:text-black transition text-sm"
              onClick={() => navigate('/change-password')}
            >
              Name ändern
            </button>
            <button
              className="ml-2 w-full py-2 border border-white rounded hover:bg-white hover:text-black transition text-sm"
              onClick={() => navigate('/change-password')}
            >
              Email ändern
            </button>
          </div>
          <button
            onClick={() => {
              user.reset();
              navigate('/');
            }}
            className="py-2 border border-yellow-600 text-yellow-400 rounded hover:bg-yellow-600 hover:text-white transition"
          >
            Ausloggen
          </button>
          <button
            className="py-2 border border-red-600 text-red-400 rounded hover:bg-red-600 hover:text-white transition"
          >
            Konto löschen
          </button>
        </div>
      </div>
    </section>

    {/* Orders */}
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Letzte Bestellungen</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-md">Du hast noch keine Bestellungen aufgegeben.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1a1a1a] p-4 rounded-xl border border-neutral-700 flex justify-between items-center cursor-pointer hover:bg-[#222]"
              onClick={() => navigate(`/order/${order.id}`)}             
            >
              <div>
                <p className="font-semibold">Bestellung {formatOrderId(order.id)}</p>
                <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-gray-300">{statusMap[order.status]}</p>
                <p className="text-white font-bold">{fromCents(order.total_price_cents)} €</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </section>
  </div>
</div>
  );
};

export default Profile;