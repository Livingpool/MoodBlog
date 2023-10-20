// for Code-Your-Stage students:
// uncomment 'Clerk' Provider and then fill your key into .env to enable clerk feature

import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp
} from "@clerk/clerk-react";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Table from "./pages/Table";
import Form from "./pages/Form";
import FormFile from "./pages/Form/File";
import Calendar from "./pages/Form/Calendar";
import Modal from "./pages/MUI/Modal";
import Pagination from "./pages/MUI/Pagination";
import Carousel from "./pages/MUI/Carousel";
import Hook from "./pages/Hook";
import Welcome from "./pages/moodblog/Welcome";
import Newpage from "./pages/moodblog/Newpage";
import EditDiary from "./pages/moodblog/EditDiary";
import AiFeedback from "./pages/moodblog/AiFeedback";
import Ai from "./pages/moodblog/Ai";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
    <Routes>
      <Route exact path="/" element={<Welcome />} />
      <Route exact path="/new" element={<Newpage />} />
      <Route 
        exact path="/edit" 
        // element={<EditDiary />} 
        element={
          <>
            <SignedIn>
              <EditDiary />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route exact path="/AiFeedback/:sessionId/:user/:content" element={<AiFeedback />} />
      <Route exact path="/aichat" element={<Ai />} />
      <Route exact path="/zoo" element={<Navigate to="/zoo/chart" />} />
      <Route exact path="/zoo/chart" element={<Dashboard />} />
      <Route exact path="/zoo/table" element={<Table />} />
      <Route exact path="/zoo/form/typical" element={<Form />} />
      <Route exact path="/zoo/form/file" element={<FormFile />} />
      <Route 
        exact path="/zoo/form/calendar" 
        // element={<Calendar />} 
        element={
          <>
            <SignedIn>
              <Calendar />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route exact path="/zoo/mui/modal" element={<Modal />} />
      <Route exact path="/zoo/mui/pagination" element={<Pagination />} />
      <Route exact path="/zoo/mui/carousel" element={<Carousel />} />
      <Route exact path="/zoo/hook" element={<Hook />} />
      <Route
        path="/sign-in/*"
        element={<SignIn routing="path" path="/sign-in" />}
      />
      <Route
        path="/sign-up/*"
        element={<SignUp routing="path" path="/sign-up" />}
      />
      <Route
        path="/zoo/chat"
        element={
          <>
            <SignedIn>
              <Chat />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
     </ClerkProvider>
  );
}

export default App;
