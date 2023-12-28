import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUp';
import Profile from './pages/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './components/Common/PrivateRoutes';
import CreateAPodcastPage from './pages/CreateAPodcastPage';
import PodcastsPage from './pages/Podcasts';
import PodcastDetailsPage from './pages/PodcastDetails';
import CreateAnEpisodePage from './pages/CreateAnEpisode';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  fullName: userData.fullName,
                  email: userData.email,
                  uid: userData.uid,
                })
              );
            }
          },
          (error) => {
            // No user is signed in.
            console.error("Error fetching user data:", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };
  },[]);

  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage/>}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/create-a-podcast" element={<CreateAPodcastPage/>}/>
            <Route path="/podcasts" element={<PodcastsPage/>}/>
            <Route path="/podcast/:id" element={<PodcastDetailsPage/>}/>
            <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage/>}/>
          </Route>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
