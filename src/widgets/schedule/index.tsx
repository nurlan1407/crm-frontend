import React from 'react'
import cls from './styles.module.scss'

interface ScheduleProps {
    schedule: { day: string; open: string; close: string }[];
}

const WorkSchedule: React.FC<ScheduleProps> = ({ schedule }) => {
    const handleScheduleChange = (
        index: number,
        field: 'open' | 'close',
        value: string
    ) => {
        // Create a new schedule array with the updated value
        const newSchedule = schedule.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        // setSchedule(newSchedule);
    };
    return (
        <div className={cls.schedule}>
            {schedule.map(({ day, open, close }, index) => (
                <div className={cls.day} key={day}>
                    <div className={cls.dayName}>{day}</div>
                    <div className={cls.times}>
                        <input
                            className={cls.timeInput}
                            type="time"
                            value={open}
                            onChange={(e) =>
                                handleScheduleChange(index, 'open', e.target.value)
                            }
                        />
                        {' - '}
                        <input
                            className={cls.timeInput}
                            type="time"
                            value={close}
                            onChange={(e) =>
                                handleScheduleChange(index, 'close', e.target.value)
                            }
                        />
                    </div>
                    <div className={cls.statusIndicator}>
                        <span className={cls.redCircle}></span>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default WorkSchedule