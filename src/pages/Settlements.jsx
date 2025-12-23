import { useEffect, useState } from "react";
import api from "../services/api";

export default function Settlements() {
  const [settlements, setSettlements] = useState([]);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    group: "",
    to: "",
    amount: ""
  });

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
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Settle Up</h2>

      {/* ADD SETTLEMENT */}
      <div className="bg-card border border-gray-800 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4">Add Settlement</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Group */}
          <select
            className="bg-bg border border-gray-700 rounded-lg px-4 py-3"
            value={form.group}
            onChange={(e) => {
              setForm({ ...form, group: e.target.value });
              fetchMembers(e.target.value);
            }}
          >
            <option value="">Select Group</option>
            {groups.map(g => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>

          {/* To */}
          <select
            className="bg-bg border border-gray-700 rounded-lg px-4 py-3"
            value={form.to}
            onChange={e => setForm({ ...form, to: e.target.value })}
          >
            <option value="">Pay To</option>
            {members.map(m => (
              <option key={m._id} value={m._id}>{m.name}</option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            className="bg-bg border border-gray-700 rounded-lg px-4 py-3"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        <button
          onClick={submitSettlement}
          className="mt-4 bg-primary px-6 py-3 rounded-lg font-semibold hover:bg-purple-600"
        >
          Settle
        </button>
      </div>

      {/* SETTLEMENT HISTORY */}
      <h3 className="text-xl font-semibold mb-4">Your Settlements</h3>

      {settlements.length === 0 ? (
        <p className="text-muted">No settlements yet.</p>
      ) : (
        <div className="space-y-4">
          {settlements.map(s => (
            <div
              key={s._id}
              className="bg-card border border-gray-800 rounded-xl p-5"
            >
              <p className="font-semibold">
                ₹{s.amount} — {s.group?.name}
              </p>
              <p className="text-sm text-muted">
                {s.from.name} → {s.to.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
