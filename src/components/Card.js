import React from "react"

import styles from "./Card.module.css"

const Card = ({ data }) => {
  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.image}
        src={data.image_url}
        alt="Imagem"
      />

      <div className={styles.contentContainer}>
        <span className={styles.cardTitle}>{data.name}</span>

        <span className={styles.cardDesc}>{data.description}</span>
      </div>
    </div>
  )
}

export default Card
