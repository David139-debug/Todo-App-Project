import React, {useEffect, useRef} from "react";
import styles from "./wrapper1.module.css"

const Wrapper1 = () => {

    const paragraphRef = useRef(null);
    const titleRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {

        lineRef.current.classList.add(styles["line-active"]);
        titleRef.current.classList.add(styles["animation-title"]);

        if(lineRef.current.classList.contains(styles["line-active"]) && titleRef.current.classList.contains(styles["animation-title"])) {
            const timeout = setTimeout(() => {
                paragraphRef.current.classList.add(styles["animation-p"]);
            }, 1200);
            return () => clearTimeout(timeout);
        }
    }, []);

    return(
        <section className={styles["wrapper"]}>
                <h1 ref={titleRef} className={styles["welcome-topic"]}>Welcome to<br /><span className={styles["yellow"]}>To-Do Application</span>.</h1>
                <hr ref={lineRef} className={styles["line"]}/>
                <p ref={paragraphRef}>Place where you can <span className={styles["yellow"]}>organise</span> everything.</p>
        </section>
    );
};

export default Wrapper1