<template>
    <div class="container">
      <main>
        <a href="#">Add Event</a>
          
        <section class="hero">
          <h2>Upcoming Events</h2>
          <ul>
            <li>
              <div class="event">
                <img src="../assets/studentLifeStockPhoto1.jpg" alt="Event Image">
                <h3>Language learning meet-up</h3>
                <p>3/17/2023, Dorm 9</p>
                <a href="#">Learn More</a>
              </div>
            </li>
            <li>
              <div class="event">
                <img src="../assets/studentLifeStockPhoto12.jpg" alt="Event Image">
                <h3>Event Title</h3>
                <p>Event Date and Time</p>
                <a href="#">Learn More</a>
              </div>
            </li>
            <li>
              <div class="event">
                <img src="../assets/studentLifeStockPhoto3.jpg" alt="Event Image">
                <h3>Event Title</h3>
                <p>Event Date and Time</p>
                <a href="#">Learn More</a>
              </div>
            </li>
          </ul>
        </section>
        <section class="hero">
          <h2>Previous Events</h2>
          <ul>
            <li>
              <div class="event">
                <img src="../assets/studentLifeStockPhoto1.jpg" alt="Event Image">
                <h3>Event Title</h3>
                <p>Event Date and Time</p>
                <a href="#">Learn More</a>
              </div>
            </li>
            <li>
              <div class="event">
                <img src="../assets/studentLifeStockPhoto12.jpg" alt="Event Image">
                <h3>Event Title</h3>
                <p>Event Date and Time</p>
                <a href="#">Learn More</a>
              </div>
            </li>
            <li>
              <div class="event">
                <img src="../assets/studentLifeStockPhoto3.jpg" alt="Event Image">
                <h3>Event Title</h3>
                <p>Event Date and Time</p>
                <a href="#">Learn More</a>
              </div>
            </li>
          </ul>
        </section>
        <section class="gallery">
          <h2>Student Life</h2>
          <ul>
            <li><img src="../assets/studentLifeStockPhoto4.jpg" alt="Gallery Image"></li>
            <li><img src="../assets/studentLifeStockPhoto5.jpg" alt="Gallery Image"></li>
            <li><img src="../assets/studentLifeStockPhoto6.jpg" alt="Gallery Image"></li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; University Events 2023</p>
      </footer>
    </div>
  </template>
  
  <style>
    /* Reset Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    /* Global Styles */
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      color: #333;
      background-color: #fff;
    }
  
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  
    /* Header Styles */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
    }
  
    h1 {
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
  
    nav ul {
      list-style: none;
      display: flex;
    }
  
    nav ul li {
      margin-left: 20px;
    }
  
    nav ul li:first-child {
      margin-left: 0;
    }
  
    nav ul li a {
      text-decoration: none;
      color: #333;
      font-size: 18px;
    }
  
    nav ul li a:hover {
      color: #0072C6;
    }
  
   /* Hero Styles */
  .hero {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .hero h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }

  .hero ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }

  .hero li {
    width: 30%;
    margin-bottom: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .hero li:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .hero img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .hero h3 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 10px;
  }

  .hero p {
    font-size: 16px;
    color: #666;
    margin: 10px;
  }

  .hero a {
    display: inline-block;
    margin: 10px;
    padding: 10px 20px;
    background-color: #0072C6;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
  }

  .hero a:hover {
    background-color: #005ea2;
  }

  /* Gallery Styles */
  .gallery {
    margin-bottom: 40px;
  }

  .gallery h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }

  .gallery ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .gallery li {
    width: 30%;
    margin-bottom: 20px;
  }
  
  </style>