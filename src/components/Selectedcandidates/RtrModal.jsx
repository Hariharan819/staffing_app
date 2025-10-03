import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown"
export default function RtrModal({ isOpen, onClose, candidate }) {
  const [client, setClient] = useState("");
  const [rate, setRate] = useState("");
  const [payType, setPayType] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your RTR API here
    console.log("Send RTR", { candidate, client, rate, payType });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <section
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-lg bg-white shadow-xl rounded-xl flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-purple-800">Send RTR</h2>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center cursor-pointer justify-center rounded-md text-slate-900 hover:bg-slate-100 hover:text-slate-900"
            >
              ✕
            </button>
          </header>

          {/* Form */}
          <form className="flex-1 overflow-y-auto p-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Candidate name */}
              <div>
                <label className="block text-sm font-medium text-indigo-700">
                  Candidate name
                </label>
                <input
                  type="text"
                  required
                  value={candidate?.candidate_name || ""}
                  disabled
                  className="mt-2 block w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm placeholder-slate-400 shadow-sm outline-none"
                />
              </div>

              {/* Client name */}
              <div>
                <label className="block text-sm font-medium text-indigo-700">
                  Client name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter client organization"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Rate and Pay type */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-indigo-700">
                    Rate
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="e.g., 65"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-indigo-700">
                    Pay type
                  </label>
                  <select
                    required
                    value={payType}
                    onChange={(e) => setPayType(e.target.value)}
                    className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select pay type</option>
                    <option>Per hour</option>
                    <option>Per day</option>
                    <option>Per week</option>
                    <option>Per month</option>
                    <option>Per annum</option>
                  </select>
                </div> */}
                <CustomDropdown
  label="Pay type"
  options={["Per hour", "Per day",  "Per month", "Per annual"]}
  value={payType}
  onChange={setPayType}
/>
              </div>
            </div>

            {/* Footer */}
            <footer className="sticky bottom-0 border-t mt-3 border-slate-200 bg-white p-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center cursor-pointer justify-center mx-auto rounded-md bg-purple-600 px-5 py-3 text-sm font-medium text-white shadow-sm "
              >
                Send RTR
              </button>
            </footer>
          </form>
        </div>
      </section>
    </>
  );
}
