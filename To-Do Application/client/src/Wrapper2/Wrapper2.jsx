import React, { useRef, useEffect } from "react";
import styles from "./wrapper2.module.css";

const Wrapper2 = () => {
    const titleRef = useRef(null);
    const lineRef = useRef(null);
    const pRef = useRef(null);
    const upperLineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            let scrollPosition = window.scrollY;

            if (scrollPosition >= 491) {
                if (titleRef.current && lineRef.current) {
                    titleRef.current.classList.add(styles["title-active"]);
                    lineRef.current.classList.add(styles["orange-line-active"]);
                }
            }

            if (titleRef.current?.classList.contains(styles["title-active"]) &&
                lineRef.current?.classList.contains(styles["orange-line-active"])) {

                const timeout = setTimeout(() => {
                    if (pRef.current) {
                        pRef.current.classList.add(styles["paragraph-active"]);
                    }
                }, 1000);

                return () => clearTimeout(timeout);
            }

            if (scrollPosition > 5 && upperLineRef.current) {
                upperLineRef.current.classList.add(styles["wrap-line-active"]);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <hr ref={upperLineRef} className={styles["wrap-line"]} />
            <section className={styles["wrapper2"]}>
                <h1 ref={titleRef} className={styles["important-topic"]}>
                    Working on something<br />
                    <span className={styles["important"]}>important</span>?
                </h1>
                <hr ref={lineRef} className={styles["orange-line"]} />
                <p ref={pRef} className={styles["wrap2-topic"]}>
                    Don't worry, we can help you to <span className={styles["organise"]}>organise</span> yourself as best as you can!
                </p>
            </section>
        </>
    );
};

export default Wrapper2;
