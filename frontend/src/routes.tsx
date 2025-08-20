import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App = React.lazy(() => import("./App"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const MembersList = React.lazy(() => import("./pages/MembersList"));
const DonationsList = React.lazy(() => import("./pages/DonationsList"));
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { EffectProvider } from "./contexts/EffectContext";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function Router() {
  return (
    <AuthProvider>
      <EffectProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <App />
                  </PrivateRoute>
                }
              />
              <Route
                path="/members"
                element={
                  <PrivateRoute>
                    <MembersList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/donations"
                element={
                  <PrivateRoute>
                    <DonationsList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </EffectProvider>
    </AuthProvider>
  );
}
