import React from 'react'
import styles from '../../css/Footer.module.css'

function Footer() {
  return (
    <div>
      <footer className={styles['footer']}>
        <div className={styles['container']}>
          <div className={styles['row']}>
            <div className={styles.colSm3}>
              <ul>
                <li className={styles['title']}>Overview</li>
                <li><a href="#">Feature Tour</a></li>
                <li><a href="#">Sell Online</a></li>
                <li><a href="#">Online Store</a></li>
                <li><a href="#">Store Design</a></li>
                <li><a href="#">Shopping Cart</a></li>
                <li><a href="#">Ecommerce Hosting</a></li>
                <li><a href="#">Marketing & SEO</a></li>
                <li><a href="#">Mobile Commerce</a></li>
                <li><a href="#">App Store</a></li>
                <li><a href="#">Feature List</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className={styles.colSm3}>
              <ul>
                <li className={styles['title']}>Resources</li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Theme Store</a></li>
                <li><a href="#">API Docs</a></li>
                <li><a href="#">Help Counter</a></li>
                <li><a href="#">E-Commerce Help</a></li>
                <li><a href="#">App Store</a></li>
                <li><a href="#">SEO Strategy</a></li>
                <li><a href="#">Forums Help</a></li>
                <li><a href="#">Community Outreach</a></li>
                <li><a href="#">Store theme</a></li>
              </ul>
            </div>
            <div className={styles.colSm3}>
              <ul>
                <li className={styles['title']}>Favorites</li>
                <li><a href="#">Best Practices 2015</a></li>
                <li><a href="#">Person Development</a></li>
                <li><a href="#">Frontend Methodology</a></li>
                <li><a href="#">Javascript for Designers</a></li>
                <li><a href="#">Object Orieted CSS</a></li>
                <li><a href="#">Atomic Styles</a></li>
                <li><a href="#">Top Style Guides</a></li>
                <li><a href="#">Mobile Commerce</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className={styles.colSm3}>
              <ul>
                <li className={styles['title']}>Contact Us</li>
                <li><a href="#">send us an email</a></li>
                <li><a href="#">give us a call</a></li>
              </ul>
              <ul>
                <li className={styles['title']}>Social</li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Youtube</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Google+</a></li>
              </ul>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles.colSm3}>
              <li><a href="#"><b>&copy; 2023 E-Shopper</b>&nbsp;&nbsp;Designed by Adwaith and Abdul</a><br/>
              </li>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer