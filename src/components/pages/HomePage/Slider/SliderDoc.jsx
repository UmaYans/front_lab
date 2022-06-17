import React from "react";
import styles from "./slider.module.css";

function SliderDoc({ doctor }) {
  // console.log(doctor);

  return (
    <>
      <div className={styles.rod}>
        <div className={styles.rods}>
          <div className={styles.doctorImg}>
            <img style={{ width: "100%" }} src={doctor.photo} alt="" />
          </div>

          <div>
            {doctor.name} {doctor.lastName}
          </div>
          <div>{doctor.rating}⭐</div>
        </div>
      </div>
    </>
  );
}

export default SliderDoc;
