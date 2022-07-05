import icon from "../../images/merlinicon.png";
import styles from "./Home.module.css";
import React from "react";

function Home(props) {
  const { handleStart } = props;
  return (
    <div className={styles.home}>
      {/* <img className={styles.icon} src={icon} alt="merlin"></img> */}
      <div className={styles.hometext}>
        <p className={styles.header}>MERLIN video editor</p>
        <p
          className={[styles.start, styles.hvrHang].join(" ")}
          onClick={handleStart}
        >
          Click here to see the magic
        </p>
      </div>
    </div>
  );
}

export default Home;
