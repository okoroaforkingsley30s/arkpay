import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { KioskProvider } from "@/contexts/KioskContext";

import PageNotFound from "./lib/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";

import Welcome from "@/pages/Welcome";
import ServiceSelection from "@/pages/ServiceSelection";
import CustomerDetails from "@/pages/CustomerDetails";
import IdVerification from "@/pages/IdVerification";
import FingerprintCapture from "@/pages/FingerprintCapture";
import SignatureCapture from "@/pages/SignatureCapture";
import CardPersonalization from "@/pages/CardPersonalization";
import CardPreview from "@/pages/CardPreview";
import FinalCardPreview from "@/pages/FinalCardPreview";
import Processing from "@/pages/Processing";
import CollectCard from "@/pages/CollectCard";
import Receipt from "@/pages/Receipt";

import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import EmbossFileUpload from "@/pages/EmbossFileUpload";
import CardRequestQueue from "@/pages/CardRequestQueue";
import InstitutionSetup from "@/pages/InstitutionSetup";
import DeviceTest from "@/pages/DeviceTest";
import AuditLogs from "@/pages/AuditLogs";
import KioskDiagnostics from "@/pages/KioskDiagnostics";

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <KioskProvider>
        <Router>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/services" element={<ServiceSelection />} />
            <Route path="/customer-details" element={<CustomerDetails />} />
            <Route path="/id-verification" element={<IdVerification />} />
            <Route path="/fingerprint" element={<FingerprintCapture />} />
            <Route path="/signature" element={<SignatureCapture />} />
            <Route path="/card-preview" element={<CardPreview />} />
            <Route
              path="/card-personalization"
              element={<CardPersonalization />}
            />
            <Route
              path="/final-card-preview"
              element={<FinalCardPreview />}
            />
            <Route path="/processing" element={<Processing />} />
            <Route path="/collect-card" element={<CollectCard />} />
            <Route path="/receipt" element={<Receipt />} />

            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/emboss" element={<EmbossFileUpload />} />
            <Route path="/admin/queue" element={<CardRequestQueue />} />
            <Route path="/admin/institution" element={<InstitutionSetup />} />
            <Route path="/admin/devices" element={<DeviceTest />} />
            <Route path="/admin/audit" element={<AuditLogs />} />
            <Route path="/admin/diagnostics" element={<KioskDiagnostics />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>

        <Toaster />
      </KioskProvider>
    </QueryClientProvider>
  );
}

export default App;