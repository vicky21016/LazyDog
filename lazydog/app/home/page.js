"use client";

import React from "react";


export default function HomePage(props) {
  return (
    <>
      <div className="section1">
        <div className="words">
          <div className="sales">
            <div className="sale1">
              <h2>活動倒數3天！</h2>
              <h2>熱門商品最高限時</h2>
            </div>
            <div className="sale2">
              <h2>88</h2>
              <h2 className="discountWord">折</h2>
            </div>
            <div className="sale3">
              <p>錯過這次，再等一年!</p>
              <button>Shop Now</button>
            </div>
          </div>
          <div className="dog">
            <img className="paw2" src="/img/paw2.png" alt="" />
            <img
              className="dogBackground"
              src="./img/dogBackground.png"
              alt=""
            />
            <img className="lines" src="/img/lines.png" alt="" />
            <img className="dogPic" src="/img/dog.png" alt="" />
            <img className="paw3" src="/img/paw3.png" alt="" />
          </div>
          <div className="icons">
            <img className="paw1" src="/img/paw1.png" alt="" />
          </div>
        </div>
        <div className="whiteWave">
          <img src="/img/whiteWave.png" alt="" />
        </div>
      </div>

      <div className="section2">
        <div className="words">
          <h2 className="shopping">立即逛逛，給毛孩最好的生活</h2>
          <h2 className="today">今日必買 | 人氣推薦</h2>
        </div>
        <div className="imgs">
          <img className="dogCookie" src="/img/dogCookie.png" alt="" />
          <img className="cookieBag" src="/img/cookieBag.png" alt="" />
        </div>
        <div className="productCards">
          <div className="card">
            <div className="pdPics">
              <img src="/img/dryfood (2).jpeg" alt="" />
            </div>
            <div className="pdWords">
              <p>超能狗主食罐</p>
              <p>$185</p>
            </div>
          </div>
          <div className="card">
            <div className="pdPics">
              <img src="/img/dryfood (2).jpeg" alt="" />
            </div>
            <div className="pdWords">
              <p>超能狗主食罐</p>
              <p>$185</p>
            </div>
          </div>
          <div className="card">
            <div className="pdPics">
              <img src="/img/dryfood (2).jpeg" alt="" />
            </div>
            <div className="pdWords">
              <p>超能狗主食罐</p>
              <p>$185</p>
            </div>
          </div>
          <div className="card">
            <div className="pdPics">
              <img src="/img/dryfood (2).jpeg" alt="" />
            </div>
            <div className="pdWords">
              <p>超能狗主食罐</p>
              <p>$185</p>
            </div>
          </div>
          <div className="card">
            <div className="pdPics">
              <img src="/img/dryfood (2).jpeg" alt="" />
            </div>
            <div className="pdWords">
              <p>超能狗主食罐</p>
              <p>$185</p>
            </div>
          </div>
        </div>

        <div className="brownWave">
          <img src="/img/brownWaves.png" alt="" />
        </div>
      </div>

      <div className="section3">
        <div className="discountPic">
          <img className="girlDog" src="/img/girl&dog.png" alt="" />
          <img className="discountPic3" src="/img/discountPic3.png" alt="" />
          <h2>優惠的折扣</h2>
          <button>Read More</button>
          <div className="circle">
            20%
            <br />
            offer
          </div>
        </div>
        <div className="hotel">
          <div className="map">
            <img src="/img/taiwan.png" alt="" />
          </div>
          <div className="hotelWords">
            <h2>毛孩的度假天堂</h2>
            <p>立即下訂，為您的毛孩子預約一個愉快的假期！</p>
            <button>Book Now</button>
          </div>
          <div className="hotelViews">
            <img src="/img/dryfood (5).jpeg" alt="" />
            <h5>汪汪星球</h5>
          </div>
        </div>
        <div className="icons">
          <img className="firework1" src="/img/fireworks.png" alt="" />
          <img className="firework2" src="/img/fireworks.png" alt="" />
        </div>
        <div className="whiteWave2">
          <img src="/img/whiteWave2.png" alt="" />
        </div>
      </div>

      <div className="section4">
        <h2>會員限定優惠</h2>
        <div className="userCards">
          <div className="card card1">
            <p className="p1">首購會員</p>
            <p className="p2">現折50</p>
            <h5>單筆消費滿 $ 500 即可使用</h5>
          </div>
          <div className="card card2">
            <div className="shipIcon">
              <img src="/img/shipIcon.png" alt="" />
            </div>
            <h5>滿額免運</h5>
            <p>超取 $ 1500 / 宅配 $ 2000</p>
          </div>
          <div className="card card3">
            <div className="moneyIcon">
              <img src="/img/moneyIcon.png" alt="" />
            </div>
            <h5>購物金回饋</h5>
            <p>
              會員最高享<span> 8% </span>消費回饋
            </p>
          </div>
          <div className="card card4">
            <div className="qrcode">
              <img src="/img/qrcode.png" alt="" />
            </div>
            <h4>加入好友</h4>
            <p>獲得最新優惠資訊</p>
          </div>
        </div>
        <button>立即加入會員</button>
        <div className="yellowPaws">
          <img src="/img/yellowPaws.png" alt="" />
        </div>
      </div>

      <div className="btns">
        <button className="ticketIcon">
          <img src="/img/ticketIcon.png" alt="" />
        </button>
        <button className="topIcon">
          <img src="/img/topIcon.png" alt="" />
        </button>
      </div>
    </>
  );
}
