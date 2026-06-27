import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, CheckCircle2, XCircle, ArrowRight, AlertTriangle, Trash2 } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";

const MOCK_RECORDS = [
  { id: 1, full_name: "Adaeze Okonkwo", account_number: "2034567891", card_type: "Visa Debit", branch: "Lekki", phone: "+234 803 111 2233", valid: true },
  { id: 2, full_name: "Bello Haruna", account_number: "3045678902", card_type: "Mastercard Debit", branch: "Abuja Central", phone: "+234 812 222 3344", valid: true },
  { id: 3, full_name: "Cynthia Osei", account_number: "", card_type: "Verve", branch: "Marina", phone: "+234 704 333 4455", valid: false, error: "Missing account number" },
  { id: 4, full_name: "David Nwosu", account_number: "5067890124", card_type: "Visa Credit", branch: "Surulere", phone: "+234 815 444 5566", valid: true },
  { id: 5, full_name: "Esther Taiwo", account_number: "6078901235", card_type: "Mastercard Credit", branch: "Ikeja", phone: "", valid: false, error: "Missing phone number" },
  { id: 6, full_name: "Felix Adekunle", account_number: "7089012346", card_type: "Visa Debit", branch: "Victoria Island", phone: "+234 806 666 7788", valid: true },
];

export default function EmbossFileUpload() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [records, setRecords] = useState([]);
  const [moved, setMoved] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setTimeout(() => {
      setRecords(MOCK_RECORDS);
      setUploaded(true);
    }, 800);
  };

  const validRecords = records.filter(r => r.valid);
  const invalidRecords = records.filter(r => !r.valid);

  const handleMoveToPending = () => {
    setMoved(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Emboss File Upload</h2>
          <p className="text-gray-500 text-sm mt-1">Import a CSV or Excel file to batch-create card requests</p>
        </div>

        {/* Upload zone */}
        {!uploaded ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <Upload className="w-12 h-12 text-blue-400 mb-3" />
            <p className="font-semibold text-gray-700 text-base">Tap to upload CSV or Excel file</p>
            <p className="text-xs text-gray-400 mt-1">Supported: .csv, .xlsx, .xls</p>
            <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileChange} />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* File info */}
            <div className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-gray-100">
              <FileSpreadsheet className="w-8 h-8 text-green-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{fileName}</p>
                <p className="text-xs text-gray-400">{records.length} records found</p>
              </div>
              <button onClick={() => { setUploaded(false); setRecords([]); setMoved(false); }} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Summary badges */}
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> {validRecords.length} Valid
              </span>
              <span className="flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <XCircle className="w-3.5 h-3.5" /> {invalidRecords.length} Invalid
              </span>
            </div>

            {/* Records table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-500">#</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-500">Name</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-500">Account</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-500">Card Type</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {records.map((r, i) => (
                      <tr key={r.id} className={r.valid ? "" : "bg-red-50/40"}>
                        <td className="px-3 py-2.5 text-gray-400">{i + 1}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-900">{r.full_name}</td>
                        <td className="px-3 py-2.5 font-mono text-gray-600">{r.account_number || <span className="text-red-400 italic">missing</span>}</td>
                        <td className="px-3 py-2.5 text-gray-600">{r.card_type}</td>
                        <td className="px-3 py-2.5">
                          {r.valid ? (
                            <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 className="w-3 h-3" /> Valid</span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-500 font-medium" title={r.error}><XCircle className="w-3 h-3" /> {r.error}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {moved ? (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm text-green-700 font-medium">{validRecords.length} records moved to Pending Card Requests successfully.</p>
              </div>
            ) : (
              <KioskButton
                onClick={handleMoveToPending}
                disabled={validRecords.length === 0}
                className="w-full"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Move {validRecords.length} Valid Records to Pending
              </KioskButton>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}