import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import { ArrowLeft, Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
export default function GroupBalancePage() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [balances, setBalances] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetchBalances();
    fetchMembers();
  }, []);

  const fetchBalances = async () => {
    const res = await api.get(`/expenses/group/${groupId}/balance`);
    setBalances(res.data.balances);
  };

  const fetchMembers = async () => {
    const res = await api.get(`/groups/${groupId}/members`);
    const map = {};
    res.data.members.forEach(m => {
      map[m._id] = m.name || m.email;
    });
    setUsers(map);
  };

  const totalOwed = Object.values(balances).reduce((sum, owes) => 
    sum + Object.values(owes).reduce((s, amt) => s + amt, 0), 0
  );

  return (
    <div className="min-h-screen bg-slate-950 from-gray-900 via-slate-900 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Group</span>
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Group Balances
            </h1>
          </div>
          
          {Object.keys(balances).length > 0 && (
            <div className="flex items-center gap-2 mt-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl px-4 py-3 w-fit">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">
                Total pending: <span className="text-purple-400 font-bold">₹{totalOwed.toFixed(2)}</span>
              </span>
            </div>
          )}
        </div>

        {/* Balances Content */}
        {Object.keys(balances).length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-white">All Settled Up!</h3>
            <p className="text-gray-400">No outstanding balances in this group 🎉</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(balances).map(([from, owes], index) => (
              <div
                key={from}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-slate-800/70 hover:to-slate-900/70 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-lg font-bold shadow-lg shadow-orange-500/30">
                    {users[from]?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-white">
                      {users[from] || 'Unknown User'}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      owes the following
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pl-0 md:pl-4">
                  {Object.entries(owes).map(([to, amount], idx) => (
                    <div
                      key={to}
                      className="relative overflow-hidden group/item flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex items-center gap-3">
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover/item:translate-x-1 transition-transform duration-300" />
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-sm font-bold shadow-md shadow-green-500/20">
                          {users[to]?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <span className="text-gray-300 font-medium group-hover/item:text-white transition-colors">
                          {users[to] || 'Unknown User'}
                        </span>
                      </div>
                      
                      <div className="relative text-right">
                        <p className="text-xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text">
                          ₹{amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {Object.keys(balances).length > 0 && (
          <div className="mt-8 p-5 bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-300 text-center">
                <span className="font-semibold text-purple-400">{Object.keys(balances).length}</span>{' '}
                {Object.keys(balances).length === 1 ? 'person' : 'people'} with outstanding balances
              </p>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}