// Libs
import { Suspense, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// HOC
import { ProtectedRoute } from './hoc/protected-route';
import { Layout } from './hoc/layout';

// Pages
import SignIn from './pages/SignIn.page';
import Home from './pages/Home.page';
import News from './pages/News.page';
import School from './pages/School.page';
import NewsDetailes from './pages/NewsDetails.page';
import CreateNews from './pages/CreateNews.page';
import Settings from './pages/Settings.page';

// Contexts
import { AuthContext } from './contexts/auth-context';

// Types
import { UserType } from './models/auth-context';
import { Fallback } from './components/layout/fallback';
import { ClassContent } from './components/school/class-content';
import SchoolContentDetails from './pages/SchoolContentDetails.page';

function App() {
  const [user, userSet] = useState<UserType | null>(null);
  const [errorMessage, errorMessageSet] = useState<string | null>(null);
  let navigate = useNavigate();

  // Retrive stored user session data if exists
  // useEffect(() => {
  //   const user = localStorage.getItem('user');

  //   if (user) {
  //     const userData = JSON.parse(user);

  //     if (new Date().getTime() > new Date(userData.expire).getTime()) {
  //       // localStorage.removeItem('user');
  //       navigate('/sign-in');
  //       return;
  //     }

  //     userSet(userData);
  //   }
  // }, [navigate]);

  // Authentication setup
  const auth = {
    user,
    errorMessage,
    // signIn is a AuthContext sign in tool
    signIn: async (email: string, password: string) => {
      const response = await fetch(
        `http://localhost:8000/api/sign-in?email=${email}&password=${password}`
      );
      const data = await response.json();
      console.log('[APP] Auth', data);

      if (data.error) {
        let message = null;
        switch (data.error.message) {
          case 'INVALID_EMAIL':
            message = 'Niepoprawny email!';
            break;
          case 'MISSING_PASSWORD':
            message = 'Niepoprawne hasło!';
            break;
          case 'INVALID_PASSWORD':
            message = 'Niepoprawne hasło!';
            break;
        }
        errorMessageSet(message);
        return;
      }

      const userData = {
        email,
        userId: data.localId,
        token: data.idToken,
        expire: new Date().getTime() + data.expiresIn,
      };

      // Store locally user auth data
      // localStorage.setItem('user', JSON.stringify(userData));

      // Update auth context with user auth data
      userSet(userData);
      errorMessageSet(null);
      navigate('/', { replace: true });
    },
    // signIn is a AuthContext sign out tool
    signOut: () => {
      localStorage.removeItem('user');
      userSet(null);
      navigate('/sign-in');
    },
  };
  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/news'
            element={
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <News />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/news/create'
            element={
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <CreateNews />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/news/:newsSlug'
            element={
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <NewsDetailes />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/school'
            element={
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <School />
                </Suspense>
              </ProtectedRoute>
            }>
            <Route
              path=':slug'
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Fallback />}>
                    <ClassContent />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path='/school/:slug/:contentId'
            element={
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <SchoolContentDetails />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path='/settings'
            element={
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <Settings />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='*' element={<Navigate to={'/sign-in'} replace />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
