import React from "react";
import { Link, Outlet } from "react-router-dom";

import styles from "./clinics.module.css";

const ClinicPage = () => {
  return (
    <main>
      <section className={styles.first}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <Link className={styles.list_link} to="/">
              Главная страница
            </Link>
          </li>
          <li className={styles.list_item}>/</li>
          <li className={styles.list_item}>
            <Link className={styles.list_link} to="/clinics">
              Клиники
            </Link>
          </li>
        </ul>
        <h1>
          Клиники <span>в Грозном</span>
        </h1>
        <span>
          Если появятся вопросы просьба нас не беспокоить: ⠀
          <a className={styles.number} href="tel:+74956171171">
            +7 (938) 000-21-71
          </a>
        </span>
      </section>
      <section className={styles.second}>
        <div className={styles.nav_tabs}>
          <Link to="map">Карта</Link>
          <Link to="list">Список</Link>
        </div>

        <Outlet />

        {/* <div className={styles.clinics}>
          {loading
            ? "загружается..."
            : error
            ? error
            : clinics.map((clin) => {
                return <ClinicCard key={clin._id} clin={clin} />;
              })}
        </div> */}
      </section>
    </main>
  );
};

export default ClinicPage;