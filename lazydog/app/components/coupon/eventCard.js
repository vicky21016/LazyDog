"use client";

import styles from "../../../styles/modules/fontCoupon.module.css";

export default function EventCard({ event }) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className={styles.suEvent}>
        <div className={styles.suEventIcon}>
          <img src={event.icon} alt={event.title} />
        </div>
        <h5 className={`text-${event.color} ${styles.suEventTitle}`}>
          {event.title}
        </h5>
        <p className={styles.suEventDesc}>
          {event.content}
          {event.description}
        </p>
      </div>
    </div>
  );
}
