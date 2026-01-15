import React, { useEffect } from "react";
import { confettiCannon } from "../script";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize script
    const hero = document.querySelector('[data-block="pricing-hero"]');
    if (hero) {
      const cannon = new confettiCannon(hero);
      cannon.init();
    }
  }, []);

  return (
    <div className="text-center mt-20 relative z-10 flex justify-center items-center flex-col">
      <div className="absolute top-55">
      <h1>Memory Game</h1>
      <p className="braces">Click & drag to see the magic ✨</p>
      <button id="play" onClick={() => navigate("/game")}>Play</button>
      </div>
      <section className="hero pricing-hero" data-block="pricing-hero">
        <div className="container">
          <div className="pricing-hero__content">
            <div className="pricing-hero__flair">
              <div className="pricing-hero__hand">
                <img
                  className="pricing-hero__drag"
                  src="https://assets.codepen.io/16327/hand-drag.png"
                  alt=""
                />
                <img
                  className="pricing-hero__rock"
                  src="https://assets.codepen.io/16327/hand-rock.png"
                  alt=""
                />
                <img
                  className="pricing-hero__handle"
                  src="https://assets.codepen.io/16327/2D-circle.png"
                  alt=""
                />
                <small>drag me</small>
              </div>

              <div className="image-preload" aria-hidden="true">
                <img
                  data-key="combo"
                  src="https://assets.codepen.io/16327/3D-combo.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="cone"
                  src="https://assets.codepen.io/16327/3D-cone.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="hoop"
                  src="https://assets.codepen.io/16327/3D-hoop.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="keyframe"
                  src="https://assets.codepen.io/16327/3D-keyframe.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="semi"
                  src="https://assets.codepen.io/16327/3D-semi.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="spiral"
                  src="https://assets.codepen.io/16327/3D-spiral.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="squish"
                  src="https://assets.codepen.io/16327/3D-squish.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="triangle"
                  src="https://assets.codepen.io/16327/3D-triangle.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="tunnel"
                  src="https://assets.codepen.io/16327/3D-tunnel.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="wat"
                  src="https://assets.codepen.io/16327/3D-poly.png"
                  width="1"
                  height="1"
                  style={{ position: "absolute", left: "-9999px" }}
                />
              </div>
              <div className="explosion-preload" aria-hidden="true">
                <img
                  data-key="blue-circle"
                  src="https://assets.codepen.io/16327/2D-circles.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="green-keyframe"
                  src="https://assets.codepen.io/16327/2D-keyframe.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="orange-lightning"
                  src="https://assets.codepen.io/16327/2D-lightning.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="orange-star"
                  src="https://assets.codepen.io/16327/2D-star.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="purple-flower"
                  src="https://assets.codepen.io/16327/2D-flower.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="cone"
                  src="https://assets.codepen.io/16327/3D-cone.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="keyframe"
                  src="https://assets.codepen.io/16327/3D-spiral.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="spiral"
                  src="https://assets.codepen.io/16327/3D-spiral.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="tunnel"
                  src="https://assets.codepen.io/16327/3D-tunnel.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="hoop"
                  src="https://assets.codepen.io/16327/3D-hoop.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <img
                  data-key="semi"
                  src="https://assets.codepen.io/16327/3D-semi.png"
                  style={{ position: "absolute", left: "-9999px" }}
                />
              </div>
            </div>
          </div>
          <svg className="pricing-hero__canvas"></svg>
          <div className="pricing-hero__proxy"></div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
