import React, {useRef, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./wrapper3.module.css"
import appointmentImg from "./img/appointment.png";
import layersImg from "./img/layers.png";
import priorityImg from "./img/priority.png";

const Wrapper3 = () => {

    const hrRef = useRef(null);
    const h1Ref = useRef(null);

    const img1Ref = useRef(null);
    const img2Ref = useRef(null);
    const img3Ref = useRef(null);

    const p1Ref = useRef(null);
    const p2Ref = useRef(null);
    const p3Ref = useRef(null);

    const buttonRef = useRef(null);

    let navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            let scrollPosition = window.scrollY;

            if(scrollPosition > 900) {
                hrRef.current.style.width = "100%";
                hrRef.current.style.transition = "width 1s";
                hrRef.current.style.opacity = "1";
            }

            if(scrollPosition > 1100) {
                h1Ref.current.classList.add(styles["h1-active"]);
            }

            if(scrollPosition > 1330) {
                img1Ref.current.classList.add(styles["img1-active"]);
                img2Ref.current.classList.add(styles["img2-active"]);
                img3Ref.current.classList.add(styles["img3-active"]);

                p1Ref.current.classList.add(styles["img1-active"]);
                p2Ref.current.classList.add(styles["img2-active"]);
                p3Ref.current.classList.add(styles["img3-active"]);

                buttonRef.current.classList.add(styles["button-active"]);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    
    }, []);

    const handleClick = () => navigate("/login");

    return(
        <>
        <hr ref={hrRef}/>
        <section className={styles["wrapper"]}>

            <h1 ref={h1Ref} className={styles["h1"]}>What are we doing for <span>you</span>?</h1>

            <div className={styles["image-container"]}>

                <div>
                    <img ref={img1Ref} className={styles["img1"]} src={appointmentImg}/>
                    <p ref={p1Ref} className={styles["p1"]}><span className={styles["green"]}>Booking</span> everything that you need!</p>
                </div>

                <div>
                    <img ref={img2Ref} className={styles["img2"]} src={layersImg}/>
                    <p ref={p2Ref} className={styles["p2"]}>Keeping you <span className={styles["green"]}>organised</span>!</p>
                </div>

                <div>
                    <img ref={img3Ref} className={styles["img3"]} src={priorityImg}/>
                    <p ref={p3Ref} className={styles["p3"]}>Making priority <span className={styles["green"]}>tasks</span>!</p>
                </div>

            </div>

            <button ref={buttonRef} className={styles.button} onClick={handleClick}>Create To-Do!</button>
        </section>
        </>
    );
};

export default Wrapper3