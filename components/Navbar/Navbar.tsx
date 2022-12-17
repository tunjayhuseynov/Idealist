import Hamburger from 'hamburger-react'
import { useEffect, useState, useRef } from 'react'
import List from './List';
import Notch from './Notch';
import Right from './Right';
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic';
import { Step, CallBackProps, STATUS } from 'react-joyride';
const ReactJoyride = dynamic(() => import('react-joyride'), { ssr: false });


let shadow = "0px 0px 2px rgba(0, 0, 0, 0.25)"

let animation = {
    initial: {
        y: -100,
        x: "-50%"
    },
    animate: {
        y: "100%"
    },
    exit: {
        y: -100
    },
    transition: {
        type: "tween",
        duration: 0.5
    }
}

export default function Navbar() {
    const [isOpen, setOpen] = useState(false)
    const [notification, setNotification] = useState(false)

    useEffect(() => {
        window.localStorage.getItem("navbarNotification") !== "true" && setNotification(true)
    }, [])

    const notificationDone = (data: CallBackProps) => {
        const { status } = data;
        if (status === STATUS.FINISHED) {
            disableNotification()
        }
    }

    const disableNotification = () => {
        window.localStorage.setItem("navbarNotification", "true")
        setNotification(false)
    }

    const toggle = () => {
        setOpen(!isOpen)
        if (notification) {
            disableNotification()
        }
    }


    const steps: Step[] = [
        {
            // title: 'Elan Növü',
            content: 'Buradan elan növlərini dəyişə bilərsiniz.',
            target: ".target",
            disableBeacon: true,
        },
    ];

    return <nav className="h-[75px] grid grid-cols-[1fr,275px,1fr] w-full relative">
        <div className="bg-white z-20" style={{ boxShadow: shadow, }} />
        <div></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[276px] h-[75px] z-30" style={{ clipPath: "inset(-2px -2px -2px 0px)" }}>
            <div className="relative">
                <Notch />
                <div className="absolute left-0 top-0 w-[276px] h-[75px] bg-white -z-[99999]"></div>
                <div className="absolute left-0 top-0 w-[276px] h-[75px] flex items-center justify-center">
                    <div className="pt-5 z-[9999]">
                        <div className='target'>
                            <Hamburger toggled={isOpen} onToggle={toggle} size={24} color={"#f27a1a"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* {notification && <div className='animate-navbarNotification absolute rounded-md -bottom-[9rem] left-1/2 z-20 bg-primary py-[0.75rem] px-2'>
            <div className='flex flex-col space-y-2 items-center'>
                <FiArrowUp className='text-white' />
                <span className='text-white text-sm font-medium'>
                    Elan növünü buradan seçin!
                </span>
                <div>
                    <button className='bg-white text-primary font-medium px-2 py-1 rounded-md text-sm' onClick={notificationDone}>
                        Anladım
                    </button>
                </div>
            </div>
        </div>} */}
        <AnimatePresence>
            {isOpen && <motion.div initial={animation.initial} animate={animation.animate} exit={animation.exit} transition={animation.transition} className={`absolute bottom-0 left-1/2 z-[1]`}>
                <List />
            </motion.div>}
        </AnimatePresence>
        <div className="bg-white flex justify-end items-center pr-16 z-20" style={{ boxShadow: shadow }}>
            <Right />
        </div>
        <div className='absolute'>
            {notification && <ReactJoyride
                spotlightPadding={2}
                callback={notificationDone}
                steps={steps} locale={{
                    close: "Bağla",
                }}
                styles={{
                    options: {
                        primaryColor: "#f27a1a",
                        width: "350px"
                    },
                    tooltip: {
                        padding: "15px 10px",
                    },
                }}
            />}
        </div>

    </nav>
}

