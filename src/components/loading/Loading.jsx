import React from 'react'
import styles from './styles.module.css'
import logoAnim1 from '../../assets/icon/Union.svg'
import logoAnim2 from '../../assets/icon/Union2.svg'
import logoAnimTit1 from '../../assets/icon/UnionTit.svg'
import logoAnimTit2 from '../../assets/icon/UnionTit2.svg'

export default function Loading({ isLoading }) {
  console.log(isLoading);
  
  return (
    // <div className={styles.box}>
    <>
      <span className={`${styles.comLeft} ${!isLoading && styles.comLeftAnim}`}>
        <img className={styles.titAnim1} src={logoAnimTit1} alt="logoAnimTit1" />
        <span className={styles.animationLogoLeft}>
          <div>
            <img src={logoAnim2} alt="logoAnim2" style={{ position: 'absolute' }} />
          </div>
          <div>
            <img src={logoAnim1} alt="logoAnim1" style={{ position: 'absolute', right: 0 }} />
          </div>
        </span>
      </span>
      <span className={`${styles.comRight} ${!isLoading && styles.comRightAnim}`}>
        <img className={styles.titAnim2} src={logoAnimTit2} alt="logoAnimTit2" />
        <span className={styles.animationLogoRight}>
          <div>
            <img src={logoAnim2} alt="logoAnim2" style={{ position: 'absolute' }} />
          </div>
          <div>
            <img src={logoAnim1} alt="logoAnim1" style={{ position: 'absolute', right: 0 }} />
          </div>
        </span>
      </span>
    </>
  )
}
