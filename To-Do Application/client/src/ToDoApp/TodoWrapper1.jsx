import React, {useRef, useEffect, useState} from "react";
import styles from "./todowrapper1.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import hamburgerIcon from "../ToDoApp/img/hamburger.png";
import { useNavigate } from "react-router-dom";
import api from "../api";

const TodoWrapper1 = () => {

    const [isSidebarActive, setSidebarActive] = useState(false);
    const [isCenterActive, setCenterActive] = useState(false);
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [sideBarOpen, setSidebarOpen] = useState(false);

    const inputRef = useRef(null);
    const taskTopicRef = useRef(null);
    const dateRef = useRef(null);
    const highPriorityRef = useRef(null);
    const lowPriorityRef = useRef(null);
    const navRef = useRef(null);
    const menuRef = useRef(null);

    const [displayedTasks, setDisplayedTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState();

    let navigate = useNavigate();

    const [task, setTask] = useState({
        name: "",
        date: "",
        priority: "",
        type: "",
        backgroundColor: "",
        status: ""
    });

    const [overlayActive, setIsOverlayActive] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await api.get(`https://todo-app-nhbt.onrender.com/getUser`, { withCredentials: true });
            setUserName(response.data.name);
            setUserId(response.data._id);
            navigate("/todo");
        } catch (err) {
            if (err.response.status === 401) {
                navigate("/login");
            }
        }
    }; 

    const fetchData = async () => {
        try {
            const response = await api.get("https://todo-app-nhbt.onrender.com/getAllTasks");
            const tasks = response.data.filter(task => task.userId === userId);
            const formattedTasks = tasks.map(task => ({
                ...task,
                date: task.date.split("T")[0]
            }))
            setAllTasks(formattedTasks);
            setDisplayedTasks(formattedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    
    useEffect(() => {
        setSidebarActive(true);
        setCenterActive(true);
        fetchUserData(); 
        fetchData();
    }, [userId]);
    

    const handleChange = (e) => {
        setTask(t => ({
            ...t,
            name: e.target.value
        }));
    };

    const handleDate = (e) => {

        setTask(t => ({
            ...t,
            date: e.target.value
        }));
    };

    const handlePriority = (e) => {
        setTask(t => ({
            ...t,
            priority: e.target.value
        }));
    };

    const handleTypeChange = (e) => {
        setTask(t => ({
            ...t,
            type: e.target.value
        }));
    };

    const handleOpeningInput = () => {
        setIsInputOpen(true);
        inputRef.current.style.height = "37.5em";
    };
    
    const handleOpenSidebar = (e) => {
        if(window.innerWidth <= 875) {
            e.stopPropagation();
            setSidebarActive(true);
            setIsOverlayActive(true);
            navRef.current.style.transform = "translateX(0%)";
            menuRef.current.style.display = "none";
        }
    };

    const handleClosingSidebar = (e) => {
        if(window.innerWidth <= 875) {
            if(!navRef.current.contains(e.target)) {
                navRef.current.style.transform = "translateX(-100%)";
                menuRef.current.style.display = "flex";
                setIsOverlayActive(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClosingSidebar);

        return () => {
            document.removeEventListener("click", handleClosingSidebar)
        };
    }, [sideBarOpen])

    const handleDocumentClick = (e) => {
        if (!inputRef.current) return;
    
        if (!inputRef.current.contains(e.target)) {
            inputRef.current.style.height = "5.5em";
        }
    };
    

    const resetInput = () => {
        inputRef.current.style.height = "5.5em";
        taskTopicRef.current.value = "";
        dateRef.current.value = "";
        highPriorityRef.current.checked = false;
        lowPriorityRef.current.checked = false;
        setTask(t => ({
            ...t,
            name: "",
            date: "",
            type: "",
            priority: ""
        }));
    };


    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
    }, [isInputOpen]);

    const addTask = async () => {
        if (!taskValidation()) {
            return;
        }
    
        // Kopiramo task da izbegnemo mutiranje originalnog objekta
        let newTask = { ...task };
    
        // Postavljamo podrazumevane vrednosti ako nisu zadate
        if (!newTask.date) {
            newTask.date = new Date().toISOString().split('T')[0];
        }
    
        if (!newTask.priority) {
            newTask.priority = "Low"; // Prioritet može biti samo "High" ili "Low"
        }
    
        // Postavljanje background boje na osnovu tipa zadatka
        const backgroundColors = {
            "Daily": "#006D6F",
            "Personal": "#ADD8E6",
            "Work": "#708090",
            "Projects": "#FFD700"
        };
        let backgroundColor = backgroundColors[newTask.type] || "#FFFFFF"; // Default: bela ako nije prepoznat tip
    
        // Kreiranje podataka za slanje
        const data = {
            ...newTask,
            userId: userId,
            backgroundColor: backgroundColor,
            status: "Pending"
        };
    
        try {
            const response = await api.post("https://todo-app-nhbt.onrender.com/addTask", data);
            const formattedTask = {
                ...response.data,
                date: newTask.date
            };
    
            // Definišemo sortiranje po prioritetu ("High" ide gore)
            const priorityOrder = { "High": 2, "Low": 1 };
    
            setAllTasks(prevTasks =>
                [formattedTask, ...prevTasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
            );
    
            setDisplayedTasks(prevTasks =>
                [formattedTask, ...prevTasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
            );
    
            resetInput();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
    
    const handleRemoveTask =  async (id) => {
        await api.delete(`https://todo-app-nhbt.onrender.com/removeTask/${id}`);
        const updatedTasks = displayedTasks.filter(task => task._id !== id);
        setDisplayedTasks(updatedTasks);
        setAllTasks(updatedTasks);
    };

    const handleCompletedTask = async (id) => {
        try {
            await api.put(`https://todo-app-nhbt.onrender.com/removeTask/${id}/completed`);
            setDisplayedTasks(prevTasks => 
                prevTasks.map(task => 
                    task._id === id ? { ...task, status: "Completed" } : task
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    const taskValidation = () => {
        if(taskTopicRef.current.value.trim() === "") {
            window.alert("You need to name Your Task!");
            return false;
        }
        if(task.type === "") {
            window.alert("You need to choose priority!");
            return false;
        }
        return true;
    };

    const handleAllTasks = () => {
        inputRef.current.style.display = "block";
        setDisplayedTasks(allTasks);
    };

    const handleTodayTasks = () => {
        inputRef.current.style.display = "none";
        const todayDate = new Date().toISOString().split("T")[0];

        const todayTasks = allTasks.filter(task => task.date.startsWith(todayDate));
        setDisplayedTasks(todayTasks);
    };

    const handleDailyTasks = () => {
        inputRef.current.style.display = "none";
        const dailyTasks = allTasks.filter(task => task.type === "Daily");
        setDisplayedTasks(dailyTasks);
    };

    const handlePriorityTasks = () => {
        inputRef.current.style.display = "none";
        const priorityTasks = allTasks.filter((task) => task.priority === "High");
        setDisplayedTasks(priorityTasks);
    };

    const handleWorkTasks = () => {
        inputRef.current.style.display = "none";
        const workTasks = allTasks.filter((task) => task.type === "Work");
        setDisplayedTasks(workTasks);
    };

    const handlePersonalTasks = () => {
        inputRef.current.style.display = "none";
        const personalTasks = allTasks.filter((task) => task.type === "Personal");
        setDisplayedTasks(personalTasks);
    };

    const handleProjectsTasks = () => {
        inputRef.current.style.display = "none";
        const projectTasks = allTasks.filter((task) => task.type === "Projects");
        setDisplayedTasks(projectTasks);
    };

    const handleLogout = async () => {
        await api.post("https://todo-app-nhbt.onrender.com/logout", {}, { withCredentials: true });
        navigate("/login");
    };

    return(
        <section className={styles.wrapper}>

            <div className={styles.overlay} style={{display: overlayActive ? "block" : "none"}}></div>

            <div className={styles.menuContainer}>
                <img ref={menuRef} src={hamburgerIcon} className={styles.menu} onClick={handleOpenSidebar}/>
            </div>

            <div className={styles.sidebar}>
            <nav ref={navRef} className={`${styles.nav} ${isSidebarActive ? styles.sidebarLoaded : ""}`}>
                <ul>
                    <h2><span className={styles.userName}>{userName}</span> Tasks</h2>
                    <li><a href="#" onClick={handleAllTasks}>All</a></li>
                    <li><a href="#" onClick={handleTodayTasks}>Today</a></li>
                    <li><a href="#" onClick={handleDailyTasks}>Daily<i className="fa fa-list-ul"></i></a></li>
                    <li><a href="#" onClick={handlePriorityTasks}>Priority<i className="fa fa-flag"></i></a></li>
                    <li><a href="#" onClick={handleWorkTasks}>Work<i className="fa fa-pencil"></i></a></li>
                    <li><a href="#" onClick={handlePersonalTasks}>Personal<i className="fa fa-user"></i></a></li>
                    <li><a href="#" onClick={handleProjectsTasks}>Projects<i className="fa fa-project-diagram"></i></a></li>
                </ul>
                <button className={styles.logout} onClick={handleLogout}>Logout</button>
            </nav>
            </div>

            <div className={`${styles.center} ${isCenterActive ? styles.centerLoaded : ""}`}>
                <div ref={inputRef} className={styles.heightInput}>
                            <input ref={taskTopicRef} type="text" className={styles.input} onChange={handleChange} onClick={handleOpeningInput} placeholder="Add Task" />
                            {isInputOpen && (
                        <div className={styles.formContainer}>

                            <div>
                                <label>Date:</label>
                                <input ref={dateRef} className={styles.date} type="date" onChange={handleDate}/>
                            </div>

                            <div className={styles.priority}>
                                <label>Priority:</label>

                                    <div>
                                        <input ref={highPriorityRef} type="radio" name="option" value="High" onClick={handlePriority} />
                                        <label>High</label>
                                    </div>
                                    
                                    <div>
                                        <input ref={lowPriorityRef} type="radio" name="option" value="Low" onClick={handlePriority} />
                                        <label>Low</label>
                                    </div>

                            </div>

                            <div className={styles.select}>
                                <label>Type:</label>
                                <select value={task.type} onChange={handleTypeChange} className={styles.type}>
                                    <option value="" disabled>Choose Type</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Projects">Projects</option>
                                </select>
                            </div>

                            <div className={styles.infoButton}>
                                <button className={styles.addButton} onClick={addTask}>Add</button>
                            </div>
                        </div>
                    )}

                </div>

                <div className={styles.taskList}>
                        <ul>
                            {displayedTasks.map(task => 
                                <li key={task._id} style={{ width: "50%", backgroundColor: task.backgroundColor,
                                                            display: task.hidden ?  "none" : "flex",
                                                            opacity: task.hidden ? "0" : "1"}}
                                                            className={`${styles.task} ${task.status === "Completed" ? styles.completed : ""}`}>
                                    <div className={styles.taskDetails}>
                                        <div className={styles.leftSide}>

                                        <div>
                                            <h3 className={styles.taskName}>{task.name}</h3>
                                            <p className={styles.taskPriority}><b>{task.date}</b></p>
                                        </div>        
                                        
                                        {task.priority === "High" &&(
                                            <div className={styles.flag}>
                                                <i className={"fa fa-flag"}></i>
                                            </div>
                                        )}

                                        </div>
                                    </div>
                                    <div className={styles.rightSide} id="hiddenFlag">
                                        <p className={styles.task}><b>{task.type}</b></p>
                                        <div className={styles.buttons}>
                                        <button className={styles.removeBtn} onClick={() => handleRemoveTask(task._id)}>✕</button>
                                        {task.status !== "Completed" && (
                                            <button className={styles.completedBtn} onClick={() => handleCompletedTask(task._id)}><i className="fa fa-check"></i></button>
                                        )}
                                        </div>
                                        {task.status === "Completed" && (
                                            <i className={`fa-solid fa-check ${styles.showIcon} ${styles.checkedIcon}`}></i>
                                        )}
                                    </div>
                                </li>
                            )}
                        </ul>
                </div>
            </div>
        </section>
    );
};

export default TodoWrapper1