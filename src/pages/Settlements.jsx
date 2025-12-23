import { useEffect, useState } from "react";
import api from "../services/api";
import { Trash2, DollarSign, ArrowRight, Users } from "lucide-react";
import { toast } from "react-toastify";

export default function Settlements() {
  const [settlements, setSettlements] = useState([]);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    group: "",
    to: "",
    amount: ""
  });

  const handleDeleteSettlement = (e, settlementId) => {
    e.stopPropagation();

    toast.warn(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-semibold">
            Delete this settlement?
          </p>
          <p className="text-sm">
            This will remove the settlement and update balances.
          </p>

          <div className="flex gap-3 mt-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={async () => {
                try {
                  await api.delete(`/settlements/${settlementId}`);
                  setSettlements(prev =>
                    prev.filter(s => s._id !== settlementId)
                  );
                  toast.success("Settlement deleted successfully");
                } catch (err) {
                  toast.error(
                    err.response?.data?.msg || "Failed to delete settlement"
                  );
                } finally {
                  closeToast();
                }
              }}
            >
              Delete
            </button>

            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  useEffect(() => {
    fetchSettlements();
    fetchGroups();
  }, []);

  const fetchSettlements = async () => {
    const res = await api.get("/settlements/my-settlements");
    console.log(res.data);
    setSettlements(res.data);
  };

  const fetchGroups = async () => {
    const res = await api.get("/groups/my-groups");
    setGroups(res.data);
  };

  const fetchMembers = async (groupId) => {
    const res = await api.get(`/groups/${groupId}/members`);
    setMembers(res.data.members);
  };

  const submitSettlement = async () => {
    await api.post("/settlements", {
      group: form.group,
      to: form.to,
      amount: Number(form.amount)
    });

    setForm({ group: "", to: "", amount: "" });
    fetchSettlements();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Settle Up
          </h2>
          <p className="text-slate-400">Manage and track your payment settlements</p>
        </div>

        {/* ADD SETTLEMENT CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="text-emerald-400" size={20} />
            </div>
            <h3 className="text-2xl font-semibold text-slate-100">Add Settlement</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Group Select */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Users className="text-slate-500" size={18} />
              </div>
              <select
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none cursor-pointer"
                value={form.group}
                onChange={(e) => {
                  setForm({ ...form, group: e.target.value });
                  fetchMembers(e.target.value);
                }}
              >
                <option value="" className="bg-slate-800">Select Group</option>
                {groups.map(g => (
                  <option key={g._id} value={g._id} className="bg-slate-800">{g.name}</option>
                ))}
              </select>
            </div>

            {/* Pay To Select */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ArrowRight className="text-slate-500" size={18} />
              </div>
              <select
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none cursor-pointer"
                value={form.to}
                onChange={e => setForm({ ...form, to: e.target.value })}
              >
                <option value="" className="bg-slate-800">Pay To</option>
                {members.map(m => (
                  <option key={m._id} value={m._id} className="bg-slate-800">{m.name}</option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 font-semibold">
                ₹
              </div>
              <input
                type="number"
                placeholder="Amount"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={submitSettlement}
            className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200"
          >
            Settle Payment
          </button>
        </div>

        {/* SETTLEMENT HISTORY */}
        <div>
          <h3 className="text-2xl font-semibold text-slate-100 mb-6">Settlement History</h3>

          {settlements.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-slate-600" size={28} />
              </div>
              <p className="text-slate-400 text-lg">No settlements yet.</p>
              <p className="text-slate-500 text-sm mt-2">Your settlement history will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {settlements.map(s => (
                <div
                  key={s._id}
                  className="relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 group transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  {/* DELETE BUTTON */}
                  <button
                    onClick={(e) => handleDeleteSettlement(e, s._id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center gap-4">
                    {/* Amount Badge */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
                      <p className="text-emerald-400 font-bold text-lg">
                        ₹{s.amount}
                      </p>
                    </div>

                    {/* Transaction Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-300 font-semibold">{s.from.name}</span>
                        <ArrowRight className="text-slate-600" size={16} />
                        <span className="text-slate-300 font-semibold">{s.to.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Users size={14} />
                        <span>{s.group?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}