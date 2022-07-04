import styles from './Editor.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Workingpanel from './WorkingPanel';
import SignUp from '../signup';

function Editor() {
  return (
   <div>
    <Navbar />
    <div className={styles.outersplitScreen}>
      <div className={styles.topPane}>
        <div className={styles.innersplitScreen}>
          <Workingpanel/>
          <div className={styles.rightPane}>
            <h1>Movie Panel</h1>
          </div>
        </div>
      </div>
      <div className={styles.bottomPane}>
        <h1>Timeline</h1>
      </div>
    </div>
    <Routes>
    <Route path='/sign-up' element={<SignUp/>} />
    </Routes>
   </div>
  );
}

export default Editor;

