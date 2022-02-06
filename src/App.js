import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Layout from './compoments/layout'
import Home from './pages/home'
import Settings from './pages/settings';
import './App.less'

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Navigate to='/home'/>}/>
              <Route path='/home' element={<Layout><Home/></Layout>}/>
              <Route path='/settings' element={<Layout><Settings/></Layout>}/>

              {/*<Route path='/home' element={<Layout/>}>*/}
              {/*    <Route path='/home' element={<Home/>}/>*/}
              {/*</Route>*/}
              {/*<Route path='/settings' element={<Layout/>}>*/}
              {/*    <Route path='/settings' element={<Settings/>}/>*/}
              {/*</Route>*/}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
