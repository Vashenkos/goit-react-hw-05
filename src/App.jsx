import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages//HomePage/HomePage";

const App = () => {
    return (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<Navigation />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:userId' element={<UserDetails />}>
            <Route path='info' element={<h2>lorem ipsum</h2>} />
            <Route path='posts' element={<PostsByUser />}>
              <Route path=':postId/details' element={<PostDetails />} />
            </Route>
          </Route>
          {/* users/24/info */}
          {/* users/24/posts */}
          {/*Якщо роут не підійшов - переведе на сторінку 404 */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    );
  };
  export default App;



  