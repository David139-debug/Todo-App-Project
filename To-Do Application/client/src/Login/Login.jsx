import { useState } from "react";
import styles from "./login.module.css";
import Register from "../Register/Register";
import { useNavigate } from "react-router-dom";
import { createSession } from "../Register/Session";
import axios from "axios";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        let newErrors = {};
    
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            setErrors({});
        }

        try {
            const response = await axios.post("https://todo-app-nhbt.onrender.com/login", formData);
            createSession(response.data);
            navigate("/todo");
        } catch (err) {
            setErrors(prev => ({ ...prev, password: "Password or email incorrect." }));
        }
    };
    
    const toggleForm = () => {
        setIsRegister(prev => !prev);
    };

    return(
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <form className={styles.loginForm}>
                    <h1>Sign in to your account</h1>

                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors && <span>{errors.email}</span>}
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleChange}  />
                        {errors && <span>{errors.password}</span>}
                    </div>

                    <div className={styles.button}>
                        <button onClick={handleLogin}>Login</button>
                    </div>

                    <div className={styles.createAcc}>
                        <p>You dont have Account?</p><br/>
                        <p><a href="#" onClick={toggleForm}>Create one!</a></p>
                    </div>
                </form>
            </div>
            {isRegister && (
                    <Register onToggleForm={toggleForm} />
                )}
        </section>
    );
};

export default Login