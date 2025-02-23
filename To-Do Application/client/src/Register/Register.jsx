import { useRef, useState } from "react";
import styles from "./register.module.css";
import { createSession } from "./Session";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Register = ({onToggleForm}) => {

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("");

    const nameRef = useRef(null);
    const lastnameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repeatPasswordRef= useRef(null);

    const navigate = useNavigate()

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(d => ({...d, [name]: value}));

    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.name.length < 5) {
           newErrors.name = "You must enter at least 5 characters.";
        }

        if (formData.lastname.length < 5) {
            newErrors.lastname = "You must enter at least 5 characters.";
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email is not valid!";
        }
        
        if (formData.password.length < 5) {
            newErrors.password = "You must enter at least 5 characters.";
        }

        if (formData.repeatPassword.length < 5) {
            newErrors.repeatPassword = "You must enter at least 5 characters.";
        }

        if (formData.repeatPassword !== formData.password) {
            newErrors.repeatPassword = "Passwords do not match!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            
        const errorsCheck = Object.keys(newErrors).length;
        if(errorsCheck === 0) {
                const newUser = {
                    name: formData.name,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: formData.password
                };
                
                const response = await axios.post("https://todo-app-project-eexq.onrender.com/register", newUser);
                createSession(response.data);
                navigate("/todo");
        }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors(prev => ({ ...prev, email: err.response.data.message || "Email already exists." }));
            } else {
                setErrors(prev => ({ ...prev, general: "Something went wrong. Please try again later." }));
            }
        }
    };

    return(
        <div className={styles.registerContainer}>
            <div className={styles.overlay}></div>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
            <button onClick={onToggleForm} className={styles.closeBtn}>X</button>

                <h1>Register</h1>

                <div className={styles.name}>
                    <label>Name</label>
                    <input ref={nameRef} type="text" name="name" onChange={handleChange} value={formData.name} minLength={5} maxLength={25} required/>
                    {errors.name && <span>{errors.name}</span>}
                </div>

                <div>
                    <label>Last Name</label>
                    <input ref={lastnameRef} type="text" name="lastname" onChange={handleChange} value={formData.lastname} minLength={5} maxLength={25} required/>
                    {errors.lastname && <span>{errors.lastname}</span>}
                </div>

                <div>
                    <label>Email</label>
                    <input ref={emailRef} type="email" name="email" onChange={handleChange} minLength={5} maxLength={60} value={formData.email} />
                    {errors.email && <span>{errors.email}</span>}
                </div>

                <div>
                    <label>Password</label>
                    <input ref={passwordRef} type="password" name="password" onChange={handleChange} value={formData.password} minLength={5} maxLength={50} required/>
                    {errors.password && <span>{errors.password}</span>}
                </div>

                <div>
                    <label>Repeat Password</label>
                    <input ref={repeatPasswordRef} type="password" name="repeatPassword" onChange={handleChange} value={formData.repeatPassword} minLength={5} maxLength={50} required/>
                    {errors.repeatPassword && <span>{errors.repeatPassword}</span>}
                </div>

                <div className={styles.registerBtn}>
                    <button type="submit" onClick={handleSubmit}>Create Account</button>
                </div>
            </form>
        </div>
    );
};

export default Register